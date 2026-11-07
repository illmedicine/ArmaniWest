// Armani on the page: a cut-out of her from the CLAWMONTANA TikTok that struts along the bottom of
// the screen, stops for runway poses, and now and then struts off the edge before coming back in.
import { WALK } from './walker-data.js';

const R = (a, b) => a + Math.random() * (b - a);
const POSES = ['hips', 'arms', 'wave', 'flip'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

export function mountWalker() {
  const { cw, ch, fps, clips } = WALK;
  const el = document.createElement('div');
  el.className = 'walker'; el.setAttribute('aria-hidden', 'true');
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
  const isReady = name => ready[name]?.ok;

  let cur = null, frame = -1;
  const show = (name, i) => {
    const n = clips[name].n;
    if (cur !== name) { fig.style.backgroundImage = `url("${clips[name].src}")`; fig.style.backgroundSize = `${n * 100}% 100%`; cur = name; frame = -1; }
    if (i !== frame) { fig.style.backgroundPosition = `${n > 1 ? (i / (n - 1)) * 100 : 0}% 0`; frame = i; }
  };

  const W = () => el.offsetWidth || 120;
  let x = 0, dir = 1, wantPose = false;
  const place = () => { el.style.transform = `translate3d(${Math.round(x)}px,0,0)`; };
  const face = d => { dir = d; el.style.setProperty('--dir', d); };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    load('hips').then(ok => { if (!ok) return; x = innerWidth - W() - 12; place(); show('hips', 0); el.classList.add('on'); });
    return;
  }

  // Plays a move at the video's own pace: once, or forwards and back (`bounce`) for the short ones.
  const play = (name, bounce = false) => new Promise(res => {
    const n = clips[name].n, total = bounce ? 2 * n - 1 : n, t0 = performance.now();
    const tick = t => {
      const k = Math.floor((t - t0) / 1000 * fps);
      if (k >= total) return res();
      show(name, k < n ? k : 2 * n - 2 - k); requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  // Struts toward a spot on the bottom edge, stepping through the strut frames as she goes.
  const strutTo = target => new Promise(res => {
    const n = clips.strut.n, cycle = 2 * n - 2, speed = () => el.offsetHeight * .38;
    face(target >= x ? 1 : -1);
    let last = performance.now(), t0 = last;
    const tick = t => {
      const dt = Math.min(.2, (t - last) / 1000); last = t;
      x += dir * speed() * dt; place();
      const k = Math.floor((t - t0) / 1000 * fps) % cycle;   // forwards then back, so the loop never jumps
      show('strut', k < n ? k : cycle - k);
      if ((dir > 0 ? x >= target : x <= target) || wantPose) return res();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  const spot = () => {
    const max = Math.max(8, innerWidth - W() - 8);
    let t; do t = R(8, max); while (Math.abs(t - x) < innerWidth * .22 && innerWidth > W() * 3);
    return t;
  };

  let lastPose = '';
  const pose = async () => {
    const ok = POSES.filter(p => isReady(p) && p !== lastPose);
    const p = ok[Math.floor(Math.random() * ok.length)] || 'hips';
    lastPose = p; wantPose = false;
    await play(p, clips[p].n < 24);
  };

  async function life() {
    if (!(await load('strut')) || !(await load('hips'))) { el.remove(); return; }
    POSES.forEach(load);
    x = innerWidth > 700 ? innerWidth - W() - 40 : innerWidth - W() - 8; place();
    show('hips', 0); el.classList.add('on');
    await play('hips');
    for (let round = 1; ; round++) {
      if (round % 4 === 0) {
        // strut off the nearest edge, take a break, then come back in from either side
        await strutTo(x + W() / 2 < innerWidth / 2 ? -W() - 10 : innerWidth + 10);
        if (wantPose) { await pose(); continue; }
        el.classList.remove('on'); await sleep(R(6000, 12000));
        x = Math.random() < .5 ? -W() : innerWidth; place(); show('strut', 0);
        el.classList.add('on');
      }
      await strutTo(spot());
      await pose();
    }
  }
  life();

  // Tap anywhere and she stops to strike a pose; scrolling makes her lean.
  addEventListener('pointerdown', e => { if (!e.target.closest('input,textarea,select')) wantPose = true; });
  let lastY = scrollY, idle;
  addEventListener('scroll', () => {
    const dy = scrollY - lastY; lastY = scrollY;
    el.style.setProperty('--lean', Math.max(-6, Math.min(6, dy / 6)) + 'deg');
    clearTimeout(idle); idle = setTimeout(() => el.style.setProperty('--lean', '0deg'), 500);
  }, { passive: true });
  addEventListener('resize', () => { x = Math.min(x, innerWidth - W() - 8); place(); });
}
