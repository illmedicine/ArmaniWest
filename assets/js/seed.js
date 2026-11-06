// Demo-mode starter content. Anything flagged sample:true is placeholder and shows a SAMPLE badge.
const day = 86400000, now = Date.now();
const iso = n => new Date(now + n * day).toISOString().slice(0, 10);

export const seed = {
  events: {
    e1: { title: 'Release Party: "basketball"', date: iso(9), time: '8:00 PM', venue: 'Venue TBA', city: 'Los Angeles, CA', link: '', sample: true },
    e2: { title: 'Maniacs Meet & Greet', date: iso(21), time: '6:00 PM', venue: 'Venue TBA', city: 'Los Angeles, CA', link: '', sample: true },
    e3: { title: 'Live on Twitch: Q&A', date: iso(14), time: '7:00 PM', venue: 'Online', city: 'twitch.tv/armaniwestttt', link: 'https://twitch.tv/armaniwestttt', sample: true },
  },
  merch: {
    m1: { name: 'Maniacs Tee', price: '$30', emoji: '👕', blurb: 'Teal on black. Limited drop.', link: '', sample: true },
    m2: { name: 'Locker Room Hoodie', price: '$65', emoji: '🧥', blurb: 'Orange locker print.', link: '', sample: true },
    m3: { name: 'Fur Ears Headband', price: '$22', emoji: '🐾', blurb: 'The signature look.', link: '', sample: true },
    m4: { name: '"basketball" Poster', price: '$18', emoji: '🏀', blurb: '18x24, signed on request.', link: '', sample: true },
  },
  posts: {
    welcome: {
      title: 'Welcome to the official site', slug: 'welcome', published: true, ts: now - day,
      excerpt: 'New home, new era. Here is what is coming.',
      body: 'This is the new official home for everything Armani West.\n\n## What is here\n\nMusic, merch, events, Cameo-style requests, the fan map, and the **Fanboys** leaderboard for members.\n\n## What is next\n\nNew music, behind-the-scenes, and drops for members first.\n\n*(Sample post. Replace it from the portal.)*',
    },
  },
  media: {
    p1: { src: 'assets/img/snap/snap-a.jpg', caption: 'Locker room', ts: now - 5 * day },
    p2: { src: 'assets/img/snap/snap-b.jpg', caption: 'Courtside', ts: now - 4 * day },
    p3: { src: 'assets/img/avatar.png', caption: 'On the turf', ts: now - 3 * day },
    p4: { src: 'assets/img/block-1.webp', caption: 'Portrait', ts: now - 2 * day },
    p5: { src: 'assets/img/ig-17877336342473842.jpg', caption: 'Instagram', ts: now - 1 * day },
    p6: { src: 'assets/img/ig-18550270915049898.jpg', caption: 'Instagram', ts: now },
  },
  site: {
    about: {
      pull: 'Teal hair. Fur ears. A basketball under one arm.',
      upbringing: '', modeling: '', acting: '', music: '',
    },
    live: { on: false, title: '', url: '' },
  },
  private: { contact: { phone: '(set in the admin portal)' } },
  board: {
    s1: { handle: 'Maniac #001', points: 1840, sample: true }, s2: { handle: 'Westie Kay', points: 1220, sample: true },
    s3: { handle: 'LA Court Kid', points: 760, sample: true }, s4: { handle: 'Basketball Baby', points: 410, sample: true },
    s5: { handle: 'Teal Hair Gang', points: 180, sample: true },
  },
  pins: {
    s1: { handle: 'Maniac #001', city: 'Los Angeles', lat: 34.1, lng: -118.2, sample: true },
    s2: { handle: 'Westie Kay', city: 'Atlanta', lat: 33.7, lng: -84.4, sample: true },
    s3: { handle: 'LA Court Kid', city: 'Chicago', lat: 41.9, lng: -87.6, sample: true },
    s4: { handle: 'Basketball Baby', city: 'London', lat: 51.5, lng: -0.1, sample: true },
  },
  visitors: {}, requests: {}, members: {}, presence: {}, adminpin: {},
};

export const TIERS = [
  { min: 0, name: 'Rookie', icon: '🏀', reward: 'Access to the members text line' },
  { min: 100, name: 'Starter', icon: '⭐', reward: 'Name on the Fanboys board + map pin' },
  { min: 400, name: 'All-Star', icon: '🌟', reward: 'Early access to drops and tickets' },
  { min: 1000, name: 'MVP', icon: '👑', reward: 'Merch discount code' },
  { min: 2500, name: 'Hall of Fame', icon: '🏆', reward: 'Shout-out on stream + signed merch' },
];
