import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import { ThemeProvider as MaterialUiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

const Frame = ({ children }: { children: ReactNode }) => (
  <MaterialUiThemeProvider theme={theme}>
    <StyledComponentsThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </StyledComponentsThemeProvider>
  </MaterialUiThemeProvider>
)

export default Frame
