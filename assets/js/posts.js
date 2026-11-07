// Blog posts drawn from Armani's own TikTok and Instagram posts. Captions in quotes are hers, word for word.
const at = d => Date.parse(d + 'T19:00:00Z');
const IG = 'https://www.instagram.com/armaniwesttt/p/';
const TT = 'https://www.tiktok.com/@armaniwestt';

const P = [
  {
    id: 'five-nights-at-hogwarts', date: '2026-11-01', title: 'Five nights at Hogwarts',
    tags: ['Halloween', 'TikTok', 'Instagram'], cover: 'assets/img/blog/tt-7703051963767868685.jpg',
    excerpt: 'Night four of Halloween: robes, a yellow-and-black tie and a wand. Armani Potter has entered the chat.',
    body: `Armani closed out Halloween weekend at Hogwarts. On Instagram she posted the look with *"five nights at hogwarts 🪄🧸"*, a wink at the Freddy costume from the night before.

On TikTok she went all in: *"armani potter 🧙🏾"*, and then *"you be harry potter & i’ll be hermione <3"*.

[[tiktok:7703051963767868685|armani potter 🧙🏾]]
[[tiktok:7703177087628086542|you be harry potter & i’ll be hermione <3]]

[[img:assets/img/press/ig-01.jpg|five nights at hogwarts 🪄🧸]]

[See the post on Instagram](${IG}DfNYECRmfli/)`,
  },
  {
    id: 'freddy-montana', date: '2026-10-31', title: 'Freddy Montana',
    tags: ['Halloween', 'TikTok'], cover: 'assets/img/blog/tt-7702673899212885262.jpg',
    excerpt: 'Halloween night: bear ears, a bow tie and a big blue mic. Five Nights at Freddy’s, Mani style.',
    body: `For Halloween night itself, Armani showed up as Freddy Fazbear: bear ears, bow tie, painted whiskers and the oversized mic.

Her caption: *"i’m just freddy montana 🧸"*. She followed it with a second clip set to "Join Us for a Bite".

[[tiktok:7702673899212885262|i’m just freddy montana 🧸]]
[[tiktok:7702699371346889997|🧸🩵]]`,
  },
  {
    id: 'monster-montana', date: '2026-10-30', title: 'Monster Montana',
    tags: ['Halloween', 'TikTok', 'Instagram'], cover: 'assets/img/blog/tt-7702306396439743758.jpg',
    excerpt: 'Monster High welcomes a new ghoul: Armani as a werewolf, leopard print and all.',
    body: `Night two of Halloween went full Monster High, werewolf style.

> MONSTER HIGH WELCOMES MANI MONTANA AS A MEW GHOUL 🩵💜

Then the night look: *"CLAWMONTANA 💋🐺"*. Over on Instagram it was *"monster montana 🐺🩵"*.

[[tiktok:7702286671747779853|MONSTER HIGH WELCOMES MANI MONTANA AS A MEW GHOUL]]
[[tiktok:7702306396439743758|CLAWMONTANA 💋🐺]]

[[img:assets/img/press/ig-02.jpg|monster montana 🐺🩵]]

[See the post on Instagram](${IG}DfIfFeJEk7S/)`,
  },
  {
    id: 'jinkies', date: '2026-10-29', title: 'Jinkies!',
    tags: ['Halloween', 'TikTok'], cover: 'assets/img/blog/tt-7701934985955036430.jpg',
    excerpt: 'Halloween kicked off with a Scooby-Doo duo: Armani as Velma, her friend stei as Daphne.',
    body: `The Halloween run started with a duo costume. Armani went as Velma, orange top, red skirt and her own glasses, with her friend **stei** as Daphne in purple.

Her caption: *"JINKIES 💜X🧡 @stei"*, set to "Velmas glasses". stei posted their night out on Instagram too.

[[tiktok:7701905711231470861|JINKIES 💜X🧡]]
[[tiktok:7701934985955036430|with stei 👯‍♀️]]

[[img:assets/img/press/ig-03.jpg|Velma and Daphne · from stei’s Instagram]]`,
  },
  {
    id: 'trophy', date: '2026-10-05', title: 'Trophy',
    tags: ['Instagram'], cover: 'assets/img/press/ig-04.jpg',
    excerpt: 'One word on Instagram, one photo, downtown LA.',
    body: `Short and sweet on Instagram this time. Armani posted a downtown LA shot with a single word: *"trophy 🏆"*.

[[img:assets/img/press/ig-04.jpg|trophy 🏆]]

[See the post on Instagram](${IG}DeIFyWRkhfu/)`,
  },
  {
    id: 'swerve', date: '2026-09-16', title: 'swerve!',
    tags: ['TikTok'], cover: 'assets/img/blog/tt-7685943460578233613.jpg',
    excerpt: 'Cat ears, golden hour and three quick TikToks in two days.',
    body: `Mid-September brought a run of quick TikToks. First a duet with her friend JAIAA:

> CHIDDY CHIDDY BANG BANG @JAIAA🫧🩰 HE WANNA WHAT?

The next day, in cat ears under the string lights, came *"all natural montana"* and *"swerve!"*.

[[tiktok:7685943460578233613|swerve!]]
[[tiktok:7685939479428795661|all natural montana]]
[[tiktok:7685672709832953102|CHIDDY CHIDDY BANG BANG]]`,
  },
  {
    id: 'viva-las-vegas', date: '2026-09-09', title: 'Viva Las Vegas',
    tags: ['Instagram'], cover: 'assets/img/press/ig-05.jpg',
    excerpt: 'Five days after her birthday, Armani posted from the Las Vegas Strip.',
    body: `A few days after her birthday, Armani posted from Las Vegas, standing over the Bellagio fountains in a yellow-and-black striped dress.

Her caption: *"viva las vegas"*.

[[img:assets/img/press/ig-05.jpg|viva las vegas]]

[See the post on Instagram](${IG}DdFRkRykjvS/)`,
  },
  {
    id: 'do-my-makeup-montana', date: '2026-09-07', title: 'Do my makeup, Montana',
    tags: ['TikTok'], cover: 'assets/img/blog/tt-7682865665853623565.jpg',
    excerpt: 'A get-ready-with-me, and a promise: getting better every day.',
    body: `Armani took fans through her makeup routine in a "do my makeup montana with me" video.

Her caption: *"i’m getting better at my makeup everyday :)"*.

[[tiktok:7682865665853623565|i’m getting better at my makeup everyday :)]]`,
  },
  {
    id: 'birthday-montana', date: '2026-09-04', title: 'Birthday Montana',
    tags: ['Birthday', 'TikTok', 'Instagram'], cover: 'assets/img/blog/tt-7681500974040583437.jpg',
    excerpt: 'A tiara, a pink cake and a remix: Armani celebrated her birthday on September 4.',
    body: `Armani celebrated her birthday on September 4 with a shoot in a powder-blue dress, a tiara and a pink cake.

On TikTok: *"birthday montana 🎂🩵"*. On Instagram: *"princess montana"*.

She also dropped a birthday remix with Alii Music, now one of her most watched recent clips at over 140,000 plays:

> IM MARY POPPIN! @Alii Music ITS DA REMIX 🎹🩵🎂

[[tiktok:7681500974040583437|birthday montana 🎂🩵]]
[[tiktok:7681508478048898318|IM MARY POPPIN! ITS DA REMIX]]

[[img:assets/img/press/ig-06.jpg|princess montana]]

[See the post on Instagram](${IG}Dc3_eRCm5VT/)`,
  },
  {
    id: 'punk-not-ponk', date: '2026-08-21', title: 'punk not ponk',
    tags: ['Instagram', 'TikTok'], cover: 'assets/img/blog/tt-7676708205086526734.jpg',
    excerpt: 'Cat ears and a hardcore punk tee, on Instagram and TikTok.',
    body: `Armani switched it up with a U.S. Hardcore Punk tee and black cat ears.

On Instagram: *"punk not ponk"*. The next day she posted the TikTok with three emoji, *"☠️🎹🩵"*.

[[tiktok:7676708205086526734|☠️🎹🩵]]
[[img:assets/img/press/ig-07.jpg|punk not ponk]]

[See the post on Instagram](${IG}DcUwUVDGwRE/)`,
  },
  {
    id: 'basketball-video-out-now', date: '2026-08-10', title: 'The "basketball" video is out',
    tags: ['New music', 'Video', 'TikTok'], cover: 'assets/img/press/g-54.jpg',
    excerpt: 'The official music video for "basketball" is here. Watch it now.',
    body: `The official music video for "basketball" is out now. Armani announced it on TikTok:

> BASKETBALL MV / OUT NEOW 💀🎀

and, with a horror-movie twist: *"he be scary movie 6?? basketball mv out neow 🎀💀"*.

[[youtube:9elxuls1x4w|basketball (Official Music Video)]]

The night before, she thanked fans for the support: *"THANK YAAA"*.

[[tiktok:7672545687040544014|he be scary movie 6?? basketball mv out neow]]
[[tiktok:7671894293014973710|THANK YAAA]]`,
  },
  {
    id: 'loud-on-the-creek', date: '2026-08-08', title: 'Loud on the creek',
    tags: ['TikTok'], cover: 'assets/img/blog/tt-7670354167432596750.jpg',
    excerpt: 'Three clips, over 290,000 plays: the shh series.',
    body: `Early August brought a run of three clips, each with a finger to her lips. Together they passed 290,000 plays.

It started with *"i’m loud on the creek boo"*, then *"no music"* and *"shh ;)"*.

[[tiktok:7670354167432596750|i’m loud on the creek boo]]
[[tiktok:7670737180884569357|no music]]
[[tiktok:7671499759026228494|shh ;)]]`,
  },
  {
    id: 'my-new-crashout-song', date: '2026-07-14', title: 'My new crashout song',
    tags: ['New music', 'TikTok'], cover: 'assets/img/blog/tt-7662213444300557582.jpg',
    excerpt: 'A supervillain anthem and an impossible open verse challenge.',
    body: `Armani previewed a new song on TikTok: *"my new crashout song"*. The on-screen text says it all: "this song genuinely makes me feel like a supervillain."

A week earlier she opened up a "basketball" open verse challenge, level impossible:

> this is the hardest open verse i feel like ive done? bounce your pens like a basketball & lemme hear your bars 😘 maybe i’ll do a remix ? 🏀🩵🎀

[[tiktok:7662213444300557582|my new crashout song]]
[[tiktok:7659952802403290381|basketball open verse challenge]]`,
  },
  {
    id: 'best-day-ever', date: '2026-07-12', title: 'Best day ever at Universal',
    tags: ['Instagram', 'TikTok'], cover: 'assets/img/press/ig-08.jpg',
    excerpt: 'A day at Universal Studios, bouncing it like a basketball.',
    body: `Armani spent the day at Universal Studios Hollywood and posted from around the park.

On TikTok: *"we in universal bouncing it like a basketball 🏀💕"* and *"ROTTON 2 THE CORE 🩵🎀"*. On Instagram, by the globe: *"best day ever ♡"*.

[[tiktok:7661054796207574286|we in universal bouncing it like a basketball 🏀💕]]
[[tiktok:7661059887241121038|ROTTON 2 THE CORE 🩵🎀]]

[[img:assets/img/press/ig-08.jpg|best day ever ♡]]

[See the post on Instagram](${IG}DataqKuAb7g/)`,
  },
  {
    id: 'say-im-bad', date: '2026-06-30', title: 'say im bad',
    tags: ['Instagram'], cover: 'assets/img/press/ig-10.jpg',
    excerpt: 'Two June posts on Instagram, two captions.',
    body: `Two June posts on Instagram, two captions that say plenty.

June 20: *"say im bad"*.

June 30: *"literally my life is >"*.

[[img:assets/img/press/ig-10.jpg|say im bad]]
[[img:assets/img/press/ig-09.jpg|literally my life is >]]

[See "say im bad" on Instagram](${IG}DZ0xrVLEpbY/) · [See "literally my life is >" on Instagram](${IG}DaOpliuj4Rf/)`,
  },
  {
    id: 'happy-pride', date: '2026-06-17', title: 'Happy Pride',
    tags: ['Pride', 'TikTok'], cover: 'assets/img/press/g-22.jpg',
    excerpt: 'Pride Month, and a GAY BAR for the girls.',
    body: `For Pride Month, Armani added a little something for her fans:

> always gotta add a GAY BAR for my girlssss #happypridemonth 💋 send this to ur fav dl 😩😂

A few days later she showed off her e-girl gamer look: Minecraft nails and shirt.

[[tiktok:7652500515967765774|always gotta add a GAY BAR for my girlssss]]`,
  },
  {
    id: 'basketball-drops-at-midnight', date: '2026-06-12', title: '"basketball" drops at midnight',
    tags: ['New music', 'TikTok', 'Instagram'], cover: 'assets/img/blog/tt-7650312310665399566.jpg',
    excerpt: 'Release day for "basketball": the single is out everywhere.',
    body: `Release day. Armani’s single "basketball" came out on June 12, 2026, and she counted it down on TikTok:

> knicks in 5 & basketball drops @ midnight <33 🏀🎀🐱 oh yall ready??

On Instagram, the same day: *"ballin like i got six’"* (photo: @fromheavensview).

[[tiktok:7650312310665399566|knicks in 5 & basketball drops @ midnight]]
[[img:assets/img/press/ig-11.jpg|ballin like i got six’ · photo by @fromheavensview]]

[Listen to "basketball" on Spotify](https://open.spotify.com/search/armani%20west%20basketball) · [See the post on Instagram](${IG}DZgJ05NEv_r/) · [Follow Armani on TikTok](${TT})`,
  },
];

export const POSTS = Object.fromEntries(P.map(({ id, date, ...p }) => [id, { ...p, slug: id, ts: at(date), published: true }]));
