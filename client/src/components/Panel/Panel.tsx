import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setPlaces } from "redux-toolkit/slices/placesSlice";
import { useLoginContext } from "../../contexts/LoginContext";
import { useAppDispatch } from "../../redux-toolkit/hooks";
import { getPlacesByUserId } from "../../requests/PlaceRequests";
import { LeftNavigation } from "./LeftNavigation/LeftNavigation";
import { MainContent } from "./MainContent/MainContent";


export const Panel: FC = () => {

    const [loading, setLoading] = useState(true)
    const { userData } = useLoginContext()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()



    useEffect(() => {
        (async function () {
            try {
                const uid: string = localStorage.getItem('uid') as string
                if (!uid) {
                    navigate('/')
                    return
                }
                console.log(location)
                const places = await getPlacesByUserId(uid)
                dispatch(setPlaces(places))
                // navigate('dashboard')
                // if (places.length === 0) {
                //     return
                // }
                // if (location.pathname === '/panel/') {
                //     navigate('dashboard')
                //     return
                // }
                // if (location.pathname === '/panel') {
                //     navigate(`dashboard`)
                // }
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