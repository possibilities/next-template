import React, { ReactNode, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { v4 as uuid } from 'uuid'
import request from 'axios'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import traverse from 'traverse'
import first from 'lodash/first'

const apiUrl = 'http://bff-quote-app.itgcloud.vtmutins.com/v1/bff-qa-portal'

const apiOptions = {
  apiUrl,
  userId: 'alamell',
  transactionId: uuid(),
}

const examples = [
  {
    name: 'Create quote | General information',
    url: '/quote',
    method: 'POST' as const,
    data: {
      action: 'HOME_GEN_QUOTE_INFO',
      quote: {
        isoProgram: '91',
        effectiveDt: '2020-12-05',
        contractNumber: '20300',
        niprId: '0005411111',
        controllingStateProvCd: 'ME',
        policyTypeCd: 'HO0001',
        naicCd: '26018',
        isBookTransfer: false,
      },
    },
  },
]

const newStaticQuoteProperties = {
  lobCd: 'HOME',
  policyTerm: 1,
  policyTermUnit: 'YR',
  quoteStatus: 'QuoteIncomplete',
  systemOfOriginVendor: 'Vermont Mutual',
  systemOfOriginProduct: 'FrontEnd',
  systemOfOriginVersion: '2.1',
}

const prepareNewQuote = (newQuote: object, userId: string) => {
  const newQuoteProperties = {
    createdBy: userId,
    updatedBy: userId,
  }

  const quote = {
    ...newQuote,
    ...newStaticQuoteProperties,
    ...newQuoteProperties,
  }

  return quote
}

const cleanOutput = (obj: unknown) =>
  traverse(obj).map(function (value) {
    if (value === null) this.delete()
    if (value === undefined) this.delete()
    if (Array.isArray(value || isObject(value)) && isEmpty(value)) {
      this.delete()
    }
    if (first(this.path) === 'attachments') this.delete()
    if (this.key?.startsWith('systemOfOrigin')) this.delete()
    if (this.key === 'createdDttime') this.delete()
    if (this.key === 'createdBy') this.delete()
    if (this.key === 'updatedDttime') this.delete()
    if (this.key === 'updatedBy') this.delete()
  })

const Page = (): ReactNode => {
  const [response, setResponse] = useState()
  return (
    <>
      {examples.map(example => (
        <>
          <Box paddingBottom={2}>
            <Typography variant='h1'>{example.name}</Typography>
          </Box>
          <Box paddingBottom={2}>
            <Typography variant='h2'>
              {example.method} {example.url} ({example.data.action})
            </Typography>
          </Box>
          <Box display='flex'>
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(example.data.quote, null, 2)}</pre>
            </Box>
            {response && (
              <Box paddingBottom={2}>
                <pre>{JSON.stringify(cleanOutput(response), null, 2)}</pre>
              </Box>
            )}
          </Box>
          <Button
            variant='outlined'
            onClick={async () => {
              const { data } = await request({
                method: example.method,
                baseURL: apiUrl,
                url: example.url,
                headers: {
                  userId: apiOptions.userId,
                  transactionId: apiOptions.transactionId,
                  Authorization: `bearer ${apiOptions.userId}`,
                  'Content-Type': 'application/json',
                },
                data: {
                  action: example.data.action,
                  userId: apiOptions.transactionId,
                  transactionId: apiOptions.transactionId,
                  quote:
                    example.method === 'POST'
                      ? prepareNewQuote(example.data.quote, apiOptions.userId)
                      : example.data.quote,
                },
              })
              setResponse(data)
            }}
          >
            Run example
          </Button>
        </>
      ))}
    </>
  )
}

export default Page
