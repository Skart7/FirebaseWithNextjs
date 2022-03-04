import { createTheme } from '@mui/material/styles'

const mode = {
  dark: true
}

export const theme = createTheme({
  palette: {
    mode: mode.dark ? "dark" : "light",
    ...(mode.dark ? {
      primary: {
        main: '#3e8d65',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9ea9b1',
        contrastText: '#fff',
      },
      background: {
        paper: "#1e1f1e",
        default: "#242628",
      },
      text: {
        primary: "#fff",
        secondary: "#fff",
      },
    } : {
      primary: {
        main: '#3f51b5',
        contrastText: '#fff',
      },
      secondary: {
        main: '#2a3eb1',
        contrastText: '#fff',
      },
      background: {
        paper: "#fff",
        default: "#edecec",
      },
      text: {
        primary: "#000",
        secondary: "#000",
      },
    })
  },
  ...(mode.dark ? {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "",
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                backgroundColor: "#1e1f1e",
                width: 6,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: '#3e8d65',
              minHeight: 24,
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: '#9ea9b1',
            },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
              backgroundColor: '#9ea9b1',
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#9ea9b1',
            },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: "#1e1f1e",
            }
          },
        },
      },
    },
  } : {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "",
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                backgroundColor: "#fff",
                width: 6,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: '#32658f',
              minHeight: 24,
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: '#121111',
            },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
              backgroundColor: '#121111',
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#121111',
            },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: "#fff",
            }
          },
        },
      },
    },
  }),
  typography: {
    h1: {
      fontWeight: 700,
      fontFamily: 'Roboto, sans-serif',
      fontSize: '40px'
    },
    h2: {
      fontWeight: 700,
      fontFamily: 'Roboto, sans-serif',
      fontSize: '35px'
    },
    h3: {
      fontWeight: 700,
      fontFamily: 'Roboto, sans-serif',
      fontSize: '30px'
    },
    h4: {
      fontWeight: 700,
      fontFamily: 'Roboto, sans-serif',
      fontSize: '25px'
    },
    h5: {
      fontWeight: 700,
      fontFamily: 'Roboto, sans-serif',
      fontSize: '20px'
    },
    h6: {
      fontWeight: 700,
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px'
    }
  }
})
export const defaultStyles = {
  layoutPage: {minHeight: '100vh', display: 'flex', flexDirection: 'column'},
  container: {flexGrow: 1, my: 10},
}