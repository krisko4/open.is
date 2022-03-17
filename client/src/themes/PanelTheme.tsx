import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, useMemo } from 'react';
import { useColorMode } from '../contexts/ColorModeContext';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
declare module '@mui/material/styles' {

  interface Palette {
    layout?: Palette['primary'],
    navi?: Palette['primary'],
  }

  interface PaletteOptions {
    layout?: PaletteOptions['primary'],
    navi?: PaletteOptions['primary'],
  }

  interface PaletteColor {
    layout?: string;
    navi?: string,
  }
  interface SimplePaletteColorOptions {
    layout?: string;
    navi?: string,
  }
}


export const PanelTheme: FC = ({ children }) => {
  const { mode } = useColorMode();

  const theme = useMemo(
    () => createTheme({
      components:{
        MuiCard: {
          styleOverrides: {
            root: {
              // boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
              // boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset'
              boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
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
          default: mode === 'light' ? '#eef5f9' :  '#121212',
          // paper: mode === 'light' ? '#e4e5f1' : '#121212'
        },
        navi: {
          main: mode === 'light' ? 'white' : 'background.paper',
        },
        // primary: {
        //     light: '#757ce8',
        //     main: '#2196f3',
        //     dark: '#4169E1',
        //     contrastText: '#fff',
        // },
        // secondary: {
        //     light: '#ff7961',
        //     main: '#ff5252',
        //     dark: '#A52A2A',
        //     contrastText: '#fff',
        // },
        // background: {
        //     default: '#0d1117',
        //     paper: '#0d1117'
        //     // default :'081A36',
        //     // paper: '#061730'
        // },
        // text: {
        //     primary: '#fff',
        //     secondary: 'lightgrey'
        // },
        // divider: '#fff',
        // action: {
        //     disabledBackground: '#18202b',
        //     disabled: '#2F3640'
        // },
      },
    }), [mode]);

  return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
  );


};


// const usePanelTheme = (mode: any) => {
//     return createTheme({
//         components: {
//             // MuiButton: {
//             //     styleOverrides: {
//             //         containedPrimary: '#2196f3'
//             //     }
//             // }
//         },
//         palette: {
//             mode: mode,
//             primary: {
//                 light: '#757ce8',
//                 main: '#2196f3',
//                 dark: '#4169E1',
//                 contrastText: '#fff',
//             },
//             secondary: {
//                 light: '#ff7961',
//                 main: '#ff5252',
//                 dark: '#A52A2A',
//                 contrastText: '#fff',
//             },
//             background: {
//                 default: '#0d1117',
//                 paper: '#0d1117'
//                 // default :'081A36',
//                 // paper: '#061730'
//             },
//             text: {
//                 primary: '#fff',
//                 secondary: 'lightgrey'
//             },
//             divider: '#fff',
//             // action: {
//             //     disabledBackground: '#18202b',
//             //     disabled: '#2F3640'
//             // }



//         },
//     });
// }


// export default usePanelTheme