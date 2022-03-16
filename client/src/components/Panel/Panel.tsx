import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPlacesByUserId, useGetPlacesByUserIdQuery } from "redux-toolkit/api/placesApi";
import { setPlaces } from "redux-toolkit/slices/placesSlice";
import { useLoginContext } from "../../contexts/LoginContext";
import { useAppDispatch } from "../../redux-toolkit/hooks";
import { LeftNavigation } from "./LeftNavigation/LeftNavigation";
import { MainContent } from "./MainContent/MainContent";


export const Panel: FC = () => {

    const { isFetching, data, isSuccess} = useGetPlacesByUserId()

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setPlaces(data))
        }
    }, [isSuccess])

    useEffect(() => {
        const uid: string = localStorage.getItem('uid') as string
        if (!uid) {
            navigate('/')
            return
        }
    }, [])

    // useEffect(() => {
    //     (async function () {
    //         try {
    //             const uid: string = localStorage.getItem('uid') as string
    //             if (!uid) {
    //                 navigate('/')
    //                 return
    //             }
    //             console.log(location)
    //             const places = await getPlacesByUserId(uid)
    //             dispatch(setPlaces(places))
    //             // navigate('dashboard')
    //             // if (places.length === 0) {
    //             //     return
    //             // }
    //             // if (location.pathname === '/panel/') {
    //             //     navigate('dashboard')
    //             //     return
    //             // }
    //             // if (location.pathname === '/panel') {
    //             //     navigate(`dashboard`)
    //             // }
    //         } catch (err) {
    //             console.log(err)
    //         } finally {
    //             setLoading(false)
    //         }
    //     })()
    // }, [])

    return (
        <Grid
            sx={{
                height: '100vh',
            }}
            container direction="column">
            {isFetching ?
                <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                    <CircularProgress disableShrink />
                </Grid> :
                <Grid container direction="row" sx={{ flex: '1 1 auto' }}>
                    <LeftNavigation />
                    <MainContent />
                </Grid>
            }
        </Grid>
    );
}