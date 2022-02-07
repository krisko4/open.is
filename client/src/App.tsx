import { StyledEngineProvider, Theme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Confirmation } from './components/Auth/Confirmation';
import { EmailChangeConfirmation } from './components/Auth/EmailChangeConfirmation';
import Browser from "./components/Browser/Browser";
import { About } from "./components/HomePage/About/About";
import { Contact } from './components/HomePage/Contact/Contact';
import HomePage from './components/HomePage/MainPage/HomePage';
import { Panel } from './components/Panel/Panel';
import theme from './components/Theme';
import { LoginContextProvider } from './contexts/LoginContext';
import { PanelContextProvider } from './contexts/PanelContexts/PanelContext';







declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}







function App() {



    return <>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                        <div className="App">
                            <Router>
                                <Switch>
                                    <LoginContextProvider >
                                        <Route exact path="/" component={HomePage} />
                                        <Route path="/about" exact component={About} />
                                        <Route path="/contact" exact component={Contact} />
                                        <Route path="/panel">
                                            <PanelContextProvider>
                                                <Panel />
                                            </PanelContextProvider>
                                        </Route>
                                        <Route path="/search" component={Browser} />
                                        <Route path="/confirm/:token" exact component={Confirmation} />
                                        <Route path="/:email/confirm/:token" exact component={EmailChangeConfirmation} />
                                    </LoginContextProvider >
                                </Switch>
                            </Router>
                        </div>
                </SnackbarProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </>;
}

export default App;
