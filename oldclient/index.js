const get = require('lodash/get')
const keyBy = require('lodash/keyBy')
const { v4: uuid } = require('uuid')
const updateQuote = require('./updateQuote')
const createQuote = require('./createQuote')
const showOutput = require('./showOutput')

const apiUrl = 'http://bff-quote-app.itgcloud.vtmutins.com/v1/bff-qa-portal'

const main = async () => {
  const apiOptions = {
    apiUrl,
    userId: 'alamell',
    transactionId: uuid(),
  }

  const quoteGeneralInformation = {
    isoProgram: '91',
    effectiveDt: '2020-12-05',
    contractNumber: '20300',
    niprId: '0005411111',
    controllingStateProvCd: 'ME',
    policyTypeCd: 'HO0001',
    naicCd: '26018',
    isBookTransfer: false,
  }

  showOutput('new ui quote | general information', quoteGeneralInformation)

  const createdUiQuote = await createQuote(
    'HOME_GEN_QUOTE_INFO',
    quoteGeneralInformation,
    apiOptions,
  )

  showOutput('saved ui quote | general information', createdUiQuote)

  const updatedQuoteGeneralInfo = await updateQuote(
    'HOME_GEN_QUOTE_INFO',
    { ...createdUiQuote, effectiveDt: '2020-12-06' },
    apiOptions,
  )

  // showOutput('updated ui quote | general information', updatedQuoteGeneralInfo)

  // const newQuoteRiskId = uuid()
  // const newRiskBuildingId = uuid()
  // const newAdditionalNamedInsured1PartyId = uuid()
  // const newAdditionalNamedInsured2PartyId = uuid()
  // const newAdditionalNamedInsured3PartyId = uuid()

  // const uiQuoteClientInformation = {
  //   insuranceScoreOptInDt: '2020-12-04',
  //   mailingAddress: {
  //     attentionCd: '',
  //     addrLine1: '135 Main St',
  //     city: 'Montpelier',
  //     stateProvCd: 'VT',
  //     stateProvName: '',
  //     postalCode: '05602-2909',
  //     country: 'United States',
  //     isAddrManuallyVerified: true,
  //   },
  //   previousMailingAddress: {
  //     attentionCd: '',
  //     addrLine1: '135 Main St',
  //     city: 'Montpelier',
  //     stateProvCd: 'VT',
  //     stateProvName: '',
  //     postalCode: '05602-2909',
  //     country: 'United States',
  //     isAddrManuallyVerified: true,
  //   },
  //   billingAddress: {
  //     attentionCd: '',
  //     addrLine1: '135 Main St',
  //     city: 'Montpelier',
  //     stateProvCd: 'VT',
  //     stateProvName: '',
  //     postalCode: '05602-2909',
  //     country: 'United States',
  //     isAddrManuallyVerified: true,
  //   },
  //   quoteRiskId: newQuoteRiskId,
  //   quoteRisksById: {
  //     [newQuoteRiskId]: {
  //       quoteRiskId: newQuoteRiskId,
  //       riskBuilding: {
  //         riskBuildingId: newRiskBuildingId,
  //         locationBuildingNumber: 1,
  //         buildingAddress: {
  //           attentionCd: '',
  //           addrLine1: '135 Main St',
  //           city: 'Montpelier',
  //           stateProvCd: 'VT',
  //           stateProvName: '',
  //           postalCode: '05602-2909',
  //           country: 'United States',
  //           isAddrManuallyVerified: true,
  //         },
  //       },
  //     },
  //   },
  //   firstNamedInsuredParty: {
  //     quoteId: updatedQuoteGeneralInfo.quoteId,
  //     firstName: 'Bernadine',
  //     lastName: 'Rutherford',
  //     phoneNumber1TypeCd: 'Cell',
  //     phoneNumber1: '8022222221',
  //     partyRole: {
  //       policyPartyRoleCd: 'Insured',
  //       iterationNumber: 0,
  //     },
  //     birthDt: '1980-04-14',
  //     email: 'a1@b1.com',
  //     lengthTimeCurrentAddr: 3,
  //   },
  //   secondNamedInsuredParty: {
  //     quoteId: updatedQuoteGeneralInfo.quoteId,
  //     firstName: 'Hershel',
  //     lastName: 'Schuppe',
  //     birthDt: '1980-04-14',
  //     email: 'a2@b2.com',
  //     phoneNumber1TypeCd: 'Cell',
  //     phoneNumber1: '8022222222',
  //     partyRole: {
  //       policyPartyRoleCd: 'AI',
  //       iterationNumber: 1,
  //     },
  //   },
  //   additionalNamedInsuredPartyIds: [
  //     newAdditionalNamedInsured1PartyId,
  //     newAdditionalNamedInsured2PartyId,
  //     newAdditionalNamedInsured3PartyId,
  //   ],
  //   additionalNamedInsuredPartiesById: {
  //     [newAdditionalNamedInsured1PartyId]: {
  //       quoteId: updatedQuoteGeneralInfo.quoteId,
  //       firstName: 'Montana',
  //       lastName: 'Romaguera',
  //       birthDt: '1980-04-14',
  //       partyRole: {
  //         policyPartyRoleCd: 'AI',
  //         iterationNumber: 2,
  //       },
  //     },
  //     [newAdditionalNamedInsured2PartyId]: {
  //       quoteId: updatedQuoteGeneralInfo.quoteId,
  //       firstName: 'Gerry',
  //       lastName: 'Padberg',
  //       birthDt: '1980-04-14',
  //       partyRole: {
  //         policyPartyRoleCd: 'AI',
  //         iterationNumber: 3,
  //       },
  //     },
  //     [newAdditionalNamedInsured3PartyId]: {
  //       quoteId: updatedQuoteGeneralInfo.quoteId,
  //       firstName: 'Gia',
  //       lastName: 'Rogahn',
  //       birthDt: '1980-04-14',
  //       partyRole: {
  //         policyPartyRoleCd: 'AI',
  //         iterationNumber: 4,
  //       },
  //     },
  //   },
  // }

  // const updatedQuoteClientInfo = await updateQuote(
  //   'HOME_CLIENT_INFO',
  //   { ...updatedQuoteGeneralInfo, ...uiQuoteClientInformation },
  //   apiOptions,
  // )

  // showOutput('updated ui quote | dwelling coverages', updatedQuoteClientInfo)

  // const newCoverageItem1Id = uuid()
  // const newCoverageItem2Id = uuid()
  // const newCoverageItem3Id = uuid()
  // const newCoverageItem4Id = uuid()
  // const newCoverageItem5Id = uuid()

  // const uiDwellingCoveragesRiskCoverageItems = [
  //   {
  //     quoteId: updatedQuoteClientInfo.quoteId,
  //     riskBuildingId: newRiskBuildingId,
  //     coverageItemId: newCoverageItem1Id,
  //     coverageCd: 'DWELL',
  //     limitInteger1: 200000,
  //     deductible1AppliesToCd: 'ALLPERIL',
  //     deductibleInteger1: 1000,
  //     limit1AppliesToCd: 'COVERAGE',
  //   },
  //   {
  //     quoteId: updatedQuoteClientInfo.quoteId,
  //     riskBuildingId: newRiskBuildingId,
  //     coverageItemId: newCoverageItem2Id,
  //     coverageCd: 'OS',
  //     limitInteger1: 20000,
  //     limit1AppliesToCd: 'COVERAGE',
  //   },
  //   {
  //     quoteId: updatedQuoteClientInfo.quoteId,
  //     riskBuildingId: newRiskBuildingId,
  //     coverageItemId: newCoverageItem3Id,
  //     coverageCd: 'PP',
  //     limitInteger1: 140000,
  //     limit1AppliesToCd: 'COVERAGE',
  //   },
  //   {
  //     quoteId: updatedQuoteClientInfo.quoteId,
  //     riskBuildingId: newRiskBuildingId,
  //     coverageItemId: newCoverageItem4Id,
  //     coverageCd: 'LOU',
  //     limitInteger1: 40000,
  //     limit1AppliesToCd: 'COVERAGE',
  //   },
  //   {
  //     quoteId: updatedQuoteClientInfo.quoteId,
  //     riskBuildingId: newRiskBuildingId,
  //     coverageItemId: newCoverageItem5Id,
  //     coverageCd: 'PPREP',
  //   },
  // ]

  // const riskCoverageItemIds = uiDwellingCoveragesRiskCoverageItems.map(
  //   item => item.coverageItemId,
  // )

  // const riskCoverageItemsById = keyBy(
  //   uiDwellingCoveragesRiskCoverageItems,
  //   'coverageItemId',
  // )

  // const uiDwellingCoveragesRiskBuilding = {
  //   ...updatedQuoteClientInfo.quoteRisksById[updatedQuoteClientInfo.quoteRiskId]
  //     .riskBuilding,
  //   constructionCd: 'F',
  //   yearBuilt: 1999,
  //   dwellUseCd: '1',
  //   residenceTypeCd: 'TH',
  //   tieDownCd: 'NONE',
  //   numFamilies: 1,
  //   distanceToHydrant: '0_1000',
  //   distanceToFireStation: 1,
  //   numUnitsInFireDivision: '1',
  //   weeksRented: '1_TO_6',
  //   isKitBuiltOrManufactured: false,
  //   riskCoverageItemIds,
  //   riskCoverageItemsById,
  // }

  // const updatedQuoteDwellingCoverages = await updateQuote(
  //   'HOME_DWELLING_INFO',
  //   {
  //     ...updatedQuoteClientInfo,
  //     ...uiQuoteClientInformation,
  //     quoteRiskId: updatedQuoteClientInfo.quoteRiskId,
  //     quoteRisksById: {
  //       [updatedQuoteClientInfo.quoteRiskId]: {
  //         ...updatedQuoteClientInfo.quoteRisksById[
  //           updatedQuoteClientInfo.quoteRiskId
  //         ],
  //         ...uiQuoteClientInformation.quoteRisksById[
  //           updatedQuoteClientInfo.quoteRiskId
  //         ],
  //         riskBuilding: uiDwellingCoveragesRiskBuilding,
  //       },
  //     },
  //   },
  //   apiOptions,
  // )

  // showOutput(
  //   'updated ui quote | dwelling coverages',
  //   updatedQuoteDwellingCoverages,
  // )
}

main()
