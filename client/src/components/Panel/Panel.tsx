import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import myAxios from "../../axios/axios";
import { useLoginContext } from "../../contexts/LoginContext";
import { setPlaces } from '../../store/actions/setPlaces';
import { LeftNavigation } from "./LeftNavigation/LeftNavigation";
import { MainContent } from "./MainContent/MainContent";

export const Panel: FC = () => {

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
                const response = await myAxios.get('/places', {
                    withCredentials: true,
                    params: {
                        uid: localStorage.getItem('uid')
                    }
                })
                console.log(response.data)
                dispatch(setPlaces(response.data))
                if (response.data.length === 0) {
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
            <Grid container direction="column" style={{ height: '100vh', background: 'linear-gradient(45deg, rgba(0,0,0,0) 27%, rgba(24,131,217,1) 100%)' }}>
                {loading ?
                    <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
                        <CircularProgress style={{ color: 'white' }} />
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