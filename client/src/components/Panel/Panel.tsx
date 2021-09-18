import Grid from "@material-ui/core/Grid";
import React, { FC, useEffect } from "react";
import myAxios from "../../axios/axios";
import { ChosenOptions, usePanelContext } from "../../contexts/PanelContext";
import Footer from "../HomePage/MainPage/Footer";
import Header from "./Header";
import { LeftNavigation } from "./LeftNavigation";
import { MainContent } from "./MainContent/MainContent";



export const Panel: FC = () => {


    const {setPlaces, setSelectedOption} = usePanelContext()

    useEffect(() => {
        (async function () {
            try {
                const response = await myAxios.get('/places', {
                    withCredentials: true,
                    params: {
                        uid: localStorage.getItem('uid')
                    }
                })
                if (response.data.length === 0) {
                    console.log('no places found')
                    setSelectedOption(ChosenOptions.NO_PLACES)
                    return
                }
                setSelectedOption(ChosenOptions.DASHBOARD)
                console.log(response.data)
                    response.data.map((place : any) => {
                    place.img = `${process.env.REACT_APP_BASE_URL}/images/places/${place.img}`
                    return place
                })
                setPlaces(response.data)
            }
            catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (
        <div>
            <Grid container direction="column" style={{ minHeight: '100vh', background: '#F5F5F5' }}>
                <Header />
                <Grid container direction="row" style={{ flex: '1 1 auto' }}>
                    <LeftNavigation/>
                    <MainContent/>
                </Grid>
            </Grid>
            {/* <Footer backgroundColor='#2196f3' /> */}
        </div>
    )
}