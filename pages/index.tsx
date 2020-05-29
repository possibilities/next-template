import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Page = () => (
  <Box padding={2} display='flex' alignItems='center'>
    <img src='/logo.png' width={40} height={40} />
    <Box paddingLeft={2}>
      <Typography variant='h1' gutterBottom>
        Next Template
      </Typography>
    </Box>
  </Box>
)

export default Page
