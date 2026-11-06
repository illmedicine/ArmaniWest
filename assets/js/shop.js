// Collection page: hero banner, filters and product grid for one line (body[data-line]).
import { boot, store, esc, cfg, $, $$ } from './core.js';
import { mountViewer } from './garments.js';
import { LN, lineNav, heroHTML, sliders, lightbox } from './merchlib.js';

const k = document.body.dataset.line, L = LN[k];
await boot('merch');
$('#linenav').innerHTML = `<a href="merch.html" class="back">&#8592; All collections</a>` + lineNav(k);
$('#hero').innerHTML = heroHTML(k, { compact: true, h1: true });
sliders();
const items = (await store.list('merch')).filter(m => m.line === k).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
const F = { who: 'all', cat: 'all' };
const chip = (key, vals) => `<div class="chipset">${vals.map(([v, t]) => `<button class="chip ${F[key] === v ? 'on' : ''}" data-k="${key}" data-v="${v}">${t}</button>`).join('')}</div>`;
const cats = [['all', 'Everything'], ['Outerwear', 'Jackets'], ['Tops', 'Tops & hoodies'], ['Headwear', 'Beanies'], ['Bottoms', 'Skirts'], ['Shoes', 'Boots'], ['Accessories', 'Accessories']].filter(([v]) => v === 'all' || items.some(m => m.cat === v));
function draw() {
  $('#chips').innerHTML = chip('who', [['all', 'Everyone'], ['girls', 'Girls'], ['guys', 'Guys']]) + chip('cat', cats);
  const list = items.filter(m => (F.who === 'all' || m.for === F.who || m.for === 'unisex') && (F.cat === 'all' || m.cat === F.cat));
  $('#grid').innerHTML = list.map(m => `<div class="card prod" data-id="${esc(m.id)}"><div class="pic3d"></div><button class="zoom" aria-label="View larger" title="View larger"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M10.5 8v5M8 10.5h5"/></svg></button><p class="eyebrow" style="margin:6px 0 0">${m.for === 'unisex' ? 'Unisex' : m.for === 'girls' ? 'Girls' : m.for === 'guys' ? 'Guys' : ''}</p><h3>${esc(m.name)}</h3><p class="meta">${esc(m.blurb || '')}</p><div class="buyrow"><span class="price">${esc(m.price)}</span>${(m.link || cfg.shopUrl) ? `<a class="btn sm primary" href="${esc(m.link || cfg.shopUrl)}" target="_blank" rel="noopener">Buy</a>` : ''}</div></div>`).join('') || '<p class="note">Nothing in this filter.</p>';
  $$('.prod').forEach(c => { const m = items.find(x => x.id === c.dataset.id); mountViewer($('.pic3d', c), m); $('.pic3d', c).addEventListener('viewer:open', () => lightbox(m)); $('.zoom', c).onclick = () => lightbox(m); });
}
$('#chips').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; F[b.dataset.k] = b.dataset.v; draw(); };
draw();
document.title = `${L.name} | Merch | Armani West`;
