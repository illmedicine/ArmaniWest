// Merch catalog built from the Armani West lookbook photos in assets/img/merch/.
// Concept pieces with placeholder prices; final materials and prices are confirmed at launch.
// `front` / `back` are file names in assets/img/merch. Pieces with one photo only show that view.
export const LINES = { patent: 'Patent Leather', leather: 'Leather', plaid: 'Plaid' };
const A = 'Accessories', O = 'Outerwear', T = 'Tops', B = 'Bottoms', H = 'Headwear', S = 'Shoes';
// [line, slug, name, for, category, price, blurb, front, back]
const rows = [
  // PATENT LEATHER LINE
  ['patent', 'hooded-leatherman', 'Patent Hooded Leatherman Jacket', 'unisex', O, 395, 'Black patent body, hot-pink sleeves, fuzzy white hood lining and ARMANI WEST varsity lettering across the back.', null, 'patent-jacket-back'],
  ['patent', 'crop-hoodie', 'Cropped Patent Leather Hoodie', 'girls', T, 98, 'Pastel pink patent with black sleeves, a big W, MANIAC down both arms and a fuzzy cat-ear hood.', 'patent-hoodie-front'],
  ['patent', 'pleated-skirt', 'Patent Pleated Micro-Mini Skirt', 'girls', B, 78, 'Hot-pink patent pleats with a grommet belt, heart-charm chains and star safety pins.', 'patent-skirt-front'],
  ['patent', 'pom-beanie', 'Patent Pom-Pom Beanie', 'unisex', H, 34, 'Soft pink rib knit with fluffy pom-poms and a metal MANIAC plate.', 'patent-beanie-front'],
  ['patent', 'heart-bag', 'Patent Heart Bag', 'unisex', A, 88, 'Glossy pink heart-shaped bag with chain details and a long grommet strap, ARMANI WEST embossed.', 'patent-bag-front'],
  ['patent', 'paneled-vneck', 'Patent Paneled V-Neck', 'unisex', T, 62, 'Snug long-sleeve V-neck in black and hot-pink patent panels with star stitching.', 'patent-vneck-front'],
  ['patent', 'platform-boots', 'Pink & Black Platform Boots', 'girls', S, 145, 'High-gloss patent platforms with silver buckles, heart eyelets and a side zip.', 'patent-boots-front'],
  // THE LEATHER LINE
  ['leather', 'fitted-leatherman', 'Fitted Leatherman Jacket', 'unisex', O, 465, 'Pink and black patchwork leather, MANIACS across the back, number 20 on the hem.', null, 'leather-varsity-back'],
  ['leather', 'moto-leatherman', 'Distressed Leather Moto Leatherman', 'girls', O, 420, 'Pink and black distressed biker with heart patches, star-studded lapels and silver hardware.', 'leather-moto-front'],
  ['leather', 'tiny-tee', 'Tiny Distressed Graphic Tee', 'girls', T, 44, 'Ultra-cropped black baby tee with pink sleeves, a frayed hem and a glittering MANIAC graphic.', 'leather-tee-front'],
  ['leather', 'choker', 'Studded Leather Choker', 'girls', A, 28, 'Pink studded choker with star hardware, an ARMANI WEST ring and a draped chain.', 'leather-choker-front'],
  ['leather', 'harness', 'Heart & Star Chain Harness', 'girls', A, 46, 'Black and pink studded harness with hearts, stars and layered silver chains.', 'leather-harness-front'],
  ['leather', 'lace-vneck', 'Lace-Up Deep V-Neck Rock Shirt', 'unisex', T, 58, 'Distressed dark leather-look V-neck with pink eyelets and cord lacing.', 'leather-vneck-front'],
  ['leather', 'utility-backpack', 'Compact Utility Backpack & Crossbody', 'unisex', A, 125, 'Sleek pink and black leather set with metal buckles, star studs and a crest patch.', 'leather-backpack-front'],
  ['leather', 'cat-ear-beanie', 'Distressed Leather Beanie', 'unisex', H, 34, 'Snug black and pink distressed knit with cat ears, star pins and a silver AW plate.', 'leather-beanie-front'],
  // THE PLAID LINE
  ['plaid', 'leatherman', 'Fitted Plaid Leatherman Jacket', 'unisex', O, 410, 'Pink and black plaid with black leather sleeves, ARMANI WEST on the chest and a big M and MANIACS on the back.', 'plaid-jacket-front', 'plaid-jacket-back'],
  ['plaid', 'pleated-skirt', 'Pleated Plaid Micro-Mini Skirt', 'girls', B, 70, 'The schoolgirl staple, goth edition: grommet belt, star chains and safety pins.', 'plaid-skirt-front'],
  ['plaid', 'crop-hoodie', 'Plaid Cropped Hoodie', 'girls', T, 92, 'Cat-ear hood with sherpa lining, MANIACS on the chest and ARMANI WEST across the back.', 'plaid-hoodie-front', 'plaid-hoodie-back'],
  ['plaid', 'tiny-tee', 'Girls\' Plaid Tiny Shirt', 'girls', T, 40, 'Distressed pink and black plaid baby tee with glitter ARMANI WEST lettering and stars.', 'plaid-tee-front'],
  ['plaid', 'paneled-vneck', 'Plaid Paneled V-Neck', 'unisex', T, 62, 'Plaid and waffle-knit color-block long sleeve with eyelet V-neck and a W patch.', 'plaid-vneck-front'],
  ['plaid', 'beanie', 'Plaid Cat-Ear Beanie', 'unisex', H, 32, 'Pink, black and white tartan knit with furry cat ears, safety pins and gothic ARMANI WEST.', 'plaid-beanie-front'],
  ['plaid', 'cargo-backpack', 'Plaid & Leather Rave Cargo Backpack', 'unisex', A, 120, 'Pink and black leather with metal buckles, cargo pockets and an AW crest badge.', 'plaid-backpack-front'],
];
const P = 'assets/img/merch/';
export const CATALOG = Object.fromEntries(rows.map(([line, slug, name, who, cat, price, blurb, front, back], i) => [
  `${line}-${slug}`,
  { name, line, for: who, cat, price: '$' + price, blurb, image: front ? P + front + '.jpg' : '', imageBack: back ? P + back + '.jpg' : '', view: front && back ? 'both' : back ? 'back' : 'front', sample: true, order: i, link: '' },
]));
