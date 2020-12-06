const request = require('axios')
const cleanOutput = require('./cleanOutput')
const apiQuoteFromUiQuote = require('./apiQuoteFromUiQuote')
const uiQuoteFromApiQuote = require('./uiQuoteFromApiQuote')

const getRequestConfig = (userId, transactionId) => ({
  headers: {
    userId,
    transactionId,
    Authorization: `bearer ${userId}`,
    'Content-Type': 'application/json',
  },
})

const updateQuote = async (
  action,
  quote,
  { userId, transactionId, apiUrl },
) => {
  console.log(cleanOutput(apiQuoteFromUiQuote(quote)))
  const { data } = await request.put(
    `${apiUrl}/quote`,
    { action, quote: apiQuoteFromUiQuote(quote), userId, transactionId },
    getRequestConfig(userId, transactionId),
  )

  return uiQuoteFromApiQuote(data.quote)
}

module.exports = updateQuote
