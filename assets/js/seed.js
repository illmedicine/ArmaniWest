// Initial site content.
import { CATALOG } from './catalog.js';
const day = 86400000, now = Date.now();
const iso = n => new Date(now + n * day).toISOString().slice(0, 10);

export const seed = {
  events: {},
  merch: CATALOG,
  posts: {},
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
  private: {},
  board: {}, pins: {},
  visitors: {}, requests: {}, members: {}, presence: {}, adminpin: {},
};

export const TIERS = [
  { min: 0, name: 'Rookie', icon: '🏀', reward: 'Access to the members text line' },
  { min: 100, name: 'Starter', icon: '⭐', reward: 'Name on the Fanboys board + map pin' },
  { min: 400, name: 'All-Star', icon: '🌟', reward: 'Early access to drops and tickets' },
  { min: 1000, name: 'MVP', icon: '👑', reward: 'Merch discount code' },
  { min: 2500, name: 'Hall of Fame', icon: '🏆', reward: 'Shout-out on stream + signed merch' },
];
