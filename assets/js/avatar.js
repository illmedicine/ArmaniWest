// Armani West: Bratz-style SVG avatar + scroll/click reactive dancing.
// Original artwork. Parts are separate groups so each can animate on its own.

const R = (n, m) => n + Math.random() * (m - n);
const pick = (arr, not) => { const a = arr.filter(x => x !== not); return a[Math.floor(Math.random() * a.length)]; };

function boot(cx, mirror) {
  // chunky black fur boot with pink fur trim + pink platform sole. Centered at cx=160 then mirrored.
  let fur = '';
  for (let y = 530; y <= 626; y += 12) {
    const l = 126 - ((y - 520) / 112) * 10, r = 194 + ((y - 520) / 112) * 12;
    fur += `<circle cx="${l}" cy="${y}" r="${10 + (y % 3)}" fill="#1b171b"/><circle cx="${r}" cy="${y}" r="${10 + (y % 2)}" fill="#1b171b"/>`;
  }
  for (let x = 122; x <= 206; x += 13) fur += `<circle cx="${x}" cy="${628 + (x % 3)}" r="11" fill="#1b171b"/>`;
  for (let i = 0; i < 26; i++) fur += `<circle cx="${128 + (i * 37) % 70}" cy="${540 + (i * 53) % 84}" r="${5 + i % 4}" fill="${i % 2 ? '#2a252a' : '#141114'}"/>`;
  let trim = '';
  for (let x = 120; x <= 204; x += 10) trim += `<circle cx="${x}" cy="${519 + (x % 4)}" r="11" fill="#ff4fa3"/><circle cx="${x + 2}" cy="${516 + (x % 3)}" r="5" fill="#ff9fcd"/>`;
  return `<g transform="${mirror ? 'translate(400,0) scale(-1,1)' : ''}">
    <path d="M126,520 L194,520 C208,560 212,600 206,632 L116,632 C110,600 116,560 126,520Z" fill="#141114"/>${fur}${trim}
    <rect x="108" y="630" width="104" height="15" rx="7.5" fill="#ff4fa3"/><rect x="112" y="631" width="60" height="4" rx="2" fill="#fff" opacity=".35"/></g>`;
}

function arm(mirror) {
  return `<g transform="${mirror ? 'translate(400,0) scale(-1,1)' : ''}">
    <path d="M156,300 Q140,340 132,386" stroke="#9b5d3a" stroke-width="17" stroke-linecap="round" fill="none"/>
    <path d="M158,296 L148,328" stroke="url(#plaid)" stroke-width="22" stroke-linecap="round" fill="none"/>
    <circle cx="132" cy="392" r="11" fill="#9b5d3a"/>
    <circle cx="124" cy="400" r="3.4" fill="#d4ff3a"/><circle cx="131" cy="403" r="3.4" fill="#d4ff3a"/><circle cx="138" cy="401" r="3.4" fill="#d4ff3a"/>
    <path d="M142,350 L146,356" stroke="#ff4fa3" stroke-width="3" stroke-linecap="round"/>
    <path d="M128,346 q4,6 14,2" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/></g>`;
}

function eye(mirror) {
  return `<g transform="${mirror ? 'translate(400,0) scale(-1,1)' : ''}">
    <ellipse cx="166" cy="158" rx="23" ry="10" fill="#2de2c0" opacity=".55"/>
    <ellipse cx="165" cy="173" rx="19" ry="14" fill="#fff"/>
    <circle cx="165" cy="174" r="11.5" fill="#4a2a16"/><circle cx="165" cy="174" r="5.5" fill="#0b0709"/>
    <circle cx="169.5" cy="169" r="3.6" fill="#fff"/><circle cx="160" cy="179" r="1.9" fill="#fff" opacity=".9"/>
    <path d="M143,172 Q165,148 189,168" stroke="#0b0709" stroke-width="4.4" fill="none" stroke-linecap="round"/>
    <path d="M188,167 L199,160" stroke="#0b0709" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M148,164 L142,158 M156,158 L152,150 M166,155 L165,146 M177,157 L179,149" stroke="#0b0709" stroke-width="2.4" stroke-linecap="round"/></g>`;
}

