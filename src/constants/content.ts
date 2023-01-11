import {
  BRANCH,
  HOST,
  CONTACT_SALES_CALENDAR_AMER,
  CONTACT_SALES_CALENDAR_APAC,
  CONTACT_SALES_CALENDAR_EMEA,
  CONTACT_SALES_CALENDAR_LATAM,
} from './env'

export const BASE_URL = HOST

export const PATH = {
  demoUrl: '/demo/',
  pricingUrl: '/pricing/',
  accountTakeover: '/account-takeover/',
  ecommerce: '/ecommerce/',
  gaming: '/gaming/',
  cryptocurrency: '/cryptocurrency/',
  paymentFraud: '/payment-fraud/',
  blog: '/blog/',
  paywall: '/paywall/',
  caseStudies: '/case-studies/',
  contactSales: '/contact-sales/',
  whyFpjs: '/products/fingerprint-pro/',
  accountSharing: '/products/account-sharing-prevention/',
  botD: '/products/bot-detection/',
  bnpl: '/buy-now-pay-later/',
  careers: '/careers/',
  jobs: '/careers/jobs/',
  support: '/support/',
  security: '/security/',
  useCases: '/use-cases/',
  faq: '/resources/frequently-asked-questions-faqs/',
  integrations: '/integrations/',
  sdks: '/sdk-libraries/',
  github: '/github/',
} as const

export const USE_CASE_PATH = {
  personalization: `${PATH.useCases}personalization/`,
  accountSharing: `${PATH.useCases}account-sharing-prevention/`,
  paymentFraud: `${PATH.useCases}payment-fraud/`,
  credentialStuffing: `${PATH.useCases}credential-stuffing/`,
} as const

export const URL = {
  githubRepoUrl: 'https://github.com/fingerprintjs/fingerprintjs/',
  githubApiUrl: 'https://api.github.com/repos/fingerprintjs',
  githubCommunityRepoUrl: 'https://github.com/fingerprintjs/home',
  botDRepoUrl: 'https://github.com/fingerprintjs/BotD',
  botDIntegrationsRepoUrl: 'https://github.com/fingerprintjs/botd-integrations',
  dashboardLoginUrl: 'https://dashboard.fingerprint.com/login',
  careersUrl: 'https://boards.greenhouse.io/fingerprintjs/',
  careersConsoleLogUrl: 'https://grnh.se/bb9c55804us',
  linkedinUrl: 'https://www.linkedin.com/company/fingerprintjs/',
  twitterUrl: 'https://twitter.com/FingerprintJs/',
  signupUrl: 'https://dashboard.fingerprint.com/signup',
  statusUrl: 'https://status.fingerprint.com',
  supportMail: 'support@fingerprint.com',
  salesMail: 'sales@fingerprint.com',
  worKMail: 'work@fingerprint.com',
  discordServerURL: 'https://discord.gg/ad6R2ttHVX',

  docsUrl: 'https://dev.fingerprint.com',
  promotionalVideo: 'https://www.youtube.com/embed/UEYBysyPTBs',
  g2ReviewUrl: 'https://www.g2.com/products/fingerprintjs-fingerprint/reviews',
} as const

export const URL_CALENDAR = {
  contactSalesCalendarAmer: CONTACT_SALES_CALENDAR_AMER,
  contactSalesCalendarApac: CONTACT_SALES_CALENDAR_APAC,
  contactSalesCalendarEmea: CONTACT_SALES_CALENDAR_EMEA,
  contactSalesCalendarLatam: CONTACT_SALES_CALENDAR_LATAM,
} as const

export const MAILTO = { mailToUrl: `mailto:${URL.supportMail}` } as const
export const MAILTO_WORK = { mailToUrl: `mailto:${URL.worKMail}` } as const
export const MAILTO_SALES = { mailToUrl: `mailto:${URL.salesMail}` } as const

