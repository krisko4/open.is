import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
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
import { LoginContextProvider } from './contexts/LoginContext';
import { PanelContextProvider } from './contexts/PanelContexts/PanelContext';
import browserTheme from "./themes/BrowserTheme";
import mainTheme from "./themes/MainTheme";
import panelTheme from "./themes/PanelTheme";







// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }






function App() {



    return <>
        <StyledEngineProvider injectFirst>
            <SnackbarProvider maxSnack={3}>
                <div className="App">
                    <ThemeProvider theme={mainTheme}>
                        <Router>
                            <Switch>
                                <LoginContextProvider >
                                    <Route exact path="/" component={HomePage} />
                                    <Route path="/about" exact component={About} />
                                    <Route path="/contact" exact component={Contact} />
                                    <Route path="/panel">
                                        <ThemeProvider theme={panelTheme}>
                                            <CssBaseline/>
                                            <PanelContextProvider>
                                                <Panel />
                                            </PanelContextProvider>
                                        </ThemeProvider>
                                    </Route>
                                    <Route path="/search">
                                        <ThemeProvider theme={browserTheme}>
                                            <Browser />
                                        </ThemeProvider>
                                    </Route>
                                    <Route path="/confirm/:token" exact component={Confirmation} />
                                    <Route path="/:email/confirm/:token" exact component={EmailChangeConfirmation} />
                                </LoginContextProvider >
                            </Switch>
                        </Router>
                    </ThemeProvider>
                </div>
            </SnackbarProvider>
        </StyledEngineProvider>
    </>;
}

export default App;
