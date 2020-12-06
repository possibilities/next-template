import React, { ReactElement, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import RunIcon from '@material-ui/icons/DirectionsRun'
import { v4 as uuid } from 'uuid'
import request from 'axios'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import traverse from 'traverse'
import first from 'lodash/first'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const apiUrl = 'http://bff-quote-app.itgcloud.vtmutins.com/v1/bff-qa-portal'

const apiQuoteFromUiQuote = (x: unknown) => x
const uiQuoteFromApiQuote = (x: unknown) => x

const apiOptions = {
  apiUrl,
  userId: 'alamell',
  transactionId: uuid(),
}

const cleanOutput = (obj: unknown) =>
  traverse(obj).map(function (value) {
    if (value === null) this.delete()
    if (value === undefined) this.delete()
    // if (Array.isArray(value || isObject(value)) && isEmpty(value)) {
    //   this.delete()
    // }
    if (first(this.path) === 'attachments') this.delete()
    if (this.key?.startsWith('systemOfOrigin')) this.delete()
    if (this.key === 'runDt') this.delete()
    if (this.key === 'userId') this.delete()
    if (this.key === 'transactionId') this.delete()
    if (this.key === 'createdDttime') this.delete()
    if (this.key === 'createdBy') this.delete()
    if (this.key === 'updatedDttime') this.delete()
    if (this.key === 'updatedBy') this.delete()
  })

const Example = ({
  name,
  onRun,
  uiRequest,
  uiResponse,
  apiRequest,
  apiResponse,
}: {
  name: string
  onRun: () => void
  uiRequest: unknown
  uiResponse: unknown
  apiRequest: unknown
  apiResponse: unknown
}): ReactElement => {
  return (
    <>
      <Box paddingBottom={4}>
        <Box paddingBottom={2} display='flex' alignItems='center'>
          <Box paddingRight={2}>
            <Typography variant='h1'>{name}</Typography>
          </Box>
          <IconButton onClick={onRun}>
            <RunIcon />
          </IconButton>
        </Box>
        <Box display='flex'>
          {uiRequest && (
            <Box paddingBottom={2} paddingRight={4}>
              <Typography>ui request</Typography>
              <SyntaxHighlighter language='json' style={codeStyle}>
                {JSON.stringify(cleanOutput(uiRequest), null, 2)}
              </SyntaxHighlighter>
            </Box>
          )}
          {apiRequest && (
            <Box paddingBottom={2} paddingRight={4}>
              <Typography>api request</Typography>
              <SyntaxHighlighter language='json' style={codeStyle}>
                {JSON.stringify(cleanOutput(apiRequest), null, 2)}
              </SyntaxHighlighter>
            </Box>
          )}
          {apiResponse && (
            <Box paddingBottom={2} paddingRight={4}>
              <Typography>api response</Typography>
              <SyntaxHighlighter language='json' style={codeStyle}>
                {JSON.stringify(cleanOutput(apiResponse), null, 2)}
              </SyntaxHighlighter>
            </Box>
          )}
          {uiResponse && (
            <Box paddingBottom={2} paddingRight={4}>
              <Typography>ui response</Typography>
              <SyntaxHighlighter language='json' style={codeStyle}>
                {JSON.stringify(cleanOutput(uiResponse), null, 2)}
              </SyntaxHighlighter>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

const Page = (): ReactElement => {
  const [uiRequests, setUiRequests] = useState<unknown[]>([])
  const [uiResponses, setUiResponses] = useState<unknown[]>([])
  const [apiRequests, setApiRequests] = useState<unknown[]>([])
  const [apiResponses, setApiResponses] = useState<unknown[]>([])

  const examples = [
    {
      name: 'Create quote | General information',
      run: async () => {
        const newStaticQuoteProperties = {
          lobCd: 'HOME',
          policyTerm: 1,
          policyTermUnit: 'YR',
          quoteStatus: 'QuoteIncomplete',
          systemOfOriginVendor: 'Vermont Mutual',
          systemOfOriginProduct: 'FrontEnd',
          systemOfOriginVersion: '2.1',
        }

        const newQuoteProperties = {
          createdBy: apiOptions.userId,
          updatedBy: apiOptions.userId,
          ...newStaticQuoteProperties,
        }

        const uiQuote = {
          isoProgram: '91',
          effectiveDt: '2020-12-05',
          contractNumber: '20300',
          niprId: '0005411111',
          controllingStateProvCd: 'ME',
          policyTypeCd: 'HO0001',
          naicCd: '26018',
          isBookTransfer: false,
          ...newQuoteProperties,
        }

        const apiQuote = apiQuoteFromUiQuote(uiQuote)

        setUiRequests(uiRequests => {
          const cloned = [...uiRequests]
          cloned[0] = uiQuote
          return cloned
        })

        setApiRequests(apiRequests => {
          const cloned = [...apiRequests]
          cloned[0] = apiQuote
          return cloned
        })

        const { data: apiQuoteResponse } = await request({
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
          cloned[0] = apiQuoteResponse
          return cloned
        })

        const uiQuoteResponse = uiQuoteFromApiQuote(apiQuoteResponse)

        setApiResponses(apiResponses => {
          const cloned = [...apiResponses]
          cloned[0] = apiQuoteResponse
          return cloned
        })
      },
    },
  ]
  return (
    <>
      {examples.map((example, position) => (
        <Example
          key={position}
          name={example.name}
          onRun={example.run}
          uiRequest={uiRequests[position]}
          uiResponse={uiResponses[position]}
          apiRequest={apiRequests[position]}
          apiResponse={apiResponses[position]}
        />
      ))}
    </>
  )
}

export default Page
