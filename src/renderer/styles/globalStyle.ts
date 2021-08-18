import { createTheme } from '@material-ui/core/styles';

export default createTheme({
  palette: {
    type: 'dark',
    common: {
      black: '#3B4252',
      white: '#E5E9F0',
    },
    primary: {
      light: '#434C5E',
      main: '#3B4252',
      dark: '#2E3440',
    },
    secondary: {
      light: '#D8DEE9',
      main: '#E5E9F0',
      dark: '#ECEFF4',
    },
    error: {
      light: '#D08770',
      main: '#BF616A',
      dark: '#BF616A',
    },
    warning: {
      light: '#EBCB8B',
      main: '#EBCB8B',
      dark: '#EBCB8B',
    },
    info: {
      light: '#88C0D0',
      main: '#81A1C1',
      dark: '#5E81AC',
    },
    success: {
      light: '#8FBCBB',
      main: '#A3BE8C',
      dark: '#A3BE8C',
    },
    background: {
      paper: '#3B4252',
      default: '#434C5E',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    allVariants: {
      color: '#ECEFF4',
    },
  },
});
