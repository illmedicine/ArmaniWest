// Shared engine: data store (Firebase or demo/localStorage), Google auth, consent, presence,
// visitor location, member points, and the page chrome (nav, footer, avatar dock).
import cfg from './config.js';
import { seed, TIERS } from './seed.js';
import { mountAvatar } from './avatar.js';

export const demo = !(cfg.firebase && cfg.firebase.apiKey);
export { cfg, TIERS };

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};
export { LS };

/* ---------- Firebase (lazy) ---------- */
let fb = null;
async function fbInit() {
  if (fb) return fb;
  const b = 'https://www.gstatic.com/firebasejs/10.12.2/';
  const [app, auth, fs] = await Promise.all([import(b + 'firebase-app.js'), import(b + 'firebase-auth.js'), import(b + 'firebase-firestore.js')]);
  const a = app.initializeApp(cfg.firebase);
  fb = { auth, fs, a, authInst: auth.getAuth(a), db: fs.getFirestore(a) };
  return fb;
}

/* ---------- Store ---------- */
const lk = col => 'aw:' + col + ':v4';
function localCol(col) {
  let c = LS.get(lk(col), null);
  if (c === null) {
    c = {};
    if (col === 'site') Object.entries(seed.site).forEach(([k, v]) => c[k] = v);
    else Object.entries(seed[col] || {}).forEach(([k, v]) => c[k] = v);
    LS.set(lk(col), c);
  }
  return c;
}
export const store = {
  async list(col, { orderBy, dir = 'desc', limit, where } = {}) {
    if (demo) {
      let a = Object.entries(localCol(col)).map(([id, d]) => ({ id, ...d }));
      if (where) { const [f, op, v] = where; a = a.filter(x => op === '>' ? x[f] > v : op === '==' ? x[f] === v : true); }
      if (orderBy) a.sort((x, y) => (x[orderBy] > y[orderBy] ? 1 : -1) * (dir === 'desc' ? -1 : 1));
      return limit ? a.slice(0, limit) : a;
    }
    const f = await fbInit(); const { collection, getDocs, query, orderBy: ob, limit: lm, where: wh } = f.fs;
    const qs = []; if (where) qs.push(wh(...where)); if (orderBy) qs.push(ob(orderBy, dir)); if (limit) qs.push(lm(limit));
    return (await getDocs(query(collection(f.db, col), ...qs))).docs.map(d => ({ id: d.id, ...d.data() }));
  },
  async get(col, id) {
    if (demo) { const d = localCol(col)[id]; return d ? { id, ...d } : null; }
    const f = await fbInit(); const s = await f.fs.getDoc(f.fs.doc(f.db, col, id)); return s.exists() ? { id, ...s.data() } : null;
  },
  async set(col, id, data, merge = true) {
    if (demo) { const c = localCol(col); c[id] = merge ? { ...(c[id] || {}), ...data } : data; if (!LS.set(lk(col), c)) throw new Error('Storage is full. Remove some media.'); return id; }
    const f = await fbInit(); await f.fs.setDoc(f.fs.doc(f.db, col, id), data, { merge }); return id;
  },
  async add(col, data) {
    const id = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    if (demo) return this.set(col, id, data, false);
    const f = await fbInit(); const r = await f.fs.addDoc(f.fs.collection(f.db, col), data); return r.id;
  },
  async remove(col, id) {
    if (demo) { const c = localCol(col); delete c[id]; LS.set(lk(col), c); return; }
    const f = await fbInit(); await f.fs.deleteDoc(f.fs.doc(f.db, col, id));
  },
};

/* ---------- Auth ---------- */
let user = null; const listeners = new Set();
const emit = () => listeners.forEach(cb => cb(user));
export const auth = {
  get user() { return user; },
  get isAdmin() { return !!user && (demo || cfg.adminEmails.map(e => e.toLowerCase()).includes((user.email || '').toLowerCase())); },
  onChange(cb) { listeners.add(cb); cb(user); return () => listeners.delete(cb); },
  async signIn() {
    if (demo) return;
    const f = await fbInit(); await f.auth.signInWithPopup(f.authInst, new f.auth.GoogleAuthProvider());
  },
  async signOut() {
    if (demo) { user = null; emit(); return; }
    const f = await fbInit(); await f.auth.signOut(f.authInst);
  },
};
async function initAuth() {
  if (demo) { user = null; emit(); return; }
  const f = await fbInit();
  f.auth.onAuthStateChanged(f.authInst, u => { user = u ? { uid: u.uid, displayName: u.displayName, email: u.email, photoURL: u.photoURL } : null; emit(); });
}

