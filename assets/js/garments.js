// Procedural front/back garment mockups (SVG) for the three lines: patent, leather, plaid.
// These are design concepts, not photos. Real photos uploaded in the portal replace them.
let uid = 0;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const PAL = {
  patent: { base: '#08080e', base2: '#232338', accent: '#ff4fa3', trim: '#dfe5ef', text: '#ff4fa3', lapel: '#050508' },
  leather: { base: '#14100e', base2: '#2e231d', accent: '#9a2140', trim: '#c9cdd3', text: '#ece6dc', lapel: '#0d0a09' },
  plaid: { base: '#141014', base2: '#141014', accent: '#2de2c0', trim: '#2de2c0', text: '#ffffff', lapel: '#0a0709' },
};
const rr = (x, y, w, h, r) => `M${x + r},${y} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - 2 * r} a${r},${r} 0 0 1 -${r},${r} h-${w - 2 * r} a${r},${r} 0 0 1 -${r},-${r} v-${h - 2 * r} a${r},${r} 0 0 1 ${r},-${r}Z`;
const txt = (s, x, y, size, fill, rot = 0, ls = 0, extra = '') => `<text x="${x}" y="${y}" font-family="Unbounded,Arial Black,sans-serif" font-weight="800" font-size="${size}" fill="${fill}" text-anchor="middle" letter-spacing="${ls}" transform="rotate(${rot} ${x} ${y})" ${extra}>${esc(s)}</text>`;
const stud = (x, y, c) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${c}" stroke="#000" stroke-opacity=".5" stroke-width=".6"/>`;
const studs = (pts, c) => pts.map(p => stud(p[0], p[1], c)).join('');
const bolt = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s})" d="M6,-18 L-8,3 L0,3 L-5,18 L10,-4 L1,-4Z" fill="${c}"/>`;

function topShape({ w = 72, h = 250, sleeve = 'short', sh = 74, neck = 26, v = false }) {
  const cx = 150, y0 = 46, Ls = [cx - sh, y0 + 6], L = [[cx - neck, y0], Ls];
  if (sleeve === 'short') L.push([Ls[0] - 38, Ls[1] + 44], [Ls[0] - 14, Ls[1] + 66], [cx - w, y0 + 78]);
  else if (sleeve === 'long') L.push([Ls[0] - 62, Ls[1] + 186], [Ls[0] - 30, Ls[1] + 194], [cx - w, y0 + 88]);
  else L.push([cx - w + 6, y0 + 34], [cx - w, y0 + 78]);
  L.push([cx - w, h]);
  const R = [...L].reverse().map(p => [300 - p[0], p[1]]);
  const back = v ? `L150,${y0 + 52} L${L[0][0]},${L[0][1]}` : `Q150,${y0 + 30} ${L[0][0]},${L[0][1]}`;
  return `M${L[0]} ` + L.slice(1).map(p => `L${p}`).join(' ') + ' ' + R.map(p => `L${p}`).join(' ') + ' ' + back + ' Z';
}

function wrap(line, shapeD, { under = '', inner = '', outer = '' }, id) {
  const p = PAL[line], fabric = line === 'plaid' ? `url(#pl${id})` : `url(#fg${id})`;
  return `<svg class="gm" viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><defs>
    <linearGradient id="fg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.base2}"/><stop offset="1" stop-color="${p.base}"/></linearGradient>
    <pattern id="pl${id}" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#141014"/><rect y="4" width="22" height="7" fill="#ff4fa3" opacity=".92"/><rect x="4" width="7" height="22" fill="#ff4fa3" opacity=".92"/><rect y="15" width="22" height="2" fill="#2de2c0" opacity=".85"/><rect x="15" width="2" height="22" fill="#2de2c0" opacity=".85"/><rect y="1" width="22" height="1" fill="#fff" opacity=".55"/><rect x="1" width="1" height="22" fill="#fff" opacity=".55"/></pattern>
    <linearGradient id="gl${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".26" stop-color="#fff" stop-opacity=".6"/><stop offset=".34" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity=".28"/><stop offset=".78" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="gr${id}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .9 0"/></filter>
    <clipPath id="cp${id}"><path d="${shapeD}"/></clipPath></defs>
    <ellipse cx="150" cy="306" rx="96" ry="8" fill="#000" opacity=".4"/>${under}
    <path d="${shapeD}" fill="${fabric}"/>
    <g clip-path="url(#cp${id})">${line === 'patent' ? `<rect width="300" height="320" fill="url(#gl${id})"/>` : ''}${line === 'leather' ? `<rect width="300" height="320" filter="url(#gr${id})" opacity=".16"/>` : ''}${line === 'plaid' ? '<rect width="300" height="320" fill="#000" opacity=".12"/>' : ''}${inner}</g>
    <path d="${shapeD}" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="2"/><path d="${shapeD}" fill="none" stroke="${p.trim}" stroke-opacity=".28" stroke-width=".8" stroke-dasharray="3 3" transform="translate(150 160) scale(.975) translate(-150 -160)"/>${outer}</svg>`;
}

