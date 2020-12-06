const compact = require('lodash/compact')

const apiPartyFromUiPartyFlatMap = uiParty => {
  if (!uiParty) return []
  const { partyRole, ...party } = uiParty
  return [{ ...party, partyRoles: [partyRole] }]
}

const apiPartiesFromUiParties = (...uiParties) =>
  uiParties.flatMap(apiPartyFromUiPartyFlatMap)

const apiQuoteFromUiQuote = uiQuote => {
  const {
    firstNamedInsuredParty,
    secondNamedInsuredParty,
    additionalNamedInsuredPartyIds = [],
    additionalNamedInsuredPartiesById,
    quoteRiskId,
    quoteRisksById = {},
    ...quote
  } = uiQuote
  const { riskBuilding, ...quoteRisk } = quoteRisksById[quoteRiskId] || {}
  const { riskCoverageItemsById, ...apiRiskBuidling } = riskBuilding || {}
  return {
    ...quote,
    quoteRisk: compact([{ ...quoteRisk, riskBuilding: apiRiskBuidling }]),
    parties: apiPartiesFromUiParties(
      firstNamedInsuredParty,
      secondNamedInsuredParty,
      ...additionalNamedInsuredPartyIds.map(
        id => additionalNamedInsuredPartiesById[id],
      ),
    ),
  }
}

module.exports = apiQuoteFromUiQuote