/* ---------- Members, tiers, points ---------- */
export const tierFor = p => [...TIERS].reverse().find(t => p >= t.min) || TIERS[0];
export const nextTier = p => TIERS.find(t => t.min > p) || null;
const handleOf = u => { const p = (u.displayName || 'Fan').trim().split(/\s+/); return p[0] + (p[1] ? ' ' + p[1][0] + '.' : ''); };

export async function loadMember() {
  if (!user) return null;
  let m = await store.get('members', user.uid);
  if (!m) {
    m = { handle: handleOf(user), points: 50, createdAt: Date.now(), showOnBoard: true, mapOptIn: false, awards: { signup: Date.now() } };
    await store.set('members', user.uid, m, false);
    await store.set('board', user.uid, { handle: m.handle, points: m.points }, false);
  }
  return m;
}
export async function award(key, pts) {
  if (!user) return null;
  const m = await loadMember(); if (m.awards?.[key]) return m;
  const next = { points: m.points + pts, awards: { ...(m.awards || {}), [key]: Date.now() } };
  await store.set('members', user.uid, next);
  if (m.showOnBoard) await store.set('board', user.uid, { handle: m.handle, points: next.points });
  toast(`+${pts} prestige points`);
  return { ...m, ...next };
}
export const dailyKey = () => 'daily-' + new Date().toISOString().slice(0, 10);

/* ---------- Consent, presence, visitor location ---------- */
export const consent = () => LS.get('aw:consent', null);
async function geo() {
  const c = JSON.parse(sessionStorage.getItem('aw:geo') || 'null'); if (c) return c;
  try {
    const r = await (await fetch(cfg.geoEndpoint, { cache: 'no-store' })).json();
    if (r && r.success !== false && r.latitude != null) {
      const g = { city: r.city || '', region: r.region || '', country: r.country_code || r.country || '', lat: Math.round(r.latitude * 10) / 10, lng: Math.round(r.longitude * 10) / 10 };
      sessionStorage.setItem('aw:geo', JSON.stringify(g)); return g;
    }
  } catch { }
  return null;
}
export const getGeo = geo;
const sid = (() => { let s = sessionStorage.getItem('aw:sid'); if (!s) { s = Math.random().toString(36).slice(2, 12); sessionStorage.setItem('aw:sid', s); } return s; })();
export async function liveCount() {
  const rows = await store.list('presence', { where: ['ts', '>', Date.now() - 75000] });
  return Math.max(rows.length, demo ? 1 : 0);
}
async function startTracking() {
  if (consent() !== 'yes') return;
  const beat = () => store.set('presence', sid, { ts: Date.now(), path: location.pathname.split('/').pop() || 'home' }).catch(() => { });
  beat(); setInterval(beat, 30000);
  if (!sessionStorage.getItem('aw:logged')) {
    sessionStorage.setItem('aw:logged', '1');
    const g = await geo();
    let ref = ''; try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch { }
    store.add('visitors', { ts: Date.now(), path: location.pathname.split('/').pop() || 'home', ref, device: /Mobi/i.test(navigator.userAgent) ? 'mobile' : 'desktop', member: !!user, ...(g || {}) }).catch(() => { });
  }
}
function consentBanner() {
  if (consent() !== null) return;
  const b = document.createElement('div'); b.className = 'consent';
  b.innerHTML = `<p><b>Quick heads up:</b> with your OK, we count who is online and note your approximate city (never your IP address) so Armani knows where her fans are. <a href="privacy.html">Details</a></p>
    <div><button class="btn sm primary" data-v="yes">Sounds good</button> <button class="btn sm" data-v="no">No thanks</button></div>`;
  b.addEventListener('click', e => { const v = e.target.dataset?.v; if (!v) return; LS.set('aw:consent', v); b.remove(); if (v === 'yes') startTracking(); });
  document.body.appendChild(b);
}

