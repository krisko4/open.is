import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Router } from "Router";
import { LoginContextProvider } from './contexts/LoginContext';
import mainTheme from "./themes/MainTheme";



function App() {

    return <>
        <StyledEngineProvider injectFirst>
            <SnackbarProvider maxSnack={3}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}>
                <div className="App">
                    <ThemeProvider theme={mainTheme}>
                        <LoginContextProvider >
                            <Router />
                        </LoginContextProvider >
                    </ThemeProvider>
                </div>
            </SnackbarProvider>
        </StyledEngineProvider>
    </>;
}

export default App;
