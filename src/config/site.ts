// Business configuration — fill in TODOs before launch.
// Keep all contact info, areas and copy here so edits never touch components.

export const SITE_CONFIG = {
  // ─── Business identity ───────────────────────────────────────────────────
  businessName: 'Style Detail Lab',
  tagline: 'Premium Mobile Detailing. We Come to You.',

  // ─── Contact ────────────────────────────────────────────────────────────
  phone: '+353870044296',
  phoneDisplay: '+353 87 004 4296',
  whatsapp: '+353870044296',
  email: 'info@styledetaillab.ie',

  // ─── Social ─────────────────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/TODO',
    tiktok: 'https://tiktok.com/@TODO',
    facebook: 'https://facebook.com/TODO',
  },

  // ─── Hours ──────────────────────────────────────────────────────────────
  hours: 'Sat–Sun · 9am–9pm',

  // ─── Reviews / trust ────────────────────────────────────────────────────
  googleRating: '5.0',     // TODO: replace with real Google rating
  reviewCount: '47',       // TODO: replace with real review count
  carsDetailed: '200+',    // cars detailed to date
  yearsActive: '10',       // years of experience

  // ─── Eircode routing keys covered ───────────────────────────────────────
  // First 3 chars of an Irish Eircode (e.g. "D04"). Add/remove as needed.
  coveredEircodes: [
    'D01','D02','D03','D04','D05','D06','D07','D08','D09','D10',
    'D11','D12','D13','D14','D15','D16','D17','D18','D20','D22','D24',
    'A94','A96',
    // North county Dublin + Ashbourne (client list)
    'K32','K34','K36','K45','K56','K67','A84',
  ],

  // ─── Service areas (for SEO block + LocalBusiness schema) ───────────────
  areas: [
    // Original 39 Dublin areas
    'Clontarf', 'Drumcondra', 'Glasnevin', 'Phibsborough',
    'Rathgar', 'Rathmines', 'Ranelagh', 'Donnybrook',
    'Ballsbridge', 'Sandymount', 'Ringsend', 'Portobello',
    "Harold's Cross", 'Terenure', 'Templeogue', 'Crumlin',
    'Drimnagh', 'Inchicore', 'Kilmainham', 'Stoneybatter',
    'Cabra', 'Finglas', 'Artane', 'Raheny',
    'Sutton', 'Howth', 'Malahide', 'Swords',
    'Blanchardstown', 'Castleknock', 'Lucan', 'Clondalkin',
    'Tallaght', 'Dundrum', 'Stillorgan', 'Blackrock',
    'Dún Laoghaire', 'Dalkey', 'Killiney',
    // Added — client list (north county / Swords estates / Meath)
    'Donabate', 'Portrane', 'Rush', 'Lusk',
    'Skerries', 'Balbriggan', 'Naul', 'Oldtown',
    'Rolestown', 'Ballyboughal', 'Ashbourne', 'Garristown',
    'River Valley', 'Brackenstown', 'Applewood', 'Boroimhe',
    'Holywell', 'Ridgewood', 'Knocksedan', 'Cloghran',
    "St. Margaret's", 'Santry', 'Ballymun', 'Clonsilla',
    'Ongar', 'Portmarnock', 'Kinsealy', 'Baldoyle',
    'Donaghmede', 'Clarehall', 'Balgriffin', 'Coolock',
    'Whitehall', 'Beaumont',
  ],

  // ─── Form ───────────────────────────────────────────────────────────────
  formspreeId: 'TODO_FORM_ID',              // (unused) legacy
  // Free email delivery for the contact form — get a key at web3forms.com
  // (enter your email, it emails you an access key). Leave '' to disable email.
  web3formsKey: '',

  // ─── SEO / meta ─────────────────────────────────────────────────────────
  seo: {
    title: 'Mobile Car Detailing Dublin | We Come to You',
    description:
      'Premium mobile car detailing in Dublin. We bring the studio to your door — fully insured, own water & power. Get an instant estimate.',
    url: 'https://styledetaillab.ie/',   // update when a custom domain is set
    ogImage: '/og-image.jpg',
  },
} as const
