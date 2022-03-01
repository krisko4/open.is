import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useLoginContext } from "../../contexts/LoginContext";
import { getPlacesByUserId } from "../../requests/PlaceRequests";
import { setPlaces } from '../../store/actions/setPlaces';
import { LeftNavigation } from "./LeftNavigation/LeftNavigation";
import { MainContent } from "./MainContent/MainContent";


export const Panel: FC = () => {

    const [loading, setLoading] = useState(true)
    const { userData } = useLoginContext()
    const history = useHistory()
    const match = useRouteMatch()
    const location = useLocation()
    const dispatch = useDispatch()


    useEffect(() => {
        (async function () {
            try {
                const uid: string = localStorage.getItem('uid') as string
                if (!uid) {
                    history.push('/')
                    return
                }
                const places = await getPlacesByUserId(uid)
                dispatch(setPlaces(places))
                if (places.length === 0) {
                    return
                }
                if (location.pathname === '/panel/') {
                    history.push('dashboard')
                    return
                }
                if (location.pathname === '/panel') {
                    history.push(`${match.url}/dashboard`)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <Grid
            sx={{
                height: '100vh',
            }}
            container direction="column">
            {loading ?
                <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                    <CircularProgress size={100} />
                </Grid> :
                <Grid container direction="row" sx={{ flex: '1 1 auto' }}>
                    <LeftNavigation />
                    <MainContent />
                </Grid>
            }
        </Grid>
    );
}