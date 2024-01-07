import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: teal[700],
          secondary: deepOrange[700]
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: cyan[700],
          secondary: orange[700]
        }
      }
    }
  },
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  }
})

export default theme
