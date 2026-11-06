// Starter merch catalog built from the Gemini lookbook (Patent Leather / The Leather Line / The Plaid Line).
// Concept designs with placeholder prices; final materials are confirmed with the manufacturer.
export const LINES = { patent: 'Patent Leather', leather: 'Leather', plaid: 'Plaid' };
const A = 'Accessories', O = 'Outerwear', T = 'Tops', B = 'Bottoms', H = 'Headwear', S = 'Shoes';
// [line, type, name, for, category, price, blurb, print]
const rows = [
  // PATENT LEATHER LINE: kawaii glossy goth, girly rave
  ['patent', 'varsity', 'Patent Hooded Leatherman Jacket', 'unisex', O, 395, 'Glossy black patent body, hot-pink sleeves, ARMANI WEST chest print, MANIAC back print.', 'ARMANI WEST'],
  ['patent', 'crophood', 'Cropped Patent Leather Hoodie', 'girls', T, 98, 'Pink hooded top with black patent sleeves and a big W.', 'W'],
  ['patent', 'skirt', 'Patent Pleated Micro Mini Skirt', 'girls', B, 78, 'Hot-pink patent pleats, black belt and draped chains.'],
  ['patent', 'beanie', 'Patent Leather Beanie', 'unisex', H, 34, 'Pink rib knit with a glossy ARMANI WEST tab.', 'ARMANI WEST'],
  ['patent', 'bag', 'Patent Leather Duffle Bag', 'unisex', A, 88, 'Glossy pink duffle with black trim and ARMANI WEST lettering.', 'ARMANI WEST'],
  ['patent', 'vneckLS', 'Patent Paneled V-Neck', 'guys', T, 62, 'Long-sleeve V-neck with glossy black and pink panels.', 'MANIAC'],
  ['patent', 'boots', 'Patent Buckle Boots', 'girls', S, 145, 'Pink patent platform boots with triple black buckle straps.', 'MANIAC'],
  ['patent', 'jacket', 'Patent Moto Jacket', 'guys', O, 395, 'Mirror-shine biker with studded lapels and a MANIAC back print.'],
  // THE LEATHER LINE: sassy cyber-dystopian, studded, feminine
  ['leather', 'varsity', 'Oversized Heavy Leatherman Jacket', 'unisex', O, 465, 'Pink and black leather panels, MANIACS chest print, number 20 sleeve.', 'MANIACS'],
  ['leather', 'jacketCrop', 'Distressed Leather Moto Jacket', 'girls', O, 420, 'Cropped pink-and-black biker, distressed finish, silver hardware.'],
  ['leather', 'crop', 'Tiny Distressed Graphic Tee', 'girls', T, 44, 'Black baby tee with pink sleeve trim and a MANIAC graphic.', 'MANIAC'],
  ['leather', 'choker', 'Studded Leather Choker', 'girls', A, 28, 'Pink studded choker with name plate and O-ring.'],
  ['leather', 'belt', 'Harness Chain Belt', 'unisex', A, 46, 'Draped silver chains with O-rings and a MANIAC buckle.'],
  ['leather', 'vneckLS', 'Lace-Up Deep V-Neck Rock Shirt', 'unisex', T, 58, 'Pink and black deep V with lace-up chest.', 'MANIAC'],
  ['leather', 'backpack', 'Heavy-Duty Leather Backpack', 'unisex', A, 125, 'Pink and black backpack with buckled front pocket.', 'MANIAC'],
  ['leather', 'beanie', 'Distressed Leather Beanie', 'unisex', H, 34, 'Black knit with a distressed leather AW patch.', 'AW'],
  ['leather', 'jacket', 'Leather Moto Jacket', 'guys', O, 465, 'Heavy matte biker, snap collar, belted hem.'],
  ['leather', 'vtee', 'Leather V-Neck Rock Tee', 'guys', T, 48, 'Washed black V-neck with oxblood bolt.', 'MANIAC'],
  // THE PLAID LINE: high-polished goth schoolgirl and college plaid
  ['plaid', 'varsity', 'Oversized Plaid Leatherman Jacket', 'unisex', O, 410, 'Pink and black plaid body, black leather sleeves, varsity M patch.', 'MANIAC'],
  ['plaid', 'skirt', 'Pleated Plaid Micro-Mini Skirt', 'girls', B, 70, 'The schoolgirl staple, goth edition.'],
  ['plaid', 'crophood', 'Plaid Cropped Hoodie', 'girls', T, 92, 'Cropped pink plaid hoodie with MANIACS across the chest.', 'MANIACS'],
  ['plaid', 'crop', 'Plaid Tiny Tee (Baby Tee)', 'girls', T, 40, 'Black and pink plaid baby tee, ARMANI WEST in white.', 'ARMANI WEST'],
  ['plaid', 'vneckLS', 'Guys\' Plaid Paneled V-Neck', 'guys', T, 62, 'Plaid and black color-block long-sleeve V-neck.', 'MANIAC'],
  ['plaid', 'beanie', 'Plaid Beanie', 'unisex', H, 32, 'Pink plaid knit with an ARMANI WEST tab.', 'ARMANI WEST'],
  ['plaid', 'backpack', 'Plaid & Leather Rave Cargo Backpack', 'unisex', A, 120, 'Plaid body, black leather trim, cargo pockets.', 'MANIAC'],
  ['plaid', 'hoodie', 'Plaid Maniac Hoodie', 'unisex', T, 100, 'Tartan hoodie, MANIAC U. back print.', 'MANIAC'],
  ['plaid', 'vtee', 'Plaid V-Neck Rock Tee', 'guys', T, 46, 'Tartan V-neck with a teal bolt.', 'MANIAC'],
  ['plaid', 'pinafore', 'Plaid Pinafore', 'girls', B, 88, 'Tiny tartan pinafore with studded straps.'],
  ['plaid', 'socks', 'Plaid Knee Socks', 'girls', A, 22, 'Over-the-knee ribbed socks, MANIAC up the leg.', 'MANIAC'],
  ['plaid', 'jacketCrop', 'Plaid Panel Moto Jacket', 'girls', O, 380, 'Tartan body with black leather-look lapels and belt.'],
];
export const CATALOG = Object.fromEntries(rows.map(([line, type, name, who, cat, price, blurb, text], i) => [
  `${line}-${type}-${i}`,
  { name, line, type, for: who, cat, price: '$' + price, blurb, text: text || 'MANIAC', design: { type, line, text: text || 'MANIAC' }, sample: true, order: i, link: '' },
]));
