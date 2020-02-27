const build = {
  NODE_ENV: 'production',
  DOTE_API_HOST: 'web-api-staging.doteshopping.com',
  DOTE_CACHE_API_HOST: 'web-api-cache-staging.doteshopping.com',
  DOTE_API_PROTOCOL: 'https',
  ASSETS_URL: '/static/',
  PORT: '8500',
  GA_ID: 'UA-89367921-4',
  LOGGLY_KEY: '9b7c6275-6447-4db1-b346-61ab41ada726/tag/dev/',
  SMARTY_AUTH_ID: '32728600895094950',
  BRANCH_KEY: 'key_test_mkrgHythOvKgREO56GQyljbfDvi8jhSn',
  FB_APP_ID: '631830767281389',
  CONTENTFUL_ACCESS_TOKEN: '0OY7Rse3ajimg2O5XBAlpQL85YO2dk8fUgRCwWr2veA',
  CONTENTFUL_API_URL: 'preview.contentful.com',
  CONTENTFUL_SPACE: 'j4hl0222l48u',
  ROBOTS_TXT: 'robots-staging.txt',
  APPLE_PAY_TXT: 'apple-developer-merchantid-domain-association.txt',
  SNAP_ID: 'fd16be2e-a7fe-4908-82d3-ede29f0e5d75',
  HOTJAR_ID: '1487075',
  PROXY_API: 'true',
}

const serve = {
  NODE_ENV: 'production',
}

const develop = Object.assign({}, serve, build, {
  NODE_ENV: 'development',
  ASSETS_URL: '/dev-static/',
})

module.exports = {
  build,
  serve,
  develop,
}