const rib = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#050507"/>` + Array.from({ length: Math.floor(w / 6) }, (_, i) => `<path d="M${x + 3 + i * 6},${y} v${h}" stroke="${c}" stroke-opacity=".18" stroke-width="1"/>`).join('');

// ---- garment drawers: return svg for a side ----
function draw(d, side) {
  const id = ++uid, line = d.line, p = PAL[line], T = d.text || 'MANIAC', front = side === 'front';
  const accent = p.accent, tx = p.text;
  switch (d.type) {
    case 'tee': case 'crop': case 'vtee': {
      const crop = d.type === 'crop', v = d.type === 'vtee' && front;
      const shape = topShape({ w: crop ? 60 : 72, sh: crop ? 66 : 74, h: crop ? 196 : 258, v });
      const y = crop ? 120 : 140, hem = crop ? 196 : 258;
      const neckRib = front ? (v ? `<path d="M124,46 L150,98 L176,46" fill="none" stroke="#050507" stroke-width="7" stroke-linejoin="round"/>` : `<path d="M124,46 Q150,80 176,46" fill="none" stroke="#050507" stroke-width="7"/>`) : `<path d="M124,46 Q150,62 176,46" fill="none" stroke="#050507" stroke-width="7"/>`;
      let art = '';
      if (front) art = d.type === 'vtee' ? bolt(150, y + 6, 1.3, accent) + txt(T, 150, y + 52, 21, tx, 0, 1) : crop ? txt(T, 150, y, 15, tx, 0, 1) + `<path d="M118,${y + 10} h64" stroke="${accent}" stroke-width="2"/>` : txt(T, 150, y, 23, tx, 0, 1) + `<path d="M104,${y + 10} h92" stroke="${accent}" stroke-width="3"/>`;
      else art = txt(T, 150, y + 12, crop ? 22 : 34, tx, 0, 1) + txt('UNIVERSITY OF', 150, y - 22, 8, accent, 0, 3) + txt('LOS ANGELES · EST. 2025', 150, y + (crop ? 34 : 40), 7, tx, 0, 2) + (d.type === 'vtee' ? bolt(150, y + 70, 1.6, accent) : '');
      return wrap(line, shape, { inner: `<rect x="40" y="${hem - 12}" width="220" height="14" fill="#000" opacity=".25"/>` + (line === 'plaid' ? '' : `<path d="M82,${hem - 4} h136" stroke="${accent}" stroke-opacity=".5"/>`) + art, outer: neckRib }, id);
    }
    case 'hoodie': case 'crophood': {
      const crop = d.type === 'crophood';
      const shape = topShape({ w: crop ? 66 : 78, sh: crop ? 72 : 78, h: crop ? 208 : 262, sleeve: 'long', neck: 32 });
      const under = `<path d="M108,58 Q150,-6 192,58 Q176,96 150,102 Q124,96 108,58Z" fill="${p.lapel}" stroke="#000" stroke-opacity=".5" stroke-width="2"/>`;
      const hem = crop ? 208 : 262;
      let inner = `<rect x="40" y="${hem - 16}" width="220" height="18" fill="#050507"/>`;
      if (front) inner += `<path d="M${crop ? 98 : 94},${hem - 70} L${crop ? 110 : 108},${hem - 16} L${crop ? 190 : 192},${hem - 16} L${crop ? 202 : 206},${hem - 70} Z" fill="#000" opacity=".28"/>` + txt(T, 150, crop ? 118 : 124, crop ? 16 : 19, tx, 0, 1) + `<path d="M${crop ? 112 : 108},${crop ? 126 : 132} h${crop ? 76 : 84}" stroke="${accent}" stroke-width="2.5"/>`;
      else inner += txt(T, 150, 150, crop ? 24 : 32, tx, 0, 1) + txt('MANIAC U.', 150, 118, 9, accent, 0, 4);
      const outer = front ? `<path d="M150,60 Q150,100 150,104" stroke="#050507" stroke-width="5"/><path d="M138,98 v34 M162,98 v34" stroke="${p.trim}" stroke-width="2.6" stroke-linecap="round"/><circle cx="138" cy="134" r="3" fill="${p.trim}"/><circle cx="162" cy="134" r="3" fill="${p.trim}"/>` : `<path d="M112,56 Q150,78 188,56" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="2"/>`;
      return wrap(line, shape, { under, inner, outer }, id);
    }
    case 'jacket': case 'jacketCrop': {
      const crop = d.type === 'jacketCrop', w = crop ? 70 : 80, h = crop ? 212 : 264;
      const shape = topShape({ w, sh: crop ? 76 : 82, h, sleeve: 'long', neck: 30 });
      const L = p.lapel; let inner = `<rect x="40" y="${h - 26}" width="220" height="28" fill="${L}"/><path d="M${150 - w + 4},${h - 26} H${150 + w - 4}" stroke="${p.trim}" stroke-opacity=".6"/>`;
      let outer = '';
      if (front) {
        inner += `<path d="M120,46 L150,126 L106,152 L90,70Z" fill="${L}" stroke="#000" stroke-opacity=".6"/><path d="M180,46 L150,126 L200,146 L212,70Z" fill="${L}" stroke="#000" stroke-opacity=".6"/>` + `<path d="M150,126 L${crop ? 142 : 136},${h - 26}" stroke="#000" stroke-width="3"/><path d="M${crop ? 112 : 104},${crop ? 150 : 168} h30 v20 h-30Z M176,${crop ? 150 : 168} h30 v20 h-30Z" fill="none" stroke="#000" stroke-opacity=".6"/>` + `<path d="M${150 - w + 20},${h - 60} q10,-20 20,0 M${150 + w - 40},${h - 60} q10,-20 20,0" stroke="#000" stroke-opacity=".5" fill="none"/>`;
        outer += `<path d="M150,126 L${crop ? 142 : 136},${h - 26}" stroke="${p.trim}" stroke-width="2" stroke-dasharray="2 2"/>` + studs([[100, 80], [108, 100], [118, 124], [200, 80], [192, 100], [182, 124], [76, 62], [224, 62], [128, 56], [172, 56]], p.trim) + `<rect x="${150 + w - 52}" y="${h - 22}" width="12" height="9" rx="2" fill="${p.trim}"/>` + `<rect x="${crop ? 82 : 74}" y="${crop ? 104 : 118}" width="18" height="6" rx="3" fill="${accent}"/>`;
        inner += txt('MANIAC', 192, crop ? 160 : 180, 7, tx, 0, 1);
      } else {
        inner += `<path d="M${150 - w},96 Q150,118 ${150 + w},96" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="2"/><path d="M150,50 V${h - 26}" stroke="#000" stroke-opacity=".5"/>` + txt(T, 150, crop ? 150 : 170, crop ? 27 : 33, tx, 0, 1) + txt('MANIAC U. · LA', 150, crop ? 126 : 142, 8, accent, 0, 4) + `<path d="M${150 - w + 16},${crop ? 164 : 184} h${2 * w - 32}" stroke="${accent}" stroke-width="2.4"/>`;
        outer += studs([96, 120, 144, 156, 180, 204].map(x => [x, 96 + Math.abs(x - 150) / 10]), p.trim);
      }
      return wrap(line, shape, { inner, outer }, id);
    }
    case 'beanie': {
      const shape = 'M66,212 Q60,64 150,52 Q240,64 234,212 Z';
      let inner = rib(60, 166, 180, 56, p.trim) + `<path d="M60,166 h180" stroke="${accent}" stroke-width="2"/>`;
      inner += front ? `<rect x="106" y="176" width="88" height="36" rx="6" fill="${accent}"/>` + txt(T, 150, 200, 15, line === 'plaid' ? '#050507' : '#fff', 0, 1) : `<rect x="132" y="186" width="36" height="14" fill="${p.trim}" opacity=".7"/>` + txt('LA', 150, 197, 9, '#050507');
      return wrap(line, shape, { inner: `<path d="M90,80 Q150,40 210,80 M80,120 Q150,76 220,120" stroke="#000" stroke-opacity=".25" fill="none"/>` + inner }, id);
    }
    case 'skirt': case 'pinafore': {
      const pin = d.type === 'pinafore';
      const shape = pin ? 'M104,34 L120,34 L124,88 L176,88 L180,34 L196,34 L202,100 L252,240 Q150,258 48,240 L98,100Z' : 'M104,92 L196,92 L252,238 Q150,256 48,238Z';
      const pleats = Array.from({ length: 10 }, (_, i) => `<path d="M${112 + i * 8.5},104 L${70 + i * 17},246" stroke="#000" stroke-opacity=".3"/>`).join('');
      const inner = pleats + `<rect x="90" y="${pin ? 88 : 86}" width="120" height="16" fill="#050507"/><path d="M90,${pin ? 104 : 102} h120" stroke="${accent}" stroke-opacity=".7"/>` + (front ? txt(T, 150, pin ? 99 : 98, 9, tx, 0, 3) : txt(T, 150, pin ? 99 : 98, 9, tx, 0, 3) + `<path d="M150,102 V240" stroke="${p.trim}" stroke-width="1.6" stroke-dasharray="2 2"/>`);
      return wrap(line, shape, { inner, outer: studs([[104, 38], [196, 38]].filter(() => pin), p.trim) + (front ? stud(150, 94, p.trim) : '') }, id);
    }
    case 'choker': {
      const shape = 'M60,128 Q150,214 240,128 L240,150 Q150,238 60,150Z';
      return wrap(line, shape, { inner: front ? '' : `<rect x="140" y="188" width="20" height="14" fill="${p.trim}"/>`, outer: front ? `<circle cx="150" cy="186" r="13" fill="none" stroke="${p.trim}" stroke-width="4"/><circle cx="150" cy="186" r="4" fill="${accent}"/>` + studs([[84, 160], [104, 176], [126, 184], [174, 184], [196, 176], [216, 160]], p.trim) : studs([[84, 162], [216, 162]], p.trim) }, id);
    }
    case 'bag': {
      const shape = rr(64, 128, 172, 120, 16);
      return wrap(line, shape, { inner: front ? `<path d="M64,128 Q150,210 236,128" fill="#000" opacity=".28"/>` + txt('MANIAC', 150, 232, 13, tx, 0, 2) : `<rect x="64" y="176" width="172" height="3" fill="#000" opacity=".4"/>`, outer: `<path d="M84,128 Q150,10 216,128" fill="none" stroke="${p.trim}" stroke-width="5" stroke-dasharray="1 7" stroke-linecap="round"/><path d="M84,128 Q150,14 216,128" fill="none" stroke="#000" stroke-width="1.5" opacity=".6"/>` + (front ? `<circle cx="150" cy="176" r="8" fill="${p.trim}"/><circle cx="150" cy="176" r="3" fill="${accent}"/>` : '') }, id);
    }
    case 'gloves': {
      const fing = [[102, 88], [124, 76], [146, 72], [168, 80]].map(([x, y]) => rr(x, y, 18, 70, 9)).join(' ');
      const shape = fing + ' ' + rr(100, 130, 88, 92, 22) + ' ' + `M100,170 Q70,150 66,128 Q64,114 78,116 Q92,120 106,146Z` + ' ' + rr(96, 218, 96, 34, 6);
      return wrap(line, shape, { inner: `<rect x="90" y="222" width="110" height="30" fill="#050507"/>` + (front ? txt('MANIAC', 144, 242, 10, tx, 0, 1) : `<path d="M110,150 h72" stroke="${accent}" stroke-width="3"/>`), outer: studs([[112, 188], [132, 188], [152, 188], [172, 188]], p.trim) }, id);
    }
    case 'socks': {
      const sock = x => `M${x + 6},34 h46 v170 q0,30 34,38 v34 h-100 v-34 q20,-8 20,-38Z`;
      const shape = sock(46) + ' ' + sock(138).replace('M144', 'M144');
      return wrap(line, shape, { inner: `<rect x="40" y="34" width="230" height="18" fill="#050507"/><rect x="40" y="62" width="230" height="5" fill="${accent}"/><rect x="40" y="72" width="230" height="3" fill="${p.trim}" opacity=".7"/>` + (front ? txt('MANIAC', 100, 150, 10, tx, -90, 2) + txt('MANIAC', 192, 150, 10, tx, -90, 2) : ''), outer: '' }, id);
    }
    case 'belt': {
      const shape = 'M30,142 Q150,206 270,142 L270,162 Q150,226 30,162Z';
      const loops = Array.from({ length: 9 }, (_, i) => { const t = i / 8, x = 40 + t * 220, y = 174 + Math.sin(t * Math.PI) * 28; return `<circle cx="${x}" cy="${y + 12}" r="8" fill="none" stroke="${p.trim}" stroke-width="3"/>`; }).join('');
      return wrap(line, shape, { inner: '', outer: loops + (front ? `<rect x="136" y="186" width="28" height="22" rx="3" fill="${p.trim}"/>` + txt('M', 150, 203, 14, '#050507') : '') }, id);
    }
    default: return wrap(line, rr(80, 80, 140, 140, 18), { inner: txt(T, 150, 160, 18, tx) }, id);
  }
}

