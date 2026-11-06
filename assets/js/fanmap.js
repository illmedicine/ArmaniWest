// Snap-Maps style fan map: cute avatar pins, name tags, bottom fan tray, tap-for-card.
import { avatarSVG } from './avatar.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hash = s => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const HAIR = ['#ff4fa3', '#2de2c0', '#a98bff', '#ffd23f', '#ff7a45', '#4fa3ff', '#e8e8f0', '#d4ff3a'];
const SKIN = ['#f2c9a5', '#d9a273', '#b9774b', '#8a4f2d', '#6a3b22', '#f6d8bf'];

// tiny chibi head, colors derived from the handle so every fan looks a little different
function bald(skin) {
  const d = skin.replace('#', ''), sh = '#' + [0, 2, 4].map(i => Math.max(0, parseInt(d.substr(i, 2), 16) - 28).toString(16).padStart(2, '0')).join('');
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#2a1d3b"/>
    <path d="M2,100 C4,80 24,74 50,74 C76,74 96,80 98,100Z" fill="#1c1822"/>
    <path d="M38,70 H62 V82 Q50,90 38,82Z" fill="${sh}"/>
    <path d="M24,52 C24,22 38,14 50,14 C62,14 76,22 76,52 C76,72 66,86 50,86 C34,86 24,72 24,52Z" fill="${skin}"/>
    <ellipse cx="22.5" cy="56" rx="4" ry="7" fill="${skin}"/><ellipse cx="77.5" cy="56" rx="4" ry="7" fill="${skin}"/>
    <path d="M36,34 Q50,24 64,34" stroke="#fff" stroke-opacity=".28" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M32,48 Q40,43 47,48 M53,48 Q60,43 68,48" stroke="#1a1214" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <ellipse cx="40" cy="55" rx="3.6" ry="4" fill="#1a1214"/><ellipse cx="60" cy="55" rx="3.6" ry="4" fill="#1a1214"/>
    <circle cx="41.2" cy="53.6" r="1.3" fill="#fff"/><circle cx="61.2" cy="53.6" r="1.3" fill="#fff"/>
    <path d="M50,56 V66 M47,67 Q50,69 53,67" stroke="${sh}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M42,75 Q50,80 58,75" stroke="#4a2418" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M26,66 Q34,86 50,87 Q66,86 74,66" stroke="${sh}" stroke-opacity=".5" stroke-width="3" fill="none"/>
  </svg>`;
}
export function chibi(seed, look) {
  if (look && look.bald) return bald(look.skin || '#8a5a3a');
  const h = hash(seed), hair = HAIR[h % HAIR.length], skin = SKIN[(h >> 3) % SKIN.length];
  const ears = (h >> 5) % 3 === 0, specs = (h >> 7) % 2 === 0, bow = (h >> 9) % 3 === 1;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#2a1d3b"/>
    ${ears ? `<path d="M22,34 L26,10 L44,26Z M78,34 L74,10 L56,26Z" fill="#141114"/><path d="M28,28 L29,17 L38,26Z M72,28 L71,17 L62,26Z" fill="#ff9fcd"/>` : ''}
    <path d="M18,56 C14,24 34,12 50,12 C66,12 86,24 82,56 C88,80 84,96 76,100 L24,100 C16,96 12,80 18,56Z" fill="${hair}"/>
    <ellipse cx="50" cy="58" rx="27" ry="29" fill="${skin}"/>
    <path d="M23,52 C24,28 38,22 50,22 C62,22 76,28 77,52 C70,40 60,34 50,34 C40,34 30,40 23,52Z" fill="${hair}"/>
    <ellipse cx="40" cy="58" rx="4.6" ry="5.6" fill="#1a1214"/><ellipse cx="60" cy="58" rx="4.6" ry="5.6" fill="#1a1214"/>
    <circle cx="41.6" cy="56" r="1.7" fill="#fff"/><circle cx="61.6" cy="56" r="1.7" fill="#fff"/>
    ${specs ? `<rect x="30" y="50" width="20" height="16" rx="6" fill="none" stroke="#3a2418" stroke-width="2.2"/><rect x="50" y="50" width="20" height="16" rx="6" fill="none" stroke="#3a2418" stroke-width="2.2"/><path d="M49,57 h2" stroke="#3a2418" stroke-width="2"/>` : ''}
    <ellipse cx="32" cy="70" rx="5" ry="3" fill="#ff4fa3" opacity=".4"/><ellipse cx="68" cy="70" rx="5" ry="3" fill="#ff4fa3" opacity=".4"/>
    <path d="M43,73 Q50,80 57,73" stroke="#7a1236" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    ${bow ? `<path d="M64,20 l12,-7 v14z M64,20 l-12,-7 v14z" fill="#ff4fa3"/><circle cx="64" cy="20" r="3.5" fill="#ff9fcd"/>` : ''}
  </svg>`;
}

