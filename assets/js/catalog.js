// Starter merch catalog: three lines. Concept designs with placeholder prices.
// Materials and final specs get confirmed with the manufacturer; swap in real photos from the portal.
export const LINES = { patent: 'Patent Leather', leather: 'Leather', plaid: 'Plaid' };
const A = 'Accessories', O = 'Outerwear', T = 'Tops', B = 'Bottoms', H = 'Headwear';
// [line, type, name, for, category, price, blurb, print]
const rows = [
  // PATENT LEATHER: mirror-gloss black, hot pink, chrome
  ['patent', 'jacketCrop', 'Patent Cropped Moto Jacket', 'girls', O, 345, 'Mirror-shine patent finish, cropped biker cut, asymmetric zip, chrome studs.'],
  ['patent', 'jacket', 'Patent Moto Jacket', 'guys', O, 395, 'Full-length patent biker with studded lapels. Back print: MANIAC.'],
  ['patent', 'crop', 'Patent Tiny Tee', 'girls', T, 42, 'Baby-fit crop tee with a glossy patent-look print.', 'MANIAC'],
  ['patent', 'vtee', 'Patent V-Neck Rock Tee', 'guys', T, 48, 'Deep V, boxy rock fit, pink lightning bolt.', 'MANIAC'],
  ['patent', 'crophood', 'Patent Crop Hoodie', 'girls', T, 96, 'Cropped heavyweight hoodie with patent trim and chrome aglets.', 'MANIAC'],
  ['patent', 'hoodie', 'Patent Maniac Hoodie', 'unisex', T, 105, 'Oversized hoodie, MANIAC U. back print.', 'MANIAC'],
  ['patent', 'beanie', 'Patent Maniac Beanie', 'guys', H, 34, 'Rib-knit with a glossy pink MANIAC patch.', 'MANIAC'],
  ['patent', 'skirt', 'Patent Pleated Mini Skirt', 'girls', B, 78, 'Micro pleats, wet-look finish, zip back.'],
  ['patent', 'choker', 'Patent Ring Choker', 'girls', A, 28, 'Spiked patent choker with chrome O-ring.'],
  ['patent', 'bag', 'Patent Mini Shoulder Bag', 'unisex', A, 64, 'Studded chain strap, MANIAC plate.', 'MANIAC'],
  ['patent', 'gloves', 'Patent Fingerless Gloves', 'unisex', A, 36, 'Rave-ready fingerless gloves with studs.', 'MANIAC'],
  // LEATHER: matte black, oxblood, silver hardware
  ['leather', 'jacketCrop', 'Leather Cropped Biker Jacket', 'girls', O, 420, 'Cropped matte biker, silver hardware, oxblood accents.'],
  ['leather', 'jacket', 'Leather Moto Jacket', 'guys', O, 465, 'The statement piece. Heavy matte leather look, snap collar, belted hem.'],
  ['leather', 'crop', 'Leather Tiny Tee', 'girls', T, 44, 'Soft black baby tee, oxblood print.', 'MANIAC'],
  ['leather', 'vtee', 'Leather V-Neck Rock Tee', 'guys', T, 48, 'Washed black V-neck with oxblood bolt.', 'MANIAC'],
  ['leather', 'crophood', 'Leather Crop Hoodie', 'girls', T, 98, 'Cropped hoodie with studded pocket line.', 'MANIAC'],
  ['leather', 'hoodie', 'Maniac U. Hoodie', 'unisex', T, 105, 'Campus-meets-dystopia heavyweight hoodie.', 'MANIAC'],
  ['leather', 'beanie', 'Leather Patch Beanie', 'guys', H, 34, 'Black rib knit, oxblood leather-look patch.', 'MANIAC'],
  ['leather', 'skirt', 'Leather Mini Skirt', 'girls', B, 82, 'High-waist mini, matte finish, front stud.'],
  ['leather', 'belt', 'Chain Belt', 'unisex', A, 46, 'Draped silver chain with MANIAC buckle.'],
  ['leather', 'gloves', 'Studded Leather Gloves', 'unisex', A, 52, 'Fingerless, studded knuckle, ribbed cuff.', 'MANIAC'],
  // PLAID: goth schoolgirl x varsity. Pink/teal tartan on black
  ['plaid', 'jacketCrop', 'Plaid Panel Moto Jacket', 'girls', O, 380, 'Tartan body, black leather-look lapels and belt, silver studs.'],
  ['plaid', 'jacket', 'Plaid Panel Biker Jacket', 'guys', O, 410, 'Tartan panels with black collar and hem. Back print: MANIAC.'],
  ['plaid', 'crop', 'Plaid Tiny Tee', 'girls', T, 40, 'Cropped baby tee with a tartan chest stripe.', 'MANIAC'],
  ['plaid', 'vtee', 'Plaid V-Neck Rock Tee', 'guys', T, 46, 'Tartan V-neck with a teal bolt.', 'MANIAC'],
  ['plaid', 'crophood', 'Plaid Crop Hoodie', 'girls', T, 92, 'Cropped hoodie in tartan, black ribbing.', 'MANIAC'],
  ['plaid', 'hoodie', 'Plaid Maniac Hoodie', 'unisex', T, 100, 'Tartan hoodie, MANIAC U. back print.', 'MANIAC'],
  ['plaid', 'beanie', 'Plaid Maniac Beanie', 'guys', H, 32, 'Tartan beanie with a teal patch.', 'MANIAC'],
  ['plaid', 'skirt', 'Plaid Pleated Mini Skirt', 'girls', B, 70, 'The schoolgirl staple, goth edition. Zip side, chain loop.'],
  ['plaid', 'pinafore', 'Plaid Pinafore', 'girls', B, 88, 'Tiny tartan pinafore with studded straps.'],
  ['plaid', 'socks', 'Plaid Knee Socks', 'girls', A, 22, 'Over-the-knee ribbed socks, MANIAC up the leg.', 'MANIAC'],
  ['plaid', 'choker', 'Plaid Tie Choker', 'girls', A, 24, 'Tartan choker with ring and studs.'],
];
export const CATALOG = Object.fromEntries(rows.map(([line, type, name, who, cat, price, blurb, text], i) => [
  `${line}-${type}-${i}`,
  { name, line, type, for: who, cat, price: '$' + price, blurb, text: text || 'MANIAC', design: { type, line, text: text || 'MANIAC' }, sample: true, order: i, link: '' },
]));
