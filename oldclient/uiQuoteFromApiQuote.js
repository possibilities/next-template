const get = require('lodash/get')
const keyBy = require('lodash/keyBy')
const sortBy = require('lodash/sortBy')

const namedInsuredPolicyPartyRoleCds = ['AI', 'Insured']

const isPartyNamedInsuredFilter = party =>
  namedInsuredPolicyPartyRoleCds.includes(party.partyRoles[0].policyPartyRoleCd)

const uiQuoteFromApiQuote = apiQuote => {
  const { quoteRisk: apiQuoteRisks, parties: apiParties, ...quote } = apiQuote
  const apiNamedInsured = apiParties.filter(isPartyNamedInsuredFilter)
  const apiSortedNamedInsureds = sortBy(
    apiNamedInsured,
    'partyRoles[0].iterationNumber',
  )
  const [quoteRisk] = apiQuoteRisks
  const [
    firstNamedInsuredParty,
    secondNamedInsuredParty,
    ...additionalNamedInsuredParties
  ] = apiSortedNamedInsureds
  const { riskBuilding, ...uiQuoteRisk } = quoteRisk
  const { riskCoverageItems = [], ...uiRiskBuilding } = riskBuilding
  return {
    ...quote,
    firstNamedInsuredParty,
    secondNamedInsuredParty,
    additionalNamedInsuredPartyIds: additionalNamedInsuredParties.map(
      party => party.partyId,
    ),
    additionalNamedInsuredPartiesById: keyBy(
      additionalNamedInsuredParties,
      'partyId',
    ),
    quoteRiskId: get(quoteRisk, 'quoteRiskId'),
    quoteRisksById: {
      [get(quoteRisk, 'quoteRiskId')]: {
        ...uiQuoteRisk,
        riskBuilding: {
          ...uiRiskBuilding,
          riskCoverageItemIds: riskCoverageItems.map(
            item => item.coverageItemId,
          ),
          riskCoverageItemsById: keyBy(riskCoverageItems, 'coverageItemId'),
        },
      },
    },
  }
}

module.exports = uiQuoteFromApiQuote
