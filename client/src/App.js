import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Browser from "./components/Browser/Browser";
import {About} from "./components/HomePage/About";
import {Contact} from "./components/HomePage/Contact";
import { PageSelector } from "./components/PageSelector";
import theme from './components/Theme';
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
