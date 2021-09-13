import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
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
    overrides: {
        MuiButton: {
            root: {
                fontWeight: 200
            }
        }
    }
});


export default theme