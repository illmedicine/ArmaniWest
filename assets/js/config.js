// Site configuration. Paste the Firebase web config here to connect the shared database and Google sign-in.
// See SETUP.md. These values are public by design; security comes from firestore.rules.
export default {
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    appId: '',
  },
  // Google accounts allowed into the admin portal (UI hint only; firestore.rules is the real lock).
  adminEmails: [],
  twitchChannel: 'armaniwestttt',
  cameoUrl: '',            // e.g. https://www.cameo.com/yourhandle once she has one
  shopUrl: '',             // optional external store (Shopify, etc.)
  geoEndpoint: 'https://ipwho.is/', // coarse city-level lookup, only after the visitor accepts
  site: 'https://illmedicine.github.io/ArmaniWest/',
};
