// Business configuration — fill in TODOs before launch.
// Keep all contact info, areas and copy here so edits never touch components.

export const SITE_CONFIG = {
  // ─── Business identity ───────────────────────────────────────────────────
  businessName: 'TODO: Business Name',       // e.g. "Dublin Mobile Detailing"
  tagline: 'Premium Mobile Detailing. We Come to You.',

  // ─── Contact ────────────────────────────────────────────────────────────
  phone: '+353870044296',
  phoneDisplay: '+353 87 004 4296',
  whatsapp: '+353870044296',
  email: 'styledetaillab@gmail.com',

  // ─── Social ─────────────────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/TODO',
    tiktok: 'https://tiktok.com/@TODO',
    facebook: 'https://facebook.com/TODO',
  },

  // ─── Hours ──────────────────────────────────────────────────────────────
  hours: 'Mon–Fri from 5pm · Sat–Sun 9am–9pm',

  // ─── Reviews / trust ────────────────────────────────────────────────────
  googleRating: '5.0',     // TODO: replace with real Google rating
  reviewCount: '47',       // TODO: replace with real review count
  carsDetailed: '200+',    // TODO: update counter
  yearsActive: '3',        // TODO: update

  // ─── Eircode routing keys covered ───────────────────────────────────────
  // First 3 chars of an Irish Eircode (e.g. "D04"). Add/remove as needed.
  coveredEircodes: [
    'D01','D02','D03','D04','D05','D06','D6W','D07','D08','D09','D10',
    'D11','D12','D13','D14','D15','D16','D17','D18','D20','D22','D24',
    'A94','A96','A98','A63','A84',
    'K32','K34','K36','K45','K56','K67',
    'W23',
  ],

  // ─── Service areas (for SEO block + LocalBusiness schema) ───────────────
  areas: [
    // City & inner suburbs
    'Clontarf', 'Drumcondra', 'Glasnevin', 'Phibsborough',
    'Fairview', 'Marino', 'East Wall', 'North Strand',
    'Rathgar', 'Rathmines', 'Ranelagh', 'Donnybrook',
    'Ballsbridge', 'Sandymount', 'Ringsend', 'Portobello',
    "Harold's Cross", 'Terenure', 'Templeogue', 'Crumlin',
    'Drimnagh', 'Inchicore', 'Kilmainham', 'Stoneybatter',
    'Cabra', 'Kimmage', 'Walkinstown', 'Milltown',
    // North city & north county
    'Finglas', 'Artane', 'Raheny', 'Beaumont',
    'Coolock', 'Donnycarney', 'Santry', 'Whitehall',
    'Ballymun', 'Baldoyle', 'Donaghmede', 'Clarehall',
    'Balgriffin', 'Kinsealy', 'Sutton', 'Howth',
    'Portmarnock', 'Malahide', 'Swords', 'Donabate',
    'Portrane', 'Rush', 'Lusk', 'Skerries',
    'Balbriggan', 'Naul', 'Oldtown', 'Rolestown',
    'Ballyboughal', 'Garristown', 'Cloghran', "St. Margaret's",
    // Swords estates
    'River Valley', 'Brackenstown', 'Applewood', 'Boroimhe',
    'Holywell', 'Ridgewood', 'Knocksedan',
    // West
    'Blanchardstown', 'Castleknock', 'Clonsilla', 'Ongar',
    'Ashtown', 'Chapelizod', 'Palmerstown', 'Ballyfermot',
    'Lucan', 'Clondalkin', 'Tallaght', 'Firhouse',
    'Rathfarnham', 'Knocklyon',
    // South city & south county
    'Dundrum', 'Churchtown', 'Clonskeagh', 'Goatstown',
    'Ballinteer', 'Sandyford', 'Leopardstown', 'Stillorgan',
    'Mount Merrion', 'Booterstown', 'Blackrock', 'Monkstown',
    'Deansgrange', 'Foxrock', 'Cabinteely', 'Dún Laoghaire',
    'Dalkey', 'Killiney',
    // Commuter belt
    'Bray', 'Greystones', 'Maynooth', 'Leixlip', 'Celbridge',
    'Ashbourne',
  ],

  // ─── Form ───────────────────────────────────────────────────────────────
  formspreeId: 'TODO_FORM_ID',              // get free endpoint at formspree.io

  // ─── SEO / meta ─────────────────────────────────────────────────────────
  seo: {
    title: 'Mobile Car Detailing Dublin | We Come to You',
    description:
      'Premium mobile car detailing in Dublin. We bring the studio to your door — fully insured, own water & power. Get an instant estimate.',
    url: 'https://TODO.ie',                  // TODO: set production domain
    ogImage: '/og-image.jpg',
  },
} as const
