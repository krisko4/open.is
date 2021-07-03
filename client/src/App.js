import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import theme from './components/HomePage/Theme'
import HomePage from "./components/HomePage/MainPage/HomePage";
import {Route, BrowserRouter as Router} from "react-router-dom";
import About from "./components/HomePage/About";
import Contact from "./components/HomePage/Contact";
import Browser from "./components/Browser/Browser";



function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
        <div className="App">
            <Route exact path="/" component={HomePage}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/search" component={Browser}/>
        </div>
            </Router>
        </ThemeProvider>

    );
}

export default App;
