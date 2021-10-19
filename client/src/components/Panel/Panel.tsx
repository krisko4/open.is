import { CircularProgress, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { roundToNearestMinutes } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import myAxios from "../../axios/axios";
import { ChosenOptions, usePanelContext } from "../../contexts/PanelContext";
import Footer from "../HomePage/MainPage/Footer";
import Header from "./Header";
import { LeftNavigation } from "./LeftNavigation";
import { MainContent } from "./MainContent/MainContent";

const useStyles = makeStyles({
    footer: {
        background: 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(24,131,217,1) 47%);'
    },
    text: {
        color: 'white',
        marginBottom: 10,
        fontStyle: 'italic'
    },
})

export const Panel: FC = () => {

    const classes = useStyles()

    const { setPlaces, setSelectedOption } = usePanelContext()
    const [loading, setLoading] = useState(true)
   

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
                    setSelectedOption(ChosenOptions.NO_PLACES)
                    return
                }
                setSelectedOption(ChosenOptions.DASHBOARD)
                console.log(response.data)
                // response.data.forEach((place: any) => place.img = `${process.env.REACT_APP_BASE_URL}/images/places/${place.img}`)
                setPlaces(response.data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div>
            <Grid container direction="column" style={{ height: '100vh', background: 'linear-gradient(45deg, rgba(0,0,0,0) 27%, rgba(24,131,217,1) 100%)' }}>
                {loading ?
                    <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
                        <CircularProgress style={{color: 'white'}} />
                    </Grid> :
                    <Grid container direction="row" style={{ flex: '1 1 auto' }}>
                        <LeftNavigation />
                        <MainContent />
                    </Grid>
                }
            </Grid>
            {/* <Footer classes={classes} /> */}
        </div>
    )
}