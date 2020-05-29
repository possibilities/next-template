import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
      },
    },
  },
})

export default theme
