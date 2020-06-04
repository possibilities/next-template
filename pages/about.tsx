import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '../components/Link'
import { Stack, Box, Columns, Column } from 'mui-primitives'

const Page = () => (
  <Box padding={2}>
    <Stack space={2}>
      <Columns alignY='center'>
        <Column width='column'>
          <Box paddingRight={2}>
            <img src='/logo.png' width={40} height={40} />
          </Box>
        </Column>
        <Column>
          <Typography variant='h1' gutterBottom>
            next template
          </Typography>
        </Column>
      </Columns>
      <Typography variant='h2' gutterBottom>
        about
      </Typography>
      <Columns alignY='center'>
        <Column width='column'>
          <Link href='/'>home</Link>
        </Column>
        <Column width='column'>
          <Box paddingX={1}>|</Box>
        </Column>
        <Column>
          <Link href='/about'>about</Link>
        </Column>
      </Columns>
    </Stack>
  </Box>
)

export default Page
