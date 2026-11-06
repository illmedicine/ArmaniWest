# Armani West: media & linkage manifest

Source of truth today: https://armaniwest.com (a Beacons link-in-bio page, captured 2026-11-06; raw HTML in `research/armaniwest-com.html`).

## Verified links (found on her own current site)
| Platform | Handle / URL |
|---|---|
| Instagram | https://instagram.com/armaniwesttt |
| Snapchat | https://snapchat.com/add/armaniwesttt |
| TikTok | https://tiktok.com/@armaniwestt |
| Twitch | https://twitch.tv/armaniwestttt |
| X / Twitter | https://twitter.com/armaniwestt |
| YouTube | https://youtube.com/@armaniwestt |
| Spotify artist | https://open.spotify.com/artist/7xLpLOGgLLFUaHpZhu94z6 |
| Apple Music artist | https://music.apple.com/us/artist/armani-west/1716309167 |
| "basketball" smart link | https://broke.ffm.to/armani-west-basketball |
| "basketball" lyric video | https://youtu.be/8uCBIONd590 |
| Fan list (Laylo) | https://laylo.com/armaniwest |
| Discord ("The Maniacs") | https://discord.gg/thQ9cpsvNZ , https://discord.gg/nBbdKz4vJ |
| Beacons (current) | https://beacons.ai/armaniwest (pages: /home, /themaniacs) |

Current-site content: "BASKETBALL: THE MOVIE" music video, "basketball" single ("song of the summer"), anime lyric video, "A.i" official music video, Discord VIP ("MANIACS ONLY"), text-me signup, "armani westie" fan CTA.

Text/SMS number published on the current site: (424) 610-8554 (now shown in The Maniacs section as a "Text me" button).

## Third-party / unverified (confirm with her before using)
- famousbirthdays.com lists a profile for her as rapper/musician; its claims (alias, "Piano TILES" streams, school history, birthdate) are NOT corroborated by her own channels. Do not publish.
- Web search for "armaniwesttt" Snapchat and general Google mentions: no independent profile pages or press surfaced; results were dominated by Armani (fashion) and Armani White (a different artist). Do not conflate.
- Snapchat, TikTok and Instagram are login-walled, so content could not be scraped; links only.

## Downloaded media (`assets/img/`, all from her Beacons CDN)
| File | Size | Use |
|---|---|---|
| avatar.png | 800x800 | hero portrait, basketballs on turf |
| block-1.webp | 600x600 | portrait (teal hair, glasses) |
| block-2.webp | 600x600 | link-card image |
| generated.png | 768x1344 | vertical art |
| link-1.jpg | 760x398 | video link thumbnail |
| header.webp | 886x442 | header graphic |
| logo.png | 1400x96 | wordmark strip |
| bg-desktop.png | 1280x720 | blurred crowd background |
| ig-*.jpg (3) | various | recent Instagram thumbnails |

Rights: images are hers via her own page; get originals/higher-res from her before launch.

## Snapchat pull (public profile https://www.snapchat.com/@armaniwesttt, 2026-11-06)
Profile blurb: "armani", 10.6k subscribers, "armaniwest.com | los angeles". Public content: 2 curated Highlights ("the queen of rap" + one untitled, 3 snaps) and about 13 Spotlight videos (7-57s, 540x960).
- `research/snap/next_data.json`: full structured page data (all media URLs, highlight IDs).
- `research/snap/spot*.jpg`, `highlight*-thumb.jpg`: poster stills.
- `research/snap/frames/`: 28 frames extracted with ffmpeg (all carry the Snapchat watermark/handle overlay).
- Videos (about 30 MB) are kept locally only (gitignored); re-download via the URLs in next_data.json.
- Used on site (`assets/img/snap/`): `snap-a.jpg`, `snap-b.jpg`, clean full-res locker-room photoshoot stills (no watermark).
- Deliberately NOT used: watermarked frames, personal clips (salon, lip filler), and the profile "hero" image, which is third-party anime fan art, not hers.
- Snapchat media URLs are signed/expiring; ask her for originals before launch.