function ear(mirror) {
  return `<g transform="${mirror ? 'translate(400,0) scale(-1,1)' : ''}">
    <path d="M116,96 L124,30 L170,80 Z" fill="#141114"/><path d="M127,76 L130,48 L152,74 Z" fill="#f7f7f7"/>
    <g transform="translate(138,86)"><path d="M0,0 L-18,-11 L-18,11 Z M0,0 L18,-11 L18,11 Z" fill="#ff4fa3"/><circle r="5" fill="#ff9fcd"/></g></g>`;
}

export function avatarSVG() {
  const pearls = Array.from({ length: 9 }, (_, i) => { const t = i / 8, x = 178 + t * 44, y = 282 + Math.sin(t * Math.PI) * 13; return `<circle cx="${x}" cy="${y}" r="3.3" fill="#fff" stroke="#ddd" stroke-width=".6"/>`; }).join('');
  const pleats = Array.from({ length: 8 }, (_, i) => `<path d="M${166 + i * 10},374 L${150 + i * 14.5},436" stroke="#000" stroke-opacity=".28" stroke-width="1.4"/>`).join('');
  return `<svg class="aw-av" viewBox="0 0 400 680" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartoon avatar of Armani West">
  <defs>
    <pattern id="plaid" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#171417"/><rect y="3" width="16" height="5" fill="#ff4fa3" opacity=".9"/><rect x="3" width="5" height="16" fill="#ff4fa3" opacity=".9"/><rect y="11" width="16" height="1.6" fill="#fff" opacity=".4"/><rect x="11" width="1.6" height="16" fill="#fff" opacity=".4"/></pattern>
    <linearGradient id="hairG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4ff2d3"/><stop offset="1" stop-color="#10b99c"/></linearGradient>
    <radialGradient id="skinG" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="#b06c44"/><stop offset="1" stop-color="#8a4f2d"/></radialGradient>
  </defs>
  <ellipse cx="200" cy="650" rx="120" ry="10" fill="#000" opacity=".3"/>
  <g id="av-all" data-part="all" style="transform-origin:200px 650px">
    <g data-part="hairB" style="transform-origin:200px 60px"><path d="M108,150 C98,60 150,22 200,22 C250,22 302,60 292,150 C312,262 304,386 282,438 L250,404 L242,250 L158,250 L150,404 L118,438 C96,386 88,262 108,150Z" fill="url(#hairG)"/>
      <path d="M130,200 C122,280 128,350 138,400 M270,200 C278,280 272,350 262,400" stroke="#9ff7e6" stroke-width="3" opacity=".5" fill="none"/></g>
    <g data-part="legL" style="transform-origin:181px 420px"><rect x="168" y="410" width="26" height="130" rx="13" fill="url(#skinG)"/>${boot(160, false)}</g>
    <g data-part="legR" style="transform-origin:219px 420px"><rect x="206" y="410" width="26" height="130" rx="13" fill="url(#skinG)"/>${boot(240, true)}</g>
    <g data-part="skirt" style="transform-origin:200px 372px"><path d="M158,372 L242,372 L266,436 Q200,452 134,436Z" fill="url(#plaid)"/>${pleats}<path d="M134,436 Q200,452 266,436" stroke="#ff4fa3" stroke-width="5" fill="none"/></g>
    <g data-part="torso" style="transform-origin:200px 380px"><rect x="164" y="340" width="72" height="40" rx="10" fill="url(#skinG)"/><circle cx="200" cy="362" r="2.2" fill="#6d3a20"/>
      <path d="M154,296 Q200,282 246,296 L254,348 Q200,362 146,348Z" fill="url(#plaid)"/>
      <path d="M184,289 L200,322 L216,289Z" fill="#9b5d3a"/><path d="M184,289 L200,322 L216,289" stroke="#fff" stroke-width="2.6" fill="none" opacity=".85"/>
      <circle cx="200" cy="334" r="2.4" fill="#ff4fa3"/><circle cx="200" cy="345" r="2.4" fill="#ff4fa3"/>${pearls}</g>
    <g data-part="armL" style="transform-origin:156px 300px">${arm(false)}</g>
    <g data-part="armR" style="transform-origin:244px 300px">${arm(true)}</g>
    <rect x="187" y="258" width="26" height="40" rx="11" fill="#8a4f2d"/>
    <g data-part="head" style="transform-origin:200px 262px">
      <path d="M124,160 C124,90 160,80 200,80 C240,80 276,90 276,160 C276,226 240,264 200,264 C160,264 124,226 124,160Z" fill="url(#skinG)"/>
      <ellipse cx="150" cy="208" rx="14" ry="8" fill="#ff4fa3" opacity=".35"/><ellipse cx="250" cy="208" rx="14" ry="8" fill="#ff4fa3" opacity=".35"/>
      <g data-part="eyes" class="aw-eyes">${eye(false)}${eye(true)}</g>
      <rect x="139" y="146" width="54" height="46" rx="18" fill="#fff" fill-opacity=".1" stroke="#6b3a1d" stroke-width="4.5"/><rect x="207" y="146" width="54" height="46" rx="18" fill="#fff" fill-opacity=".1" stroke="#6b3a1d" stroke-width="4.5"/>
      <path d="M193,164 Q200,158 207,164" stroke="#6b3a1d" stroke-width="3.5" fill="none"/>
      <path d="M146,138 Q166,128 190,136 M254,138 Q234,128 210,136" stroke="#1a1214" stroke-width="3.6" stroke-linecap="round" fill="none"/>
      <path d="M197,200 Q200,208 203,200" stroke="#6d3a20" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <path d="M180,224 Q190,215 200,220 Q210,215 220,224 Q210,242 200,242 Q190,242 180,224Z" fill="#ff4fa3"/><ellipse cx="193" cy="224" rx="6" ry="2.2" fill="#fff" opacity=".7"/>
      <g data-part="mouthO" style="opacity:0"><path d="M182,222 Q200,214 218,222 Q216,250 200,250 Q184,250 182,222Z" fill="#7a1236"/><ellipse cx="200" cy="244" rx="8" ry="4" fill="#ff7aa8"/></g>
      <path d="M122,152 C120,95 150,68 200,66 C250,68 280,95 278,152 C262,122 240,102 200,102 C160,102 138,122 122,152Z" fill="url(#hairG)"/>
      <path d="M122,150 C110,200 116,252 128,292 L144,292 C134,250 138,200 142,160Z M278,150 C290,200 284,252 272,292 L256,292 C266,250 262,200 258,160Z" fill="url(#hairG)"/>
      ${ear(false)}${ear(true)}
    </g>
  </g></svg>`;
}

