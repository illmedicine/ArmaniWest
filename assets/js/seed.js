// Initial site content.
import { CATALOG } from './catalog.js';
const day = 86400000, now = Date.now();
const iso = n => new Date(now + n * day).toISOString().slice(0, 10);

export const seed = {
  events: {},
  merch: CATALOG,
  posts: {},
  media: {
    y1: { type: 'youtube', yt: '9elxuls1x4w', caption: 'basketball (Official Music Video)', ts: now },
    y2: { type: 'youtube', yt: 'kmSpdNGs5Q0', caption: 'Maneater (Official Music Video)', ts: now - 1 },
    y3: { type: 'youtube', yt: 'Md5yMtL9ODY', caption: 'A.i (Official Music Video)', ts: now - 2 },
    y4: { type: 'youtube', yt: '_ddPVjubw94', caption: 'Piano Tiles (Official Music Video)', ts: now - 3 },
    y5: { type: 'youtube', yt: '91ZzIZUWUS0', caption: 'Piano Tiles 2 (Official Lyric Video)', ts: now - 4 },
    y6: { type: 'youtube', yt: 'dG2KWeLI6Kc', caption: 'Piano Tiles (Official Lyric Video)', ts: now - 5 },
    y7: { type: 'youtube', yt: '8uCBIONd590', caption: 'basketball (Lyric Video, Anime Edition)', ts: now - 6 },
    v0: { type: 'clip', mp4: 'assets/video/queen-of-rap.mp4', poster: 'assets/video/queen-of-rap.jpg', caption: 'The queen of rap', ts: now - 7 },
    v02: { type: 'clip', mp4: 'assets/video/clip-02.mp4', poster: 'assets/video/clip-02.jpg', caption: 'Clip 01', ts: now - 8 },
    v07: { type: 'clip', mp4: 'assets/video/clip-07.mp4', poster: 'assets/video/clip-07.jpg', caption: 'Clip 02', ts: now - 9 },
    v08: { type: 'clip', mp4: 'assets/video/clip-08.mp4', poster: 'assets/video/clip-08.jpg', caption: 'Clip 03', ts: now - 10 },
    v09: { type: 'clip', mp4: 'assets/video/clip-09.mp4', poster: 'assets/video/clip-09.jpg', caption: 'Clip 04', ts: now - 11 },
    v11: { type: 'clip', mp4: 'assets/video/clip-11.mp4', poster: 'assets/video/clip-11.jpg', caption: 'Clip 05', ts: now - 12 },
    v16: { type: 'clip', mp4: 'assets/video/clip-16.mp4', poster: 'assets/video/clip-16.jpg', caption: 'Clip 06', ts: now - 13 },
    v19: { type: 'clip', mp4: 'assets/video/clip-19.mp4', poster: 'assets/video/clip-19.jpg', caption: 'Clip 07', ts: now - 14 },
    v20: { type: 'clip', mp4: 'assets/video/clip-20.mp4', poster: 'assets/video/clip-20.jpg', caption: 'Clip 08', ts: now - 15 },
    v22: { type: 'clip', mp4: 'assets/video/clip-22.mp4', poster: 'assets/video/clip-22.jpg', caption: 'Clip 09', ts: now - 16 },
    v23: { type: 'clip', mp4: 'assets/video/clip-23.mp4', poster: 'assets/video/clip-23.jpg', caption: 'Clip 10', ts: now - 17 },
    v24: { type: 'clip', mp4: 'assets/video/clip-24.mp4', poster: 'assets/video/clip-24.jpg', caption: 'Clip 11', ts: now - 18 },
    p1: { src: 'assets/img/snap/snap-a.jpg', caption: 'Locker room', ts: now - 5 * day },
    p2: { src: 'assets/img/snap/snap-b.jpg', caption: 'Courtside', ts: now - 4 * day },
    p7: { src: 'assets/img/snap/snap-c.jpg', caption: 'Snapchat', ts: now - 6 * day },
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

// Founding fans shown on the board and map in every mode.
export const FOUNDERS = [
  { handle: 'AMW-ILLYMEDS', city: 'South Carolina', lat: 33.9, lng: -80.95, points: 500, look: { bald: true, skin: '#8a5a3a' } },
];
