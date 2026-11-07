// Armani on the page: a cut-out of her from the CLAWMONTANA TikTok that stands in the corner of the
// screen and stays there while the page scrolls. She only moves when you do: scrolling makes her strut
// in step with the page, and tapping her makes her strike a runway pose.
import { WALK } from './walker-data.js';

const POSES = ['hips', 'arms', 'wave', 'flip'];
const STEP_PX = 28;          // page scroll per strut frame

export function mountWalker() {
  const { cw, ch, fps, clips } = WALK;
  const el = document.createElement('div');
  el.className = 'walker';
  el.setAttribute('role', 'button'); el.tabIndex = 0;
  el.setAttribute('aria-label', 'Armani West. Tap for a runway pose');
  el.style.aspectRatio = `${cw} / ${ch}`;
  el.innerHTML = '<span class="wk-shadow"></span><div class="wk-fig"></div>';
  document.body.appendChild(el);
  const fig = el.querySelector('.wk-fig');

  // Sprite strips load in the background; a move is only used once its strip is ready.
  const ready = {};
  const load = name => ready[name] || (ready[name] = new Promise(res => {
    const im = new Image(); im.decoding = 'async';
    im.onload = () => { ready[name].ok = true; res(true); }; im.onerror = () => res(false);
    im.src = clips[name].src;
  }));

  let cur = null, frame = -1;
  const show = (name, i) => {
    const n = clips[name].n;
    if (cur !== name) { fig.style.backgroundImage = `url("${clips[name].src}")`; fig.style.backgroundSize = `${n * 100}% 100%`; cur = name; frame = -1; }
    if (i !== frame) { fig.style.backgroundPosition = `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0`; frame = i; }
  };
  const stand = () => show('hips', 0);

  load('hips').then(ok => { if (!ok) return el.remove(); stand(); el.classList.add('on'); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  ['strut', ...POSES].forEach(load);

  // Tap her (or press Enter / Space on her) for a pose, played forwards and back for the short ones.
  let posing = false, lastPose = '';
  const pose = () => {
    if (posing) return;
    const ok = POSES.filter(p => ready[p]?.ok && p !== lastPose);
    if (!ok.length) return;
    const p = ok[Math.floor(Math.random() * ok.length)], n = clips[p].n;
    const total = n < 24 ? 2 * n - 1 : n, t0 = performance.now();
    posing = true; lastPose = p;
    const tick = t => {
      const k = Math.floor((t - t0) / 1000 * fps);
      if (k >= total) { posing = false; stand(); return; }
      show(p, k < n ? k : 2 * n - 2 - k); requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  el.addEventListener('click', pose);
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pose(); } });

  // Scrolling: she struts in step with the page (frames follow the scroll position), leans with it,
  // and goes back to standing once the page stops.
  let lastY = scrollY, travel = 0, idle;
  addEventListener('scroll', () => {
    const dy = scrollY - lastY; lastY = scrollY;
    el.style.setProperty('--lean', Math.max(-5, Math.min(5, dy / 8)) + 'deg');
    if (!posing && ready.strut?.ok) {
      travel += Math.abs(dy);
      const n = clips.strut.n, cycle = 2 * n - 2, k = Math.floor(travel / STEP_PX) % cycle;
      show('strut', k < n ? k : cycle - k);
    }
    clearTimeout(idle);
    idle = setTimeout(() => { el.style.setProperty('--lean', '0deg'); if (!posing) stand(); }, 450);
  }, { passive: true });
}