// Each move: (d = direction/mirror, ) => [[part, keyframes, timing]]
const kf = (...t) => t.map(transform => ({ transform }));
const MOVES = {
  bounce: d => [['all', kf('translateY(0) scale(1,1)', 'translateY(-18px) scale(.97,1.04)', 'translateY(0) scale(1.03,.96)', 'translateY(0) scale(1,1)'), { duration: 640 }], ['armL', kf('rotate(0)', 'rotate(22deg)', 'rotate(0)'), { duration: 640 }], ['armR', kf('rotate(0)', 'rotate(-22deg)', 'rotate(0)'), { duration: 640 }], ['hairB', kf('rotate(0)', 'rotate(' + 4 * d + 'deg)', 'rotate(0)'), { duration: 640 }]],
  hipSway: d => [['torso', kf('rotate(0)', `rotate(${-5 * d}deg)`, `rotate(${5 * d}deg)`, 'rotate(0)'), { duration: 1100 }], ['skirt', kf('rotate(0)', `rotate(${9 * d}deg)`, `rotate(${-9 * d}deg)`, 'rotate(0)'), { duration: 1100 }], ['head', kf('rotate(0)', `rotate(${6 * d}deg)`, `rotate(${-6 * d}deg)`, 'rotate(0)'), { duration: 1100 }], ['hairB', kf('rotate(0)', `rotate(${7 * d}deg)`, `rotate(${-7 * d}deg)`, 'rotate(0)'), { duration: 1100 }], ['armL', kf('rotate(0)', 'rotate(30deg)', 'rotate(-6deg)', 'rotate(0)'), { duration: 1100 }], ['armR', kf('rotate(0)', 'rotate(6deg)', 'rotate(-30deg)', 'rotate(0)'), { duration: 1100 }]],
  wave: d => [['armR', kf('rotate(0)', 'rotate(-150deg)', 'rotate(-118deg)', 'rotate(-150deg)', 'rotate(-118deg)', 'rotate(-150deg)', 'rotate(0)'), { duration: 1500 }], ['head', kf('rotate(0)', `rotate(${8 * d}deg)`, 'rotate(0)'), { duration: 1500 }], ['mouthO', [{ opacity: 1 }, { opacity: 1 }], { duration: 1500 }]],
  clap: d => [['armL', kf('rotate(0)', 'rotate(-40deg)', 'rotate(-6deg)', 'rotate(-40deg)', 'rotate(0)'), { duration: 900 }], ['armR', kf('rotate(0)', 'rotate(40deg)', 'rotate(6deg)', 'rotate(40deg)', 'rotate(0)'), { duration: 900 }], ['all', kf('translateY(0)', 'translateY(-8px)', 'translateY(0)', 'translateY(-8px)', 'translateY(0)'), { duration: 900 }], ['mouthO', [{ opacity: 1 }, { opacity: 1 }], { duration: 900 }]],
  twirl: d => [['all', kf('scale(1,1)', 'scale(.1,1)', 'scale(-1,1)', 'scale(.1,1)', 'scale(1,1)'), { duration: 1000, easing: 'ease-in-out' }], ['skirt', kf('scale(1,1)', 'scale(1.3,1)', 'scale(1,1)'), { duration: 1000 }], ['hairB', kf('rotate(0)', `rotate(${14 * d}deg)`, 'rotate(0)'), { duration: 1000 }]],
  kick: d => [['legL', kf('rotate(0)', `rotate(${-24}deg)`, 'rotate(0)', 'rotate(0)'), { duration: 1000 }], ['legR', kf('rotate(0)', 'rotate(0)', 'rotate(24deg)', 'rotate(0)'), { duration: 1000 }], ['all', kf('translateX(0)', `translateX(${-6 * d}px)`, `translateX(${6 * d}px)`, 'translateX(0)'), { duration: 1000 }], ['skirt', kf('rotate(0)', 'rotate(-6deg)', 'rotate(6deg)', 'rotate(0)'), { duration: 1000 }]],
  hype: d => [['armL', kf('rotate(0)', 'rotate(155deg)', 'rotate(140deg)', 'rotate(155deg)', 'rotate(0)'), { duration: 1300 }], ['armR', kf('rotate(0)', 'rotate(-155deg)', 'rotate(-140deg)', 'rotate(-155deg)', 'rotate(0)'), { duration: 1300 }], ['all', kf('translateY(0)', 'translateY(-20px)', 'translateY(0)', 'translateY(-20px)', 'translateY(0)'), { duration: 1300 }], ['hairB', kf('rotate(0)', 'rotate(6deg)', 'rotate(-6deg)', 'rotate(0)'), { duration: 1300 }], ['mouthO', [{ opacity: 1 }, { opacity: 1 }], { duration: 1300 }]],
  whip: d => [['hairB', kf('rotate(0)', `rotate(${14 * d}deg)`, `rotate(${-14 * d}deg)`, `rotate(${10 * d}deg)`, 'rotate(0)'), { duration: 900 }], ['head', kf('rotate(0)', `rotate(${-10 * d}deg)`, `rotate(${10 * d}deg)`, 'rotate(0)'), { duration: 900 }], ['armL', kf('rotate(0)', 'rotate(60deg)', 'rotate(0)'), { duration: 900 }]],
  shimmy: d => [['torso', kf('translateX(0)', 'translateX(-5px)', 'translateX(5px)', 'translateX(-5px)', 'translateX(5px)', 'translateX(0)'), { duration: 700 }], ['skirt', kf('rotate(0)', 'rotate(7deg)', 'rotate(-7deg)', 'rotate(7deg)', 'rotate(-7deg)', 'rotate(0)'), { duration: 700 }], ['armL', kf('rotate(0)', 'rotate(50deg)', 'rotate(35deg)', 'rotate(50deg)', 'rotate(0)'), { duration: 700 }], ['armR', kf('rotate(0)', 'rotate(-50deg)', 'rotate(-35deg)', 'rotate(-50deg)', 'rotate(0)'), { duration: 700 }]],
  headbop: d => [['head', kf('rotate(0) translateY(0)', `rotate(${9 * d}deg) translateY(-5px)`, `rotate(${-9 * d}deg) translateY(0)`, 'rotate(0) translateY(0)'), { duration: 800 }], ['all', kf('translateY(0)', 'translateY(-8px)', 'translateY(0)'), { duration: 800 }]],
};
const SCROLL_MOVES = ['bounce', 'hipSway', 'kick', 'whip', 'shimmy', 'headbop', 'twirl', 'clap'];
const CLICK_MOVES = ['hype', 'wave', 'clap', 'bounce', 'twirl', 'shimmy'];

