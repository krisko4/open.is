import {createMuiTheme} from '@material-ui/core/styles';

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
            main: '#ff5252',
            dark: '#A52A2A',
            contrastText: '#fff',
        },
        jakisTam: {
            main: '#6A5ACD',
            contrastText: '#fff',
        },
        transparent: {
            main: 'transparent'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                fontWeight: 700
            }
        }
    }
});


export default theme