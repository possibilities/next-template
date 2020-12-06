const request = require('axios')
const cleanOutput = require('./cleanOutput')
const apiQuoteFromUiQuote = require('./apiQuoteFromUiQuote')
const uiQuoteFromApiQuote = require('./uiQuoteFromApiQuote')

const newStaticQuoteProperties = {
  lobCd: 'HOME',
  policyTerm: 1,
  policyTermUnit: 'YR',
  quoteStatus: 'QuoteIncomplete',
  systemOfOriginVendor: 'Vermont Mutual',
  systemOfOriginProduct: 'FrontEnd',
  systemOfOriginVersion: '2.1',
}

const getRequestConfig = (userId, transactionId) => ({
  headers: {
    userId,
    transactionId,
    Authorization: `bearer ${userId}`,
    'Content-Type': 'application/json',
  },
})

const createQuote = async (
  action,
  newQuote,
  { userId, transactionId, apiUrl },
) => {
  const newQuoteProperties = {
    createdBy: userId,
    updatedBy: userId,
  }

  const quote = {
    ...newQuote,
    ...newStaticQuoteProperties,
    ...newQuoteProperties,
  }

  const { data } = await request.post(
    `${apiUrl}/quote`,
    { action, quote: apiQuoteFromUiQuote(quote), userId, transactionId },
    getRequestConfig(userId, transactionId),
  )

  return uiQuoteFromApiQuote(data.quote)
}

module.exports = createQuote
