import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { authAxios } from "./axios/axios";
import Browser from "./components/Browser/Browser";
import { About } from "./components/HomePage/About";
import { Contact } from "./components/HomePage/Contact";
import { PageSelector } from "./components/PageSelector";
import theme from './components/Theme';
import { PageContextProvider } from "./contexts/PageContext";
import { login } from "./store/actions/login";
import { logout } from "./store/actions/logout";
import { setEmail } from "./store/actions/setEmail";





function App() {

    const dispatch = useDispatch()
    

    useEffect(() => {
        const authenticate = async () => {
            try {
                await authAxios.get('/auth', { withCredentials: true })
                dispatch(login())
            } catch (err) {
                await authAxios.get('/logout', { withCredentials: true })
                dispatch(logout())
                dispatch(setEmail(''))
            }
        }
        authenticate()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
            <Router>
        <div className="App">
            <PageContextProvider>
                <Route exact path="/" component={PageSelector}/>
            </PageContextProvider>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/search" component={Browser}/>
        </div>
            </Router>
            </SnackbarProvider>
        </ThemeProvider>

    );
}

export default App;
