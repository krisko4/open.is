import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { FC, useEffect, useState } from "react";
import myAxios from "../../axios/axios";
import { ChosenOptions, usePanelContext } from "../../contexts/PanelContexts/PanelContext";
import { LeftNavigation } from "./LeftNavigation";
import { MainContent } from "./MainContent/MainContent";


export const Panel: FC = () => {

    const { setPlaces, setSelectedOption } = usePanelContext()
    const [loading, setLoading] = useState(true)
    const [chosenPlace, setChosenPlace] = useState(null)
    console.log('yo')

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
                        <CircularProgress style={{ color: 'white' }} />
                    </Grid> :
                    <Grid container direction="row" style={{ flex: '1 1 auto' }}>
                        <LeftNavigation setChosenPlace={setChosenPlace} />
                        <MainContent chosenPlace={chosenPlace} />
                    </Grid>
                }
            </Grid>
        </div>
    )
}