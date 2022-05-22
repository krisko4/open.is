import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { Router } from 'routes/Router';
import { LoginContextProvider } from './contexts/LoginContext';
import mainTheme from './themes/MainTheme';
import { Notification } from 'components/Notifications/Notification';

function App() {
  // useEffect(() => {
  //   requestToken();
  // }, []);
  return (
    <StyledEngineProvider injectFirst>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      >
        <div className="App">
          <ThemeProvider theme={mainTheme}>
            <LoginContextProvider>
              <Router />
            </LoginContextProvider>
          </ThemeProvider>
        </div>
      </SnackbarProvider>
    </StyledEngineProvider>
  );
}

export default App;
