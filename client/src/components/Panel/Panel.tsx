import { Backdrop, CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import myAxios from "../../axios/axios";
import { ChosenOptions, PlaceProps, usePanelContext } from "../../contexts/PanelContexts/PanelContext";
import { LeftNavigation } from "./LeftNavigation/LeftNavigation";
import { MainContent } from "./MainContent/MainContent";
import { setPlaces } from '../../store/actions/setPlaces'
import { useLoginContext } from "../../contexts/LoginContext";
import { useHistory } from "react-router-dom";
import { setSelectedOption } from "../../store/actions/setSelectedOption";

export const Panel: FC = () => {

    const [loading, setLoading] = useState(true)
    // const [chosenPlace, setChosenPlace] = useState<PlaceProps | null>(null)
    const { isUserLoggedIn } = useLoginContext()
    const history = useHistory()
    console.log('panel ')
    const dispatch = useDispatch()



    useEffect(() => {
        if (!isUserLoggedIn) {
            history.push('/')
            return
        } (async function () {
            try {
                const response = await myAxios.get('/places', {
                    withCredentials: true,
                    params: {
                        uid: localStorage.getItem('uid')
                    }
                })
                console.log(response.data)
                if (response.data.length === 0) {
                    dispatch(setSelectedOption(ChosenOptions.NO_PLACES))
                    return
                }
                dispatch(setSelectedOption(ChosenOptions.DASHBOARD))
                dispatch(setPlaces(response.data))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div>
            <Grid container direction="column" style={{ height: '100vh', background: 'linear-gradient(45deg, rgba(0,0,0,0) 27%, rgba(24,131,217,1) 100%)' }}>
                {loading ?
                    <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
                        {/* <Backdrop open={loading}> */}
                        <CircularProgress style={{ color: 'white' }} />
                        {/* </Backdrop> */}
                    </Grid> :
                    <Grid container direction="row" style={{ flex: '1 1 auto' }}>
                        <LeftNavigation  />
                        <MainContent  />
                    </Grid>
                }
            </Grid>
        </div>
    )
}