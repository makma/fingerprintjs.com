import { BRANCH, HOST } from './env'

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
  whyFpjs: '/products/browser-fingerprinting/',
  accountSharing: '/products/account-sharing-prevention/',
  botD: '/products/bot-detection/',
} as const

export const URL = {
  githubRepoUrl: 'https://github.com/fingerprintjs/fingerprintjs/',
  githubCommunityRepoUrl: 'https://github.com/fingerprintjs/home',
  githubApiUrl: 'https://api.github.com/repos/fingerprintjs/fingerprintjs',
  botDRepoUrl: 'https://github.com/fingerprintjs/BotD',
  botDIntegrationsRepoUrl: 'https://github.com/fingerprintjs/botd-integrations',
  dashboardLoginUrl: 'https://dashboard.fingerprintjs.com/login',
  careersUrl: 'https://careers.fingerprintjs.com/',
  careersConsoleLogUrl: 'https://grnh.se/bb9c55804us',
  linkedinUrl: 'https://www.linkedin.com/company/fingerprintjs/',
  twitterUrl: 'https://twitter.com/FingerprintJs/',
  signupUrl: 'https://dashboard.fingerprintjs.com/signup',
  statusUrl: 'https://status.fingerprintjs.com/',
  supportMail: 'support@fingerprintjs.com',
  discordServerURL: 'https://discord.gg/ad6R2ttHVX',
} as const

export const MAILTO = { mailToUrl: `mailto:${URL.supportMail}` } as const

export const DOC_URL = {
  documentationUrl: 'https://dev.fingerprintjs.com/',
  getStartedUrl: 'https://dev.fingerprintjs.com/docs/quick-start-guide/',
  proVsOpenUrl: 'https://dev.fingerprintjs.com/docs/pro-vs-open-source/',
  browserFingerprintUrl: 'https://dev.fingerprintjs.com/docs/browser-fingerprinting/',
  incognitoUrl: 'https://dev.fingerprintjs.com/docs/incognito-private-mode-detection/',
  serverApiUrl: 'https://dev.fingerprintjs.com/docs/server-api/',
  legalUrl: 'https://dev.fingerprintjs.com/docs/dpa-gdpr/',
  termOfUseUrl: 'https://dev.fingerprintjs.com/docs/terms-of-service/',
  privacyPolicyUrl: 'https://dev.fingerprintjs.com/docs/privacy-policy/',
  browserSupportUrl: 'https://dev.fingerprintjs.com/docs/browser-support/',
  webhooksUrl: 'https://dev.fingerprintjs.com/docs/webhooks',
  botDUrl: 'https://github.com/fingerprintjs/BotD#botd-currently-in-beta',
} as const

export const useCaseLinks = [
  { title: 'Account Takeover', url: PATH.accountTakeover, isLocal: true },
  { title: 'Payment Fraud', url: PATH.paymentFraud, isLocal: true },
  { title: 'Paywall', url: PATH.paywall, isLocal: true },
  { title: 'Ecommerce', url: PATH.ecommerce, isLocal: true },
  { title: 'Gaming', url: PATH.gaming, isLocal: true },
  { title: 'Cryptocurrency', url: PATH.cryptocurrency, isLocal: true },
]

export const products = [
  { title: 'Browser Fingerprinting', url: PATH.whyFpjs, isLocal: true },
  { title: 'Account Sharing Prevention', url: PATH.accountSharing, isLocal: true },
  { title: 'Bot Detection', url: PATH.botD, isLocal: true },
]

export const defaultDataLayer = [{ branch: BRANCH }]

// When changing this, some markdown files need to be changed as well.
export const DEFAULT_TRIAL_DAYS = 10
