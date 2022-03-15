import { Grid, CircularProgress, Fade, ListItem, ListItemText, LinearProgress } from "@mui/material"
import { FC, useState, useRef, useEffect } from "react"
import Scrollbars, { positionValues } from "react-custom-scrollbars"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "redux-toolkit/hooks"
import { setPopup } from "redux-toolkit/slices/mapSlice"
import { useSearcherOptionsSelector } from "redux-toolkit/slices/searcherOptionsSlice"
import {  useSelectedLocationsSelector, setSelectedLocations, addLocations, SelectedLocationProps } from "redux-toolkit/slices/selectedLocationsSlice"
import { getPaginatedPlaces } from "requests/PlaceRequests"
import { useCustomSnackbar } from "utils/snackbars"
import { PlaceCard } from "../PlaceCard"
import { SelectPlacesTabs } from "./SelectPlacesTabs"

interface Props{
    fetchUrl: string
}

export const PopularPlaces: FC<Props> = ({fetchUrl}) => {

    const places = useSelectedLocationsSelector()
    const dispatch = useAppDispatch()

    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [firstLoading, setFirstLoading] = useState(true)
    const start = useRef(0)
    const limit = useRef(10)
    const total = useRef(1)
    const isFirstFetch = useRef(true)
    const navigate = useNavigate()
    const { enqueueErrorSnackbar } = useCustomSnackbar()
    const searcherOptions = useSearcherOptionsSelector()

    const fetchPlaces = async () => {
        setLoading(true)
        if (start.current < total.current) {
            try {
                const res = await getPaginatedPlaces(fetchUrl, start.current, limit.current, searcherOptions)
                const newPlaces = res.data.data
                if (start.current === 0) {
                    dispatch(setSelectedLocations(newPlaces))
                }
                else {
                    dispatch(addLocations(newPlaces))
                }
                start.current += limit.current
                if (isFirstFetch.current) {
                    isFirstFetch.current = false
                    total.current = res.data.metadata[0].total
                }
            } catch (err) {
                enqueueErrorSnackbar()
            }
        }
        else {
            setHasMore(false)
        }
        setLoading(false)
    }

    const handleScroll = (values: positionValues) => {
        if (values.top === 1 && hasMore) {
            fetchPlaces()
        }
    }

    useEffect(() => {
        (async () => {
            await fetchPlaces()
            setFirstLoading(false)
        })()
    }, [total])


    const openPlaceDetails = (place : SelectedLocationProps, index: number) => {
        dispatch(setPopup({
            isOpen: true,
            index: index
        }))
        navigate(`/search/${place._id}/${place.locationId}`)
    }

    return (
        <>
            {firstLoading ?
                <Grid container justifyContent="center" alignItems="center">
                    <CircularProgress disableShrink />
                </Grid> :
                <Scrollbars
                    onScrollFrame={handleScroll}
                    autoHide >
                    {places.map((place, index) => (
                        <div key={place.locationId}>
                            <Fade in={true} timeout={1000}>
                                <ListItem
                                    disableGutters
                                    disablePadding
                                    sx={{ mt: 1, mb: 1, ml: 1, mr: 1, width: 'inherit' }}
                                    onClick={() => openPlaceDetails(place, index)}
                                    key={place._id}
                                    button
                                >
                                    <PlaceCard cardData={place} />
                                </ListItem>
                            </Fade>
                        </div>
                    ))}
                    {loading &&
                        <Grid container justifyContent="center">
                            <CircularProgress disableShrink color="secondary" />
                        </Grid>
                    }
                </Scrollbars >
            }
        </>
    )
}