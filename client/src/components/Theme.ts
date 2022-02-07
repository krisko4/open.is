import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}
declare module '@mui/material/styles' {

    interface Palette {
        neutral: Palette['primary'],
        panelBackground: Palette['primary'],
        panelCard: Palette['primary']
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'],
        panelCard: PaletteOptions['primary'],
        panelBackground: PaletteOptions['primary'],
    }

    interface PaletteColor {
        panelBackground?: string;
    }
    interface SimplePaletteColorOptions {
        panelBackground?: string;
    }
}

const theme = createTheme({
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
    },
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
        neutral: {
            main: 'purple',
            contrastText: '#fff'
        },
        panelBackground: {
            light: '',
            main: '#0d1117',
            dark: '#0d1117'
        },
        panelCard: {
            light: '',
            main: '#18202b',
            dark: ''
        }

    },
});


export default theme