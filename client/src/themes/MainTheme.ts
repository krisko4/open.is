import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  // components: {
  //     MuiButton: {
  //         styleOverrides: {
  //             root: {
  //                 fontWeight: 'bold'
  //             }
  //         }
  //     }
  // },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#2196f3',
      dark: '#4169E1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff5252',
      dark: '#A52A2A',
      contrastText: '#fff',
    },
    background: {
      default: 'red',
    },
  },
});

export default mainTheme;
