import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
      },
    },
  },
})

export default theme
