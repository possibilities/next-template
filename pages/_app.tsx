import React, { useEffect } from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import { ThemeProvider as MaterialUiThemeProvider } from '@material-ui/core/styles'
import theme from '../modules/theme'
import { AppProps } from 'next/app'

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      const parentElement = jssStyles.parentElement as HTMLElement
      parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <title>Next Template</title>
      </Head>
      <MaterialUiThemeProvider theme={theme}>
        <CssBaseline />
        <Box padding={2}>
          <Component {...pageProps} />
        </Box>
      </MaterialUiThemeProvider>
    </>
  )
}

export default App