/* ---------- UI bits ---------- */
export function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show')); setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}
export function md(src) {
  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/!\[([^\]]*)\]\((https?:[^)\s]+|data:image\/[^)\s]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return String(src || '').split(/\n{2,}/).map(p => p.trim()).filter(Boolean).map(p =>
    p.startsWith('## ') ? `<h3>${inline(p.slice(3))}</h3>` : p.startsWith('# ') ? `<h2>${inline(p.slice(2))}</h2>` : `<p>${inline(p).replace(/\n/g, '<br>')}</p>`).join('');
}
export async function compressImage(file, maxDim = 1600, maxBytes = 650000) {
  const url = URL.createObjectURL(file); const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  let s = Math.min(1, maxDim / Math.max(img.width, img.height)), q = .85, out = '';
  for (let i = 0; i < 8; i++) {
    const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); out = c.toDataURL('image/jpeg', q);
    if (out.length * .75 <= maxBytes) break; q -= .08; s *= .88;
  }
  URL.revokeObjectURL(url); return out;
}
export const fmtDate = d => new Date(d + (String(d).length === 10 ? 'T12:00:00' : '')).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

const NAV = [['index.html', 'Home'], ['about.html', 'About'], ['music.html', 'Music'], ['events.html', 'Events'], ['merch.html', 'Merch'], ['cameo.html', 'Cameo'], ['fans.html', 'Fanboys'], ['blog.html', 'Blog'], ['media.html', 'Media']];

export async function boot(page) {
  document.body.dataset.page = page;
  const here = location.pathname.split('/').pop() || 'index.html';
  const head = document.createElement('header'); head.className = 'nav';
  head.innerHTML = `<a href="index.html" class="brand"><img src="assets/img/logo-w-sm.png" alt="" width="30" height="30">ARMANI<span>WEST</span></a>
    <button class="burger" aria-label="Menu" aria-expanded="false">☰</button>
    <nav>${NAV.map(([h, t]) => `<a href="${h}" ${h === here ? 'class="on"' : ''}>${t}</a>`).join('')}</nav>
    <div class="nav-r"><span class="pill" id="livepill" hidden></span><button class="btn sm" id="authbtn">Join / Sign in</button></div>`;
  document.body.prepend(head);
  head.querySelector('.burger').onclick = e => { const o = head.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
  const foot = document.createElement('footer'); foot.className = 'foot';
  foot.innerHTML = `<div class="foot-in"><div><img class="foot-crest" src="assets/img/logo-crest.png" alt="Armani West crest" loading="lazy"><b class="brand">ARMANI<span>WEST</span></b><p>Official home. Los Angeles.</p></div>
    <div class="foot-links">${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="privacy.html">Privacy</a><a href="admin.html">Portal</a></div>
    <div class="foot-soc"><a href="https://instagram.com/armaniwesttt" target="_blank" rel="noopener">IG</a><a href="https://snapchat.com/add/armaniwesttt" target="_blank" rel="noopener">SNAP</a><a href="https://tiktok.com/@armaniwestt" target="_blank" rel="noopener">TT</a><a href="https://youtube.com/@armaniwestt" target="_blank" rel="noopener">YT</a><a href="https://twitch.tv/${cfg.twitchChannel}" target="_blank" rel="noopener">TWITCH</a></div></div>
    <p class="fine">&copy; ${new Date().getFullYear()} Armani West. </p>`;
  document.body.appendChild(foot);

  // Avatar dock (fixed to the side, reacts to scroll + clicks)
  if (!document.body.hasAttribute('data-noavatar')) {
    const dock = document.createElement('div'); dock.className = 'av-dock'; dock.setAttribute('aria-hidden', 'true'); document.body.appendChild(dock);
    mountAvatar(dock, { reactive: true });
  }

  const btn = $('#authbtn');
  if (demo) btn.hidden = true;
  auth.onChange(u => { btn.textContent = u ? `${(u.displayName || 'Me').split(' ')[0]} · Sign out` : 'Join / Sign in'; });
  btn.onclick = async () => { if (auth.user) { await auth.signOut(); toast('Signed out'); } else { await auth.signIn(); if (auth.user) { await loadMember(); toast('Welcome in!'); } } };
  await initAuth();
  consentBanner(); startTracking();
  auth.onChange(async u => { if (u) { const m = await loadMember(); await award(dailyKey(), 5); } });

  // live pill + live banner
  try {
    const live = await store.get('site', 'live');
    const n = await liveCount(); const pill = $('#livepill');
    if (live?.on) { pill.hidden = false; pill.className = 'pill live'; pill.textContent = '● LIVE NOW'; pill.onclick = () => location.href = live.url || ('https://twitch.tv/' + cfg.twitchChannel); }
    else if (n > 0) { pill.hidden = false; pill.textContent = `${n} here now`; }
    document.dispatchEvent(new CustomEvent('aw:live', { detail: live }));
  } catch { }
}
