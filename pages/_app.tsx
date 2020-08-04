import React, { useEffect, ReactNode } from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MaterialUiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import theme from '../modules/theme'
import { AppProps } from 'next/app'
import { Stack, Box, Columns, Column } from 'mui-primitives'
import Link from '../components/Link'
import NakedLink from 'next/link'

const logoWidthAndHeight = 40

const Layout = ({ children }: { children: ReactNode }) => (
  <Box padding={2}>
    <Stack space={2}>
      <NakedLink href='/'>
        <a style={{ lineHeight: 0 }}>
          <img
            src='/logo.png'
            width={logoWidthAndHeight}
            height={logoWidthAndHeight}
          />
        </a>
      </NakedLink>
      <Columns space={1}>
        <Column width='content'>
          <Link href='/'>home</Link>
        </Column>
        <Column width='content'>|</Column>
        <Column>
          <Link href='/about'>about</Link>
        </Column>
      </Columns>
      {children}
    </Stack>
  </Box>
)

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
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyledComponentsThemeProvider>
      </MaterialUiThemeProvider>
    </>
  )
}

export default App
