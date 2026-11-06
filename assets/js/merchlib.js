// Shared pieces for the merch landing page and the three collection pages.
import { esc, $, $$ } from './core.js';

export const LN = {
  patent: { name: 'Patent Leather', logo: 'assets/img/logo-w.png', bg: '#0b0b10', tag: 'Mirror-gloss. Kawaii goth. Hot pink and black.', slides: 5, acc: '#ff7ac8', url: 'merch-patent.html' },
  leather: { name: 'The Leather Line', logo: 'assets/img/logo-crest.png', bg: '#0b0b10', tag: 'Studded, distressed, cyber-dystopian.', slides: 5, acc: '#e0446f', url: 'merch-leather.html' },
  plaid: { name: 'The Plaid Line', logo: 'assets/img/logo-plaid-crest.png', bg: 'none', bare: true, tag: 'Goth schoolgirl. College-rave tartan.', slides: 3, acc: '#a98bff', url: 'merch-plaid.html' },
};

export function lineNav(active) {
  return Object.entries(LN).map(([k, l]) => `<a href="${l.url}" style="--acc:${l.acc}" ${k === active ? 'class="on"' : ''}><img src="${l.logo}" alt="" style="background:${l.bg}" class="${l.bare ? 'bare' : ''}">${l.name}</a>`).join('');
}

export function heroHTML(k, { compact = false, h1 = false } = {}) {
  const l = LN[k], T = h1 ? 'h1' : 'h2';
  return `<div class="mhero ${compact ? 'compact' : ''}" data-line="${k}" style="--acc:${l.acc}">
    <div class="mtrack">${Array.from({ length: l.slides }, (_, i) => `<div class="ms"><img src="assets/img/hero/${k}-${i + 1}.jpg" alt="${esc(l.name)} look ${i + 1}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join('')}</div>
    <div class="mshade"></div>
    <div class="mcopy"><span class="mbadge ${l.bare ? 'bare' : ''}" style="background:${l.bg}"><img src="${l.logo}" alt="${esc(l.name)} logo"></span><${T}>${esc(l.name)}</${T}><p>${esc(l.tag)}</p>${compact ? '' : `<a class="btn primary" href="${l.url}">Shop the line</a>`}</div>
    <button class="marr prev" aria-label="Previous">&#8249;</button><button class="marr next" aria-label="Next">&#8250;</button>
    <div class="mdots"></div>
  </div>`;
}

export function sliders() {
  $$('.mhero').forEach(h => {
    const tr = $('.mtrack', h), dots = $('.mdots', h);
    const base = [...tr.children].map(c => c.cloneNode(true)); const n = base.length;
    const vis = () => (matchMedia('(max-width:900px)').matches ? 1.28 : 3);
    // always keep enough slides in the track to rotate through, in either direction
    tr.innerHTML = '';
    const reps = Math.ceil((Math.ceil(vis()) + 3) / n);
    for (let r = 0; r < reps; r++) base.forEach(c => tr.appendChild(c.cloneNode(true)));
    dots.innerHTML = base.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join('');
    let busy = false, hold = false, idx = 0;
    const slideW = () => tr.children[0].getBoundingClientRect().width;
    const mark = () => [...dots.children].forEach((b, i) => b.classList.toggle('on', i === idx));
    const EASE = 'transform .6s cubic-bezier(.2,.8,.2,1)';
    const move = dir => {
      if (busy) return; busy = true; idx = (idx + dir + n) % n; mark();
      if (dir > 0) {
        tr.style.transition = EASE; tr.style.transform = `translateX(${-slideW()}px)`;
        setTimeout(() => { tr.style.transition = 'none'; tr.appendChild(tr.firstElementChild); tr.style.transform = 'translateX(0)'; busy = false; }, 620);
      } else {
        tr.style.transition = 'none'; tr.insertBefore(tr.lastElementChild, tr.firstElementChild); tr.style.transform = `translateX(${-slideW()}px)`;
        void tr.offsetWidth;
        tr.style.transition = EASE; tr.style.transform = 'translateX(0)';
        setTimeout(() => { busy = false; }, 620);
      }
    };
    mark();
    $('.prev', h).onclick = () => move(-1);
    $('.next', h).onclick = () => move(1);
    dots.onclick = e => {
      const i = [...dots.children].indexOf(e.target.closest('button')); if (i < 0) return;
      const fwd = (i - idx + n) % n, dir = fwd <= n / 2 ? 1 : -1, steps = dir > 0 ? fwd : n - fwd;
      (function step(k) { if (k <= 0) return; move(dir); setTimeout(() => step(k - 1), 650); })(steps);
    };
    let sx = null;
    h.addEventListener('pointerdown', e => { if (e.target.closest('button,a')) return; sx = e.clientX; hold = true; });
    h.addEventListener('pointerup', e => { if (sx != null && Math.abs(e.clientX - sx) > 40) move(e.clientX < sx ? 1 : -1); sx = null; });
    h.addEventListener('pointerenter', () => hold = true);
    h.addEventListener('pointerleave', () => { hold = false; sx = null; });
    window.addEventListener('resize', () => { tr.style.transition = 'none'; tr.style.transform = 'translateX(0)'; });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => { if (!hold && !document.hidden) move(1); }, 5200);
  });
}

const lg = s => s.replace('/merch/', '/merch/lg/');
export function lightbox(m) {
  const views = [m.image && ['Front', m.image], m.imageBack && ['Back', m.imageBack]].filter(Boolean); let i = 0;
  const lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', m.name);
  const draw = () => { lb.innerHTML = `<button class="lb-x" aria-label="Close">&times;</button><div class="lb-main">${views.length > 1 ? '<button class="lb-a l" aria-label="Previous view">&#8249;</button>' : ''}<img src="${esc(lg(views[i][1]))}" alt="${esc(m.name)} ${views[i][0]}">${views.length > 1 ? '<button class="lb-a r" aria-label="Next view">&#8250;</button>' : ''}</div><div class="lb-cap"><b>${esc(m.name)}</b> <span>${esc(m.price)}</span>${views.length > 1 ? `<div class="lb-th">${views.map((v, k) => `<button class="${k === i ? 'on' : ''}" data-k="${k}"><img src="${esc(v[1])}" alt="${v[0]}"></button>`).join('')}</div>` : ''}</div>`; };
  const close = () => { lb.remove(); document.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  const key = e => { if (e.key === 'Escape') close(); if (views.length > 1 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { i = (i + 1) % views.length; draw(); } };
  lb.onclick = e => { if (e.target.closest('.lb-x') || e.target === lb || e.target.classList.contains('lb-main')) return close(); const a = e.target.closest('.lb-a'); if (a) { i = (i + (a.classList.contains('r') ? 1 : -1) + views.length) % views.length; draw(); return; } const t = e.target.closest('[data-k]'); if (t) { i = +t.dataset.k; draw(); } };
  document.addEventListener('keydown', key); document.body.style.overflow = 'hidden'; draw(); document.body.appendChild(lb);
}
