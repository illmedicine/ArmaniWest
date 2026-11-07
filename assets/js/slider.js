// Hero slider: one big slide with its title, arrows, swipe, autoplay and a strip of titled thumbnails.
// slides: [{ img, thumb, title, kick, sub, fit: 'cover'|'contain', play: html, actions: html, zoom: true }]
import { esc } from './core.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function heroSlider(el, slides, { label = 'Slides', auto = 6500, kind = '' } = {}) {
  if (!slides.length) { el.innerHTML = ''; return; }
  const n = slides.length;
  el.className = 'hs ' + kind;
  el.tabIndex = 0;
  el.setAttribute('role', 'region');
  el.setAttribute('aria-roledescription', 'carousel');
  el.setAttribute('aria-label', label);
  el.innerHTML = `
    <div class="hs-stage">
      <div class="hs-track">${slides.map((s, i) => `
        <div class="hs-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}: ${esc(s.title)}" ${i ? 'aria-hidden="true"' : ''}>
          <div class="hs-bg" data-bg="${esc(s.img)}"></div>
          <div class="hs-media">
            <img class="hs-img ${s.fit === 'cover' ? 'cover' : ''}" data-src="${esc(s.img)}" alt="${esc(s.title)}"${s.zoom ? ' data-zoom' : ''}>
            ${s.play || ''}
          </div>
          <div class="hs-cap">
            ${s.kick ? `<span class="hs-kick">${esc(s.kick)}</span>` : ''}
            <h3>${esc(s.title)}</h3>
            ${s.sub ? `<p>${esc(s.sub)}</p>` : ''}
            ${s.actions || ''}
          </div>
        </div>`).join('')}
      </div>
      <button class="hs-nav prev" aria-label="Previous">&#8249;</button>
      <button class="hs-nav next" aria-label="Next">&#8250;</button>
      <span class="hs-count" aria-live="polite"></span>
      <span class="hs-bar"><i></i></span>
    </div>
    <div class="hs-thumbs" role="tablist" aria-label="${esc(label)}">${slides.map((s, i) => `
      <button class="hs-th" role="tab" aria-label="${esc(s.title)}" data-i="${i}">
        <img src="${esc(s.thumb || s.img)}" data-full="${esc(s.img)}" alt="" loading="lazy" onerror="if(this.src!==this.dataset.full)this.src=this.dataset.full"><span>${esc(s.title)}</span>
      </button>`).join('')}
    </div>`;

  const track = el.querySelector('.hs-track'), els = [...el.querySelectorAll('.hs-slide')];
  const ths = [...el.querySelectorAll('.hs-th')], strip = el.querySelector('.hs-thumbs');
  const count = el.querySelector('.hs-count'), bar = el.querySelector('.hs-bar i');
  const orig = els.map(s => s.querySelector('.hs-media').innerHTML);
  let i = 0, timer = 0, hold = false, playing = false;

  const load = k => {
    const s = els[(k + n) % n], im = s.querySelector('.hs-img'), bg = s.querySelector('.hs-bg');
    if (im && !im.src) im.src = im.dataset.src;
    if (bg && !bg.style.backgroundImage) bg.style.backgroundImage = `url("${bg.dataset.bg}")`;
  };
  const stopMedia = k => {
    const m = els[k].querySelector('.hs-media');
    if (m.querySelector('iframe,video')) { m.innerHTML = orig[k]; load(k); }
  };

  function go(k, user) {
    k = (k + n) % n;
    if (k !== i) stopMedia(i);
    if (k !== i) playing = false;
    i = k;
    track.style.transform = `translateX(${-i * 100}%)`;
    els.forEach((s, j) => s.toggleAttribute('aria-hidden', j !== i));
    ths.forEach((t, j) => t.setAttribute('aria-selected', j === i));
    count.textContent = `${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
    [i, i + 1, i - 1].forEach(load);
    const t = ths[i];
    strip.scrollTo({ left: t.offsetLeft - strip.clientWidth / 2 + t.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    if (user) restart();
  }

  function restart() {
    clearInterval(timer);
    bar.style.animation = 'none';
    if (reduce || hold || playing || n < 2 || !auto) return;
    void bar.offsetWidth;
    bar.style.animation = `hsbar ${auto}ms linear infinite`;
    timer = setInterval(() => { if (!document.hidden) go(i + 1); }, auto);
  }

  el.querySelector('.prev').onclick = () => go(i - 1, true);
  el.querySelector('.next').onclick = () => go(i + 1, true);
  strip.onclick = e => { const t = e.target.closest('.hs-th'); if (t) go(+t.dataset.i, true); };
  el.addEventListener('keydown', e => {
    if (e.target.closest('iframe,video,input')) return;
    if (e.key === 'ArrowRight') { go(i + 1, true); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { go(i - 1, true); e.preventDefault(); }
  });
  el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hold = true; restart(); } });
  el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { hold = false; restart(); } });
  el.addEventListener('focusin', () => { hold = true; restart(); });
  el.addEventListener('focusout', e => { if (!el.contains(e.relatedTarget)) { hold = false; restart(); } });

  // swipe
  const stage = el.querySelector('.hs-stage');
  let x0 = null, y0 = 0;
  stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1), true);
  });

  // media inside a slide (video play buttons, zoom)
  stage.addEventListener('click', e => {
    const p = e.target.closest('[data-play]');
    if (p) {
      const m = p.closest('.hs-media');
      playing = true; restart();
      if (p.dataset.yt) m.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(p.dataset.yt)}?autoplay=1&rel=0" title="${esc(p.dataset.title || 'Video')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      else if (p.dataset.mp4) { m.innerHTML = `<video src="${esc(p.dataset.mp4)}" playsinline controls autoplay></video>`; }
      return;
    }
    if (e.target.closest('[data-zoom]')) lightbox(slides.map(s => ({ src: s.img, title: s.title })), i);
  });

  go(0);
  restart();
  return { go };
}

// Full-screen viewer that steps through a list of { src, title }.
export function lightbox(list, start = 0) {
  let i = start;
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  const many = list.length > 1;
  lb.innerHTML = `<button class="lb-x" aria-label="Close">&times;</button>
    <div class="lb-main">${many ? '<button class="lb-a l" aria-label="Previous">&#8249;</button>' : ''}<img alt="">${many ? '<button class="lb-a r" aria-label="Next">&#8250;</button>' : ''}</div>
    <p class="lb-cap"></p>`;
  const img = lb.querySelector('img'), cap = lb.querySelector('.lb-cap');
  const draw = () => {
    const it = list[i];
    img.src = it.src; img.alt = it.title || '';
    cap.innerHTML = `${esc(it.title || '')}${many ? `<span>${i + 1} / ${list.length}</span>` : ''}`;
  };
  const step = d => { i = (i + d + list.length) % list.length; draw(); };
  const close = () => { lb.remove(); removeEventListener('keydown', key); document.body.style.overflow = ''; };
  const key = e => {
    if (e.key === 'Escape') close();
    if (many && e.key === 'ArrowRight') step(1);
    if (many && e.key === 'ArrowLeft') step(-1);
  };
  lb.onclick = e => {
    const a = e.target.closest('.lb-a');
    if (a) return step(a.classList.contains('r') ? 1 : -1);
    if (e.target.closest('.lb-x') || e.target === lb || e.target.classList.contains('lb-main')) close();
  };
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (x0 === null || !many) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1); });
  addEventListener('keydown', key);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(lb);
  draw();
  lb.querySelector('.lb-x').focus();
}
