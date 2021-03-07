import React, { ReactNode } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '../components/Link'

const Page = (): ReactNode => (
  <>
    <Box paddingBottom={2}>
      <Typography variant='h2'>home</Typography>
    </Box>
    <Link href='/widgets'>Widget API</Link>
  </>
)

export default Page
