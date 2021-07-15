import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#2196f3',
            dark: '#4169E1',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#ba000d',
            dark: '#A52A2A',
            contrastText: '#fff',
        },
        transparent: {
            main: 'transparent'
        }
    },
    overrides: {
        MuiButton: {
           root: {
               //fontSize: 20,

           }
        }
    }
});


export default theme