// Armani's own head, cropped from the full avatar artwork
function armaniHead() {
  return avatarSVG().replace('viewBox="0 0 400 680"', 'viewBox="95 12 210 270"').replace('class="aw-av"', 'class="aw-av-head" preserveAspectRatio="xMidYMin slice"');
}

const pin = ({ seed, look, label, big, host, glow }) => `<div class="sm-pin ${big ? 'big' : ''} ${host ? 'host' : ''}" style="--g:${glow || '#ff4fa3'}"><div class="sm-ring"><div class="sm-face">${host ? armaniHead() : chibi(seed, look)}</div></div><span class="sm-tag">${esc(label)}</span></div>`;

export function mountFanMap({ el, pins, tierFor, ready }) {
  const HOST = { id: '__host', handle: 'Armani West', city: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437, host: true };
  const all = [HOST, ...pins];
  const map = L.map(el, { scrollWheelZoom: false, zoomControl: false, worldCopyJump: true, minZoom: 3, maxZoom: 16, zoomSnap: .25, attributionControl: false });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, className: 'sm-tiles' }).addTo(map);
  L.control.attribution({ prefix: false, position: 'bottomright' }).addAttribution('&copy; OpenStreetMap').addTo(map);
  L.control.zoom({ position: 'topright' }).addTo(map);

  const root = el.closest('.snapmap') || el.parentElement;
  const sheet = root.querySelector('.sm-sheet'), tray = root.querySelector('.sm-tray'), q = root.querySelector('.sm-q');
  const markers = new Map();

  all.forEach(p => {
    const icon = L.divIcon({ className: 'sm-wrap', html: pin({ seed: p.handle, look: p.look, label: p.host ? 'Armani' : p.handle, big: p.host, host: p.host, glow: p.host ? '#2de2c0' : '#ff4fa3' }), iconSize: [0, 0], iconAnchor: [0, 0] });
    const m = L.marker([p.lat, p.lng], { icon, zIndexOffset: p.host ? 1000 : 0, keyboard: true, title: p.handle }).addTo(map);
    m.on('click', () => open(p));
    markers.set(p.id, m);
  });

  function open(p) {
    const t = p.host ? null : tierFor(p.points || 0);
    sheet.innerHTML = `<button class="sm-x" aria-label="Close">&times;</button><div class="sm-ava">${p.host ? armaniHead() : chibi(p.handle, p.look)}</div>
      <div class="sm-info"><b>${esc(p.handle)}</b><span>${esc(p.city || '')}</span>${t ? `<em>${t.icon} ${t.name} &middot; ${p.points || 0} pts</em>` : '<em>&#9733; Maniac HQ</em>'}</div>
      <button class="btn sm primary sm-wave">${p.host ? 'Say hi 👋' : 'Wave 👋'}</button>`;
    sheet.classList.add('on');
    sheet.querySelector('.sm-x').onclick = () => sheet.classList.remove('on');
    sheet.querySelector('.sm-wave').onclick = e => { e.target.textContent = 'Sent 💖'; e.target.disabled = true; const w = markers.get(p.id)?.getElement()?.firstChild; if (w) { w.classList.remove('wave'); void w.offsetWidth; w.classList.add('wave'); } };
    map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 7), { duration: .9 });
  }
  map.on('click', () => sheet.classList.remove('on'));

  tray.innerHTML = all.map(p => `<button class="sm-chip" data-id="${esc(p.id)}"><span>${p.host ? armaniHead() : chibi(p.handle, p.look)}</span>${esc(p.host ? 'Armani' : p.handle)}</button>`).join('');
  tray.onclick = e => { const b = e.target.closest('.sm-chip'); if (b) open(all.find(p => p.id === b.dataset.id)); };
  q.oninput = () => { const v = q.value.trim().toLowerCase(); [...tray.children].forEach(c => c.hidden = v && !c.textContent.toLowerCase().includes(v)); };
  q.onkeydown = e => { if (e.key === 'Enter') { const f = all.find(p => p.handle.toLowerCase().includes(q.value.trim().toLowerCase())); if (f) open(f); } };

  const fit = () => map.fitBounds(L.latLngBounds(all.map(p => [p.lat, p.lng])), { padding: [70, 70], maxZoom: 5 });
  fit();
  root.querySelector('.sm-home').onclick = () => { sheet.classList.remove('on'); fit(); };
  root.querySelector('.sm-count').textContent = `${pins.length + 1} on the map`;
  map.once('click', () => { });
  el.addEventListener('focusin', () => map.scrollWheelZoom.enable()); el.addEventListener('focusout', () => map.scrollWheelZoom.disable());
  setTimeout(() => map.invalidateSize(), 200);
  return { map, markers, open };
}
