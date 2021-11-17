import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
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



function App() {

    const dispatch = useDispatch()
    const isUserLoggedIn = useAuthSelector()


    useEffect(() => {
        const authenticate = async () => {
            try {
                await authAxios.get('/auth', { withCredentials: true })
                dispatch(login())
            } catch (err) {
                if (isUserLoggedIn) {
                    await authAxios.get('/logout', { withCredentials: true })
                    localStorage.removeItem('uid')
                    localStorage.removeItem('fullName')
                    localStorage.removeItem('email')
                    localStorage.removeItem('img')
                    dispatch(logout())
                    dispatch(setEmail(''))
                }
            }
        }
        authenticate()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Router>
                        <div className="App">
                            <PageContextProvider>
                                <Route exact path="/" component={PageSelector} />
                                <Route path="/about" exact component={About} />
                                <Route path="/contact" exact component={Contact} />
                            </PageContextProvider>
                            <Route path="/search" component={Browser} />
                            <Route path="/confirm/:token" exact component={Confirmation} />
                            <Route path="/:email/confirm/:token" exact component={EmailChangeConfirmation} />

                        </div>
                    </Router>
                </MuiPickersUtilsProvider>
            </SnackbarProvider>
        </ThemeProvider>

    );
}

export default App;