export function faces(m) {
  if (m.image) return { front: `<img src="${esc(m.image)}" alt="${esc(m.name)} front" draggable="false">`, back: `<img src="${esc(m.imageBack || m.image)}" alt="${esc(m.name)} back" draggable="false">` };
  if (m.design) {
    // Drop real/AI product photos at assets/img/merch/<id>-front.jpg and -back.jpg; they cover the drawn preview.
    const ph = s => m.id ? `<img class="ph" src="assets/img/merch/${esc(m.id)}-${s}.jpg" alt="${esc(m.name)} ${s}" draggable="false" onerror="this.remove()">` : '';
    return { front: draw(m.design, 'front') + ph('front'), back: draw(m.design, 'back') + ph('back') };
  }
  return { front: `<div class="emo">${esc(m.emoji || '🛍️')}</div>`, back: `<div class="emo">${esc(m.emoji || '🛍️')}</div>` };
}

// Interactive turnaround: drag to rotate, tap to flip, buttons + arrow keys.
export function mountViewer(el, product) {
  const { front, back } = faces(product);
  el.classList.add('v3d'); el.tabIndex = 0; el.setAttribute('role', 'group'); el.setAttribute('aria-label', product.name + ': drag or use arrow keys to turn');
  el.innerHTML = `<div class="v3d-in"><div class="v3d-f">${front}</div><div class="v3d-f bk">${back}</div></div><div class="v3d-ui"><button type="button" data-s="0">Front</button><button type="button" data-s="1">Back</button></div><span class="v3d-hint">drag to turn</span>`;
  const inn = el.querySelector('.v3d-in'), hint = el.querySelector('.v3d-hint'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rot = 0, drag = false, sx = 0, start = 0, moved = 0;
  const set = (r, anim) => { inn.style.transition = anim && !reduce ? 'transform .7s cubic-bezier(.2,.8,.2,1)' : 'none'; inn.style.transform = `rotateY(${r}deg)`; rot = r; mark(); };
  const mark = () => { const b = Math.round(rot / 180) % 2 !== 0; el.querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', (x.dataset.s === '1') === b)); };
  const go = (back) => { const k = Math.round((rot - (back ? 180 : 0)) / 360); set(k * 360 + (back ? 180 : 0), true); };
  el.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; drag = true; moved = 0; sx = e.clientX; start = rot; el.setPointerCapture(e.pointerId); el.classList.add('grab'); hint.style.opacity = 0; });
  el.addEventListener('pointermove', e => { if (!drag) return; moved = Math.max(moved, Math.abs(e.clientX - sx)); set(start + (e.clientX - sx) * 0.9); });
  const end = () => { if (!drag) return; drag = false; el.classList.remove('grab'); moved < 5 ? set(rot + 180, true) : set(Math.round(rot / 180) * 180, true); };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  el.addEventListener('click', e => { const s = e.target.dataset?.s; if (s != null) go(s === '1'); });
  el.addEventListener('keydown', e => { if (e.key === 'ArrowRight') set(Math.round(rot / 180) * 180 + 180, true); if (e.key === 'ArrowLeft') set(Math.round(rot / 180) * 180 - 180, true); });
  mark();
  // gentle first-view nudge so people know it turns
  if (!reduce) setTimeout(() => { if (rot === 0 && !drag) { set(24, true); setTimeout(() => { if (!drag && rot === 24) set(0, true); }, 700); } }, 700 + Math.random() * 600);
}
