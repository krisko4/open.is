import { createTheme, ThemeProvider } from '@mui/material';
import { FC, useMemo } from 'react';
import { useColorMode } from '../contexts/ColorModeContext';


export const BrowserTheme: FC = ({ children }) => {
  const { mode } = useColorMode();
  const theme = useMemo(() => (
    createTheme({
      components:{
        MuiCard: {
          styleOverrides: {
            root: {
              // boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
              // boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset'
              // boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
              // borderRadius: '20px'
              // boxShadow : mode === 'light' ?
              // '20px 20px 60px #cad0d4,-20px -20px 60px #ffffff' : '20px 20px 60px #2a2929,-20px -20px 60px #383737',
              // background: mode== 'light' ? '#eef5f9' : '#313030',
              // borderRadius: '20px'
            },
          },
        },
      },
      palette: {
        mode: mode,
        background: {
          default: mode === 'light' ? '#fafafa' : '#121212',
        },
      },
    })

  ), [mode]);

  return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>

  );
};
