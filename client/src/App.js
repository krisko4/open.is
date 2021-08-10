import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import theme from './components/Theme'
import HomePage from "./components/HomePage/MainPage/HomePage";
import {Route, BrowserRouter as Router} from "react-router-dom";
import About from "./components/HomePage/About";
import Contact from "./components/HomePage/Contact";
import Browser from "./components/Browser/Browser";
import {SnackbarProvider} from "notistack";
import {PageSelector} from "./components/PageSelector";
import PageContextProvider from "./contexts/PageContext";





function App() {



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
