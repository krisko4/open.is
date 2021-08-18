import React, {FC, useState} from "react";
import Header from "./Header";
import {LeftNavigation} from "./LeftNavigation";
import Grid from "@material-ui/core/Grid";
import {MainContent} from "./MainContent/MainContent";
import Footer from "../HomePage/MainPage/Footer";


export const Panel: FC = () => {

    const [selectedOption, setSelectedOption] = useState(0)

    return (
        <div>
            <Grid container direction="column" style={{minHeight: '100vh', background: '#F5F5F5'}}>
            <Header/>
                <Grid container direction="row" style={{flex: '1 1 auto'}}>
                    <LeftNavigation/>
                    <MainContent selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                </Grid>
            </Grid>
       <Footer/> 
        </div>
    )
}