export function mountAvatar(el, { reactive = false, size } = {}) {
  el.innerHTML = avatarSVG();
  if (size) el.style.setProperty('--av-size', size);
  const part = n => el.querySelector(`[data-part="${n}"]`);
  let running = [], last = '';
  const ctl = {
    el,
    play(name, { dir = 1, speed = 1 } = {}) {
      const m = MOVES[name]; if (!m) return;
      running.forEach(a => { try { a.cancel(); } catch { } });
      running = m(dir >= 0 ? 1 : -1).map(([p, frames, t]) => {
        const node = part(p); if (!node) return null;
        return node.animate(frames, { easing: 'ease-in-out', ...t, duration: t.duration / Math.max(.6, Math.min(2.4, speed)) });
      }).filter(Boolean);
      last = name;
    },
    random(list, opts) { const n = pick(list, last); this.play(n, opts); return n; },
    rest() { running.forEach(a => { try { a.finish(); } catch { } }); running = []; },
  };
  if (reactive) wireReactive(ctl);
  return ctl;
}

function wireReactive(av) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const dock = av.el;
  let lastY = scrollY, lastT = performance.now(), acc = 0, lastMove = 0, idle;
  addEventListener('scroll', () => {
    const y = scrollY, t = performance.now(), dy = y - lastY, dt = Math.max(16, t - lastT);
    lastY = y; lastT = t; acc += Math.abs(dy);
    dock.style.setProperty('--lean', Math.max(-7, Math.min(7, dy / 5)) + 'deg');
    if (acc > 130 && t - lastMove > 420) {
      acc = 0; lastMove = t;
      av.random(SCROLL_MOVES, { dir: dy >= 0 ? 1 : -1, speed: 1 + Math.min(1.4, Math.abs(dy) / dt * 1.6) });
    }
    clearTimeout(idle); idle = setTimeout(() => { dock.style.setProperty('--lean', '0deg'); }, 700);
  }, { passive: true });
  addEventListener('pointerdown', e => {
    if (e.target.closest('input,textarea,select')) return;
    av.random(CLICK_MOVES, { dir: e.clientX > innerWidth / 2 ? 1 : -1, speed: R(1, 1.5) });
    sparkle(e.clientX, e.clientY);
  });
}

function sparkle(x, y) {
  const glyphs = ['♥', '✦', '★', '🏀', '♡'];
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('span');
    s.className = 'aw-spark'; s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.cssText = `left:${x}px;top:${y}px;--dx:${R(-50, 50)}px;--dy:${R(-90, -30)}px;color:${Math.random() > .5 ? '#ff4fa3' : '#2de2c0'}`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 900);
  }
}
