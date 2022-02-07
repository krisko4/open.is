import { createTheme, adaptV4Theme } from '@mui/material/styles';



const theme = createTheme((adaptV4Theme({
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
        }
    },
})));


export default theme