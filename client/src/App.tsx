import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { authAxios } from "./axios/axios";
import { Confirmation } from './components/Auth/Confirmation';
import Browser from "./components/Browser/Browser";
import { About } from "./components/HomePage/About/About";
import { Contact } from './components/HomePage/Contact/Contact'
import { PageSelector } from "./components/PageSelector";
import theme from './components/Theme';
import { PageContextProvider } from "./contexts/PageContext";
import { login } from "./store/actions/login";
import { logout } from "./store/actions/logout";
import { setEmail } from "./store/actions/setEmail";
import { EmailChangeConfirmation } from './components/Auth/EmailChangeConfirmation'
import { useAuthSelector } from './store/selectors/AuthSelector';
import { Panel } from './components/Panel/Panel';
import HomePage from './components/HomePage/MainPage/HomePage';
import { LoginContextProvider } from './contexts/LoginContext'



function App() {


    return <>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className="App">
                        <Router>
                            <Switch>
                                <LoginContextProvider >
                                    <Route exact path="/" component={HomePage} />
                                    <Route path="/about" exact component={About} />
                                    <Route path="/contact" exact component={Contact} />
                                    <Route path="/panel">
                                        <Panel />
                                    </Route>
                                    <Route path="/search" component={Browser} />
                                    <Route path="/confirm/:token" exact component={Confirmation} />
                                    <Route path="/:email/confirm/:token" exact component={EmailChangeConfirmation} />
                                </LoginContextProvider >
                            </Switch>
                        </Router>
                    </div>
                </MuiPickersUtilsProvider>
            </SnackbarProvider>
        </ThemeProvider>
    </>
}

export default App;
