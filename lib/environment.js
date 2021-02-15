const ENV_VARS = {
  CHAIN_ID: [process.env.CHAIN_ID, '1'],

  SITE_DESCRIPTION: [process.env.SITE_DESCRIPTION, 'Instars Liquidity Rewards'],
  SITE_TITLE: [process.env.SITE_DESCRIPTION, 'Instars Liquidity Rewards'],
  SITE_URL: [process.env.SITE_URL, 'https://liquidity.Instars.com/'],
  WEBSITE_FRONTEND_URL: [process.env.WEBSITE_FRONTEND_URL, 'https://instars.com'],
  WEBSITE_BACKEND_URL: [process.env.WEBSITE_BACKEND_URL, ''],
}

function environment(name) {
  const envVar = ENV_VARS[name]
  if (!envVar) {
    return null
  }
  return envVar[0] === undefined ? envVar[1] : envVar[0].trim()
}

function fullEnvironment() {
  return Object.fromEntries(
    Object.keys(ENV_VARS).map(key => [key, environment(key)])
  )
}
// Important: use CJS in this file so it can get imported by next.config.js.
module.exports = environment
module.exports.fullEnvironment = fullEnvironment
