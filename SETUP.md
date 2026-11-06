# Going live: Firebase setup (about 15 minutes)

Until this is done the site runs in **DEMO mode**: everything works, but data is stored in each visitor's own browser, and "Sign in with Google" is a name prompt. Fine for showing her the design.

1. Go to https://console.firebase.google.com and create a project (free Spark plan is enough; no card needed).
2. **Build > Authentication > Get started > Google** provider > enable.
   **Settings > Authorized domains**: add `illmedicine.github.io` (and the real domain later).
3. **Build > Firestore Database > Create database** (production mode, any US region).
4. **Firestore > Rules**: paste `firestore.rules`, and replace `REPLACE_WITH_ARMANI_GOOGLE_EMAIL` with Armani's Google account email. Publish.
5. **Project settings > Your apps > Web app (</>)**: copy the config and paste the four values into `assets/js/config.js` (`apiKey`, `authDomain`, `projectId`, `appId`). Also list her email in `adminEmails`.
6. Push to `main`. Open `/admin.html`, sign in with her Google account, create her PIN.
7. In the portal: **Site > Members-only text line**: enter her number. **Site > About**: write the story.

## How the security works
- The **real lock** is `firestore.rules`: only the listed Google account can read visitor locations, requests, or write site content. The PIN is a second step on top (re-asked each session, 5 tries then 5-minute lockout); it does not replace Google sign-in.
- The text-line number lives in the database, readable only by signed-in members, not in the website code.
- Visitor tracking runs only after the visitor clicks "Sounds good". Stored: city/region/country and coarse lat/lng (1 decimal), never the IP.
- Points are awarded in the browser, so the rules cap each write to +50. Determined users could still inflate their own points. If rewards get real value (money, tickets), move awards to a Cloud Function.
- Photos are resized and stored inside Firestore (keeps it on the free plan). If the gallery grows large, move to Firebase Storage or Cloudflare R2.

## Not built (needs her decisions)
- Payments. Merch and Cameo link out to a checkout she chooses; the site never touches card data.
- Real Cameo booking: the Cameo page collects requests; add her Cameo URL in `config.js` once she has a profile.
- Real "who is live" detection: she flips the Go Live switch in the portal.
