const cleanOutput = require('./cleanOutput')

const showOutput = (message, apiQuote) => {
  console.info('-----------------------------------------------------')
  console.info('| ' + message)
  console.info('-----------------------------------------------------')
  console.info(cleanOutput(apiQuote))
}

module.exports = showOutput
