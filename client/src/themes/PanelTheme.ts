import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// declare module '@mui/material/Button' {
//     interface ButtonPropsColorOverrides {
//         neutral: true;
//     }
// }
// declare module '@mui/material/styles' {

//     interface Palette {
//         neutral: Palette['primary'],
//         panelBackground: Palette['primary'],
//         panelCard: Palette['primary']
//     }

//     interface PaletteOptions {
//         neutral: PaletteOptions['primary'],
//         panelCard: PaletteOptions['primary'],
//         panelBackground: PaletteOptions['primary'],
//     }

//     interface PaletteColor {
//         panelBackground?: string;
//     }
//     interface SimplePaletteColorOptions {
//         panelBackground?: string;
//     }
// }
// const getDesignTokens = (mode: PaletteMode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // palette values for light mode
//           primary: '#2196f3',
//           divider: amber[200],
//           text: {
//             primary: grey[900],
//             secondary: grey[800],
//           },
//         }
//       : {
//           // palette values for dark mode
//           primary: deepOrange,
//           divider: deepOrange[700],
//           background: {
//             default: deepOrange[900],
//             paper: deepOrange[900],
//           },
//           text: {
//             primary: '#fff',
//             secondary: grey[500],
//           },
//         }),
//   },
// });

const panelTheme = createTheme({
     
    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         containedPrimary: '#2196f3'
        //     }
        // }
    },
    palette: {
        mode: 'dark',
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
            default: '#0d1117',
            paper: '#18202b'
        },
        text: {
            primary: '#fff',
            secondary: 'lightgrey'
        },
        divider: '#fff',
        // action: {
        //     disabledBackground: '#18202b',
        //     disabled: '#2F3640'
        // }
        
        

    },
});


export default panelTheme