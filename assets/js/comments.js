// Likes, comments and threaded replies for blog posts.
// Stored in the shared `comments` and `likes` collections (see firestore.rules).
import { store, auth, award, esc, demo, loadMember, toast } from './core.js';

const MAX = 1000;
const ago = ts => {
  const s = Math.max(1, (Date.now() - ts) / 1000);
  if (s < 60) return 'just now';
  const u = [[31536000, 'y'], [2592000, 'mo'], [604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']].find(([n]) => s >= n);
  return Math.floor(s / u[0]) + u[1] + ' ago';
};
const body = t => esc(t).replace(/(^|\s)@([\w.-]{2,30})/g, '$1<b class="at">@$2</b>').replace(/\n/g, '<br>');
const initial = n => esc((n || '?').trim()[0] || '?').toUpperCase();
const hue = s => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

// Who is talking: a signed-in fan, or (before the shared database is connected) a named guest on this device.
const GKEY = 'aw:guest';
function guest() {
  try {
    let g = JSON.parse(localStorage.getItem(GKEY) || 'null');
    if (!g) { g = { uid: 'g' + Math.random().toString(36).slice(2, 12), name: '' }; localStorage.setItem(GKEY, JSON.stringify(g)); }
    return g;
  } catch { return { uid: 'g-anon', name: '' }; }
}
async function me() {
  if (auth.user) {
    const m = await loadMember().catch(() => null);
    return { uid: auth.user.uid, name: m?.handle || auth.user.displayName || 'Fan', photo: auth.user.photoURL || '' };
  }
  if (demo) { const g = guest(); return g.name ? { uid: g.uid, name: g.name, photo: '' } : { uid: g.uid, name: '', photo: '', needsName: true }; }
  return null;
}

// Likes and comment totals per post, for the blog index.
export async function counts() {
  const [cs, ls] = await Promise.all([store.list('comments').catch(() => []), store.list('likes').catch(() => [])]);
  return id => ({ comments: cs.filter(c => c.post === id).length, likes: ls.filter(l => l.target === id).length });
}

export function mountComments(el, post) {
  let comments = [], likes = [], who = null, replyTo = null, busy = false;
  const tgt = cid => cid ? `${post.id}.${cid}` : post.id;
  const likedBy = (t, uid) => likes.some(l => l.target === t && l.uid === uid);
  const likeCount = t => likes.filter(l => l.target === t).length;

  async function load() {
    [comments, likes] = await Promise.all([
      store.list('comments', { where: ['post', '==', post.id] }).catch(() => []),
      store.list('likes', { where: ['post', '==', post.id] }).catch(() => []),
    ]);
    who = await me();
    draw();
  }

  const heart = (t, n) => {
    const on = who && likedBy(t, who.uid);
    return `<button class="like${on ? ' on' : ''}" data-like="${esc(t)}" aria-pressed="${!!on}" aria-label="${on ? 'Unlike' : 'Like'}"><span class="h">${on ? '&#9829;' : '&#9825;'}</span>${n ? `<span>${n}</span>` : ''}</button>`;
  };

  const form = (parent = '', pre = '') => {
    if (!who) return `<div class="c-signin"><p>Sign in to like, comment and reply to other Maniacs.</p><button class="btn primary sm" data-signin>Sign in with Google</button></div>`;
    return `<form class="c-form" data-parent="${esc(parent)}">
      ${who.needsName ? `<input class="c-name" name="name" maxlength="30" placeholder="Your name" required autocomplete="nickname">` : `<span class="c-av" style="--h:${hue(who.uid)}">${who.photo ? `<img src="${esc(who.photo)}" alt="">` : initial(who.name)}</span>`}
      <textarea name="text" maxlength="${MAX}" rows="${parent ? 2 : 3}" placeholder="${parent ? 'Write a reply…' : 'Say something to Armani and the Maniacs…'}" required>${esc(pre)}</textarea>
      <div class="c-row"><span class="note c-left"></span>${parent ? '<button type="button" class="btn sm" data-cancel>Cancel</button>' : ''}<button class="btn primary sm">${parent ? 'Reply' : 'Post comment'}</button></div>
    </form>`;
  };

  const one = c => {
    const mine = who && c.uid === who.uid, t = tgt(c.id);
    return `<div class="c" id="c-${esc(c.id)}">
      <span class="c-av" style="--h:${hue(c.uid)}">${c.photo ? `<img src="${esc(c.photo)}" alt="">` : initial(c.name)}</span>
      <div class="c-main">
        <div class="c-meta"><b>${esc(c.name || 'Fan')}</b><span>${ago(c.ts)}</span></div>
        <p>${body(c.text)}</p>
        <div class="c-acts">${heart(t, likeCount(t))}<button class="c-btn" data-reply="${esc(c.parent || c.id)}" data-to="${esc(c.name || '')}">Reply</button>${mine || auth.isAdmin ? `<button class="c-btn" data-del="${esc(c.id)}">Delete</button>` : ''}</div>
      </div>
    </div>`;
  };

  function draw() {
    const tops = comments.filter(c => !c.parent).sort((a, b) => b.ts - a.ts);
    const ids = new Set(comments.map(c => c.id));
    const orphans = [...new Set(comments.filter(c => c.parent && !ids.has(c.parent)).map(c => c.parent))];
    const kids = id => comments.filter(c => c.parent === id).sort((a, b) => a.ts - b.ts);
    const thread = (head, id) => `<li class="thread">${head}${kids(id).length ? `<div class="replies">${kids(id).map(one).join('')}</div>` : ''}${replyTo?.parent === id ? form(id, replyTo.pre) : ''}</li>`;
    const pl = likeCount(post.id);
    el.innerHTML = `
      <div class="talk-bar">${heart(post.id, pl)}<span class="note">${pl === 1 ? '1 like' : pl + ' likes'} &middot; ${comments.length === 1 ? '1 comment' : comments.length + ' comments'}</span></div>
      <h2 class="talk-t">Comments</h2>
      ${form()}
      <ul class="threads">
        ${tops.map(c => thread(one(c), c.id)).join('')}
        ${orphans.map(id => thread('<p class="c-gone">Comment removed</p>', id)).join('')}
      </ul>
      ${comments.length ? '' : '<p class="note c-empty">No comments yet. Start the conversation.</p>'}`;
    if (replyTo) el.querySelector(`form[data-parent="${CSS.escape(replyTo.parent)}"] textarea`)?.focus();
  }

  async function toggleLike(t) {
    if (!who) return auth.signIn().catch(() => {});
    if (who.needsName) { toast('Add your name in the comment box first'); el.querySelector('.c-name')?.focus(); return; }
    const id = `${t}_${who.uid}`, on = likedBy(t, who.uid);
    likes = on ? likes.filter(l => !(l.target === t && l.uid === who.uid)) : [...likes, { id, post: post.id, target: t, uid: who.uid, ts: Date.now() }];
    draw();
    try {
      if (on) await store.remove('likes', id);
      else { await store.set('likes', id, { post: post.id, target: t, uid: who.uid, ts: Date.now() }, false); award('like-' + post.id, 1); }
    } catch { toast('Could not save your like'); load(); }
  }

  async function submit(f) {
    if (busy) return;
    const text = f.text.value.trim();
    if (!text) return;
    if (who.needsName) {
      const name = f.name.value.trim().slice(0, 30);
      if (!name) return f.name.focus();
      const g = guest(); g.name = name;
      try { localStorage.setItem(GKEY, JSON.stringify(g)); } catch { }
      who = { uid: g.uid, name, photo: '' };
    }
    busy = true;
    f.querySelector('.btn.primary').disabled = true;
    const data = { post: post.id, parent: f.dataset.parent || '', uid: who.uid, name: who.name, photo: who.photo || '', text: text.slice(0, MAX), ts: Date.now() };
    try {
      await store.add('comments', data);
      replyTo = null;
      award('comment-' + post.id, 3);
      await load();
    } catch { toast('Could not post your comment'); f.querySelector('.btn.primary').disabled = false; }
    busy = false;
  }

  el.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.like) return toggleLike(b.dataset.like);
    if ('signin' in b.dataset) return auth.signIn().catch(() => toast('Sign-in did not finish'));
    if (b.dataset.reply) { if (!who) return auth.signIn().catch(() => {}); replyTo = { parent: b.dataset.reply, pre: b.dataset.to && b.dataset.to !== who.name ? '@' + b.dataset.to.replace(/\s+/g, '') + ' ' : '' }; draw(); return; }
    if ('cancel' in b.dataset) { replyTo = null; draw(); return; }
    if (b.dataset.del && confirm('Delete this comment?')) {
      try { await store.remove('comments', b.dataset.del); load(); } catch { toast('Could not delete'); }
    }
  });
  el.addEventListener('submit', e => { e.preventDefault(); submit(e.target); });
  el.addEventListener('input', e => {
    const t = e.target.closest('textarea'); if (!t) return;
    const left = t.form.querySelector('.c-left'); const n = MAX - t.value.length;
    left.textContent = n < 150 ? `${n} left` : '';
  });
  auth.onChange(() => load());
}