// links to readme should not have trailing slash to prevent forwarding
export const DOC_URL = {
  documentationUrl: `${URL.docsUrl}/docs`,
  getStartedUrl: `${URL.docsUrl}/docs/quick-start-guide`,
  proVsOpenUrl: `${URL.docsUrl}/docs/pro-vs-open-source`,
  browserFingerprintUrl: `${URL.docsUrl}/docs/browser-fingerprinting`,
  incognitoUrl: `${URL.docsUrl}/docs/incognito-private-mode-detection`,
  serverApiUrl: `${URL.docsUrl}/docs/server-api`,
  legalUrl: `${URL.docsUrl}/docs/dpa-gdpr`,
  termOfUseUrl: `${URL.docsUrl}/docs/terms-of-service`,
  privacyPolicyUrl: `${URL.docsUrl}/docs/privacy-policy`,
  browserSupportUrl: `${URL.docsUrl}/docs/browser-support`,
  webhooksUrl: `${URL.docsUrl}/docs/webhooks`,
  botDUrl: 'https://github.com/fingerprintjs/BotD#botd',
  zeroTrustUrl: `${URL.docsUrl}/docs/zero-trust-mode`,
  bestPracticesUrl: `${URL.docsUrl}/docs/best-practices`,
  migrateUrl: `${URL.docsUrl}/docs/migrating-from-open-source-v3`,
} as const

export const INTEGRATIONS_URL = {
  android: `${URL.docsUrl}/docs/native-android-integration`,
  angular: `${URL.docsUrl}/docs/angular`,
  flutter: `${URL.docsUrl}/docs/flutter`,
  go: `${URL.docsUrl}/docs/fingerprint-pro-server-api-go-sdk`,
  ios: `${URL.docsUrl}/docs/ios`,
  js: `${URL.docsUrl}/docs/js-agent`,
  ts: `${URL.docsUrl}/docs/js-agent#typescript-support`,
  next: `${URL.docsUrl}/docs/fingerprintjs-pro-nextjs`,
  node: `${URL.docsUrl}/docs/fingerprintjs-pro-server-api-nodejs-sdk`,
  openApi: `${URL.docsUrl}/docs/openapi-for-server-api-and-webhooks`,
  preact: `${URL.docsUrl}/docs/preact`,
  python: `${URL.docsUrl}/docs/python-server-api-sdk`,
  react: `${URL.docsUrl}/docs/fingerprintjs-pro-react`,
  reactNative: `${URL.docsUrl}/docs/fingerprintjs-pro-react-native`,
  svelte: `${URL.docsUrl}/docs/svelte`,
  vue: `${URL.docsUrl}/docs/vuejs`,
  gtm: `${URL.docsUrl}/docs/fingerprintjs-pro-google-tag-manager`,
  cloudflare: `${URL.docsUrl}/docs/cloudflare-integration-new-accounts`,
  chrome: `${URL.docsUrl}/docs/fingerprintjs-pro-and-chrome-extension`,
} as const

export const useCaseLinks = [
  { title: 'Account Takeover', url: PATH.accountTakeover, isLocal: true },
  { title: 'Payment Fraud', url: PATH.paymentFraud, isLocal: true },
  { title: 'Paywall', url: PATH.paywall, isLocal: true },
  { title: 'Ecommerce', url: PATH.ecommerce, isLocal: true },
  { title: 'Gaming', url: PATH.gaming, isLocal: true },
  { title: 'Cryptocurrency', url: PATH.cryptocurrency, isLocal: true },
  { title: 'Buy Now Pay Later', url: PATH.bnpl, isLocal: true },
]

export const platform = [
  { title: 'Fingerprint Pro', url: PATH.whyFpjs, isLocal: true },
  { title: 'BotD - Bot Detection', url: PATH.botD, isLocal: true },
  { title: 'Integrations', url: PATH.integrations, isLocal: true },
  { title: 'Security & Privacy', url: PATH.security, isLocal: true },
]

