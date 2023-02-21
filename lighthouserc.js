module.exports = {
  ci: {
    collect: {
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox',
      },
      staticDistDir: './public',
      url: [
        'http://localhost/index.html',
        'http://localhost/demo/index.html',
        'http://localhost/pricing/index.html',
        'http://localhost/case-studies/edtech/index.html',
        'http://localhost/ecommerce/index.html',
        'http://localhost/github/index.html',
        'http://localhost/products/account-sharing-prevention/index.html',
        'http://localhost/products/bot-detection/index.html',
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
