import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#67A22D',
      contrastText: '#fff',
    },
    secondary: {
      main: '#EDF2E8',
      contrastText: '#141C0D',
    },
    text: {
      primary: '#141C0D',
      secondary: '#758269',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Newsreader", "serif"',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#141C0D',
    },
    h2: {
      fontWeight: 600,
      color: '#141C0D',
    },
    body1: {
      color: '#758269',
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      color: '#FAFCF7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none' },
      },
    },
  },
});
