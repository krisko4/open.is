import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useLoginContext } from "../../contexts/LoginContext";
import { getPlacesByUserId } from "../../requests/PlaceRequests";
import { setPlaces } from '../../store/actions/setPlaces';
import { LeftNavigation } from "./LeftNavigation/LeftNavigation";
import { MainContent } from "./MainContent/MainContent";


const useStyles = makeStyles({
    panel: {
        height: '100vh',
        // background: 'linear-gradient(20deg, rgba(0,0,0,0) 27%, rgba(24,131,217,1) 100%)',
        background: '#0d1117',
    }
})

export const Panel: FC = () => {

    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const { isUserLoggedIn } = useLoginContext()
    const history = useHistory()
    const match = useRouteMatch()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isUserLoggedIn) {
            history.push('/')
            return
        } (async function () {
            try {
                const uid : string = localStorage.getItem('uid') as string
                const places = await getPlacesByUserId(uid)
                dispatch(setPlaces(places))
                if (places.length === 0) {
                    return
                }
                history.push(`${match.url}/dashboard`)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div>
            <Grid container direction="column" className={classes.panel}>
                {loading ?
                    <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
                        <CircularProgress style={{ color: 'white' }} />
                    </Grid> :
                    <Grid container direction="row" style={{ flex: '1 1 auto' }}>
                        <LeftNavigation />
                        <MainContent />
                    </Grid>
                }
            </Grid>
        </div>
    )
}