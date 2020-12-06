### Normalizing and denormalizing quote

#### `ApiQuote`

```
{
  "quote": {
    "mailingAddress": {},
    "previousMailingAddress": {},
    "billingAddress": {},
    "billingDetail": {},
    "parties": [
      {
        "partyRoles": [{}],
        "partyApplicantPriorLoss": [],
      },
    ],
    "quoteRisk": [
      {
        "riskBuilding": {
          "buildingAddress": {},
          "riskCoverageItems": [{}],
        }
      }
    ],
    "quoteAnswer": [{}],
    "coverageItems": [{}]
  },
  "ruleResults": [],
  "errors": []
}
```

#### `UiQuote`

```
{
  "mailingAddress": {}
  "previousMailingAddress": {},
  "billingAddress": {},
  "billingDetail": {},
  "quoteRiskId": "1",
  "quoteRisksById: {
    "1": {
      "riskBuilding": {
        "buildingAddress": {},
        "riskCoverageItemIds": ["1", "2"]
        "riskCoverageItemsById": {
          "1": {},
          "2": {},
        }
      }
    }
  },
  "coverageItemIds": ["1", "2"]
  "firstNamedInsuredParty": {
    "partyRole": {}
    "partyPriorLosses": [{}]
  },
  "secondNamedInsuredParty": {
    "partyRole": {}
    "partyPriorLosses": [{}]
  },
  "additionalNamedInsuredPartyIds": ["1", "2"],
  "additionalNamedInsuredPartiesById": {
    "1": {},
    "2": {},
  },
  "secondAdditionalNamedInsuredParty": {
    "partyRole": {}
    "partyPriorLosses": [{}]
  },
  "thirdAdditionalNamedInsuredParty": {
    "partyRole": {}
    "partyPriorLosses": [{}]
  },
  "answersById": {
    "1": {},
    "2": {},
  },
  "coverageItemsById": {
    "1": {},
    "2": {},
  }
  "ruleResults": [{}],
  "errors": [{}]
}
```

### Empty quote created by UI

```
{
  "isoProgram": "91",
  "lobCd": "HOME",
  "policyTerm": 1,
  "policyTermUnit": "YR",
  "quoteStatus": "QuoteIncomplete",
  "systemOfOriginVendor": "Vermont Mutual",
  "systemOfOriginProduct": "FrontEnd",
  "systemOfOriginVersion": "2.1"
}
```