export const solutions = [
  { title: 'Payment Fraud', url: PATH.paymentFraud, isLocal: true },
  { title: 'Account Takeover', url: PATH.accountTakeover, isLocal: true },
  { title: 'Account Sharing Prevention', url: PATH.accountSharing, isLocal: true },
  { title: 'Paywall Enforcement', url: PATH.paywall, isLocal: true },
]
export const developers = [
  { title: 'Documentation', url: URL.docsUrl, isLocal: false },
  { title: 'Technical Tutorials', url: PATH.useCases, isLocal: true },
  { title: 'Open Source vs. Pro', url: PATH.github, isLocal: true },
  { title: 'API Status', url: URL.statusUrl, isLocal: false },
  { title: 'SDKs and Libraries', url: PATH.sdks, isLocal: true },
  { title: 'Discord Channel', url: URL.discordServerURL, isLocal: false },
  { title: 'GitHub', url: URL.githubCommunityRepoUrl, isLocal: false },
]

export const defaultDataLayer = [{ branch: BRANCH }]

// When changing this, some markdown files need to be changed as well.
export const DEFAULT_TRIAL_DAYS = 10

export const THOUSAND_IDENTIFICATIONS_PRICE = 0.002

export const solutionsDropdown = {
  protect: [
    {
      title: 'Payment Fraud',
      url: PATH.paymentFraud,
      description: 'Protect your revenue while keeping approval rates high.',
      useCasesLink: USE_CASE_PATH.paymentFraud,
    },
    {
      title: 'Account Takeover',
      url: PATH.accountTakeover,
      description: 'Prevent more attacks without hindering user experience. ',
    },
  ],
  grow: [
    {
      title: 'Account Sharing Prevention',
      url: PATH.accountSharing,
      description: 'Increase revenue by converting users into paying customers.',
      useCasesLink: USE_CASE_PATH.accountSharing,
    },
    {
      title: 'Paywall Enforcement',
      url: PATH.paywall,
      description: 'Monetize your content effectively by eliminating bypass techniques.',
    },
  ],
}

export const industryDropdown = [
  { title: 'eCommerce', url: PATH.ecommerce },
  { title: 'Buy Now Pay Later (BNPL)', url: PATH.bnpl },
  { title: 'Online Gaming & Gambling', url: PATH.gaming },
  { title: 'Cryptocurrency', url: PATH.cryptocurrency },
]

export const devResourcesDropdown = [
  { title: 'Documentation', url: URL.docsUrl },
  { title: 'API Status', url: URL.statusUrl },
  { title: 'SDKs and Libraries', url: PATH.sdks },
  { title: 'Open Source vs Pro', url: PATH.github },
]

export const communityDropdown = [
  { title: 'Discord', url: URL.discordServerURL },
  { title: 'GitHub', url: URL.githubCommunityRepoUrl },
]

export const platformDropdown = {
  capabilities: [
    {
      title: 'Fingerprint Pro',
      url: PATH.whyFpjs,
      description: 'Identify anonymous website visitors with our best-in-class identifier.',
    },
    {
      title: 'BotD - Bot Detection',
      url: PATH.botD,
      description: 'Detect automated threats and better understand your traffic.',
    },
  ],
  integrations: [
    {
      title: 'Integrations',
      url: PATH.integrations,
    },
    {
      title: 'Security & Privacy',
      url: PATH.security,
    },
  ],
}

export const resourcesDropdown = [
  { title: 'Blog', url: PATH.blog, isLocal: true },
  { title: 'FAQ', url: PATH.faq, isLocal: true },
  { title: 'Webinars', url: `${PATH.blog}tag/webinar/`, isLocal: true },
  { title: 'Case Studies', url: PATH.caseStudies, isLocal: true },
]
// We need to reset the chatbot widget on the following pages
export const PAGES_RELOAD_CHATBOT = [
  `${PATH.useCases}personalization/`,
  `${PATH.useCases}account-sharing-prevention/`,
  `${PATH.useCases}payment-fraud/`,
  `${PATH.useCases}credential-stuffing/`,
  PATH.contactSales,
  PATH.whyFpjs,
  PATH.paymentFraud,
  PATH.accountTakeover,
  PATH.accountSharing,
  PATH.paywall,
  PATH.botD,
]
