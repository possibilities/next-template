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
  const [uiRequests, setUiRequests] = useState<unknown[]>([])
  const [uiResponses, setUiResponses] = useState<unknown[]>([])
  const [apiRequests, setApiRequests] = useState<unknown[]>([])
  const [apiResponses, setApiResponses] = useState<unknown[]>([])
  return (
    <>
      <Box paddingBottom={4}>
        <Box paddingBottom={2}>
          <Typography variant='h1'>
            Create quote | General information
          </Typography>
        </Box>
        <Box display='flex'>
          {uiRequests[0] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(uiRequests[0]), null, 2)}</pre>
            </Box>
          )}
          {apiRequests[0] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(apiRequests[0]), null, 2)}</pre>
            </Box>
          )}
          {uiResponses[0] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(uiResponses[0]), null, 2)}</pre>
            </Box>
          )}
          {apiResponses[0] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(apiResponses[0]), null, 2)}</pre>
            </Box>
          )}
        </Box>
        <Button
          variant='outlined'
          onClick={async () => {
            const newQuote = {
              isoProgram: '91',
              effectiveDt: '2020-12-05',
              contractNumber: '20300',
              niprId: '0005411111',
              controllingStateProvCd: 'ME',
              policyTypeCd: 'HO0001',
              naicCd: '26018',
              isBookTransfer: false,
            }
            const apiQuote = prepareNewQuote(newQuote, apiOptions.userId)
            setUiRequests(uiRequests => {
              const cloned = [...uiRequests]
              cloned[0] = apiQuote
              return cloned
            })
            setApiRequests(apiRequests => {
              const cloned = [...apiRequests]
              cloned[0] = apiQuote
              return cloned
            })
            const { data } = await request({
              url: '/quote',
              method: 'POST',
              baseURL: apiUrl,
              headers: {
                userId: apiOptions.userId,
                transactionId: apiOptions.transactionId,
                Authorization: `bearer ${apiOptions.userId}`,
                'Content-Type': 'application/json',
              },
              data: {
                quote: apiQuote,
                action: 'HOME_GEN_QUOTE_INFO',
                userId: apiOptions.transactionId,
                transactionId: apiOptions.transactionId,
              },
            })
            setUiResponses(uiResponses => {
              const cloned = [...uiResponses]
              cloned[0] = data
              return cloned
            })
            setApiResponses(apiResponses => {
              const cloned = [...apiResponses]
              cloned[0] = data
              return cloned
            })
          }}
        >
          Run example
        </Button>
      </Box>
      <Box paddingBottom={4}>
        <Box paddingBottom={2}>
          <Typography variant='h1'>
            Update quote | General information
          </Typography>
        </Box>
        <Box display='flex'>
          {uiRequests[1] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(uiRequests[1]), null, 2)}</pre>
            </Box>
          )}
          {apiRequests[1] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(apiRequests[1]), null, 2)}</pre>
            </Box>
          )}
          {uiResponses[1] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(uiResponses[1]), null, 2)}</pre>
            </Box>
          )}
          {apiResponses[1] && (
            <Box paddingBottom={2}>
              <pre>{JSON.stringify(cleanOutput(apiResponses[1]), null, 2)}</pre>
            </Box>
          )}
        </Box>
        <Button
          variant='outlined'
          onClick={async () => {
            const newQuote = {
              isoProgram: '91',
              effectiveDt: '2020-12-05',
              contractNumber: '20300',
              niprId: '0005411111',
              controllingStateProvCd: 'ME',
              policyTypeCd: 'HO0001',
              naicCd: '26018',
              isBookTransfer: false,
            }
            const uiQuote = prepareNewQuote(newQuote, apiOptions.userId)
            setUiRequests(uiRequests => {
              const cloned = [...uiRequests]
              cloned[1] = uiQuote
              return cloned
            })
            setApiRequests(apiRequests => {
              const cloned = [...apiRequests]
              cloned[1] = uiQuote
              return cloned
            })
            const { data } = await request({
              url: '/quote',
              method: 'POST',
              baseURL: apiUrl,
              headers: {
                userId: apiOptions.userId,
                transactionId: apiOptions.transactionId,
                Authorization: `bearer ${apiOptions.userId}`,
                'Content-Type': 'application/json',
              },
              data: {
                quote: uiQuote,
                action: 'HOME_GEN_QUOTE_INFO',
                userId: apiOptions.transactionId,
                transactionId: apiOptions.transactionId,
              },
            })
            setUiResponses(uiResponses => {
              const cloned = [...uiResponses]
              cloned[1] = data
              return cloned
            })
            setApiResponses(apiResponses => {
              const cloned = [...apiResponses]
              cloned[1] = data
              return cloned
            })
          }}
        >
          Run example
        </Button>
      </Box>
    </>
  )
}

export default Page
