import { Grid, CircularProgress, Fade, ListItem, ListItemText, LinearProgress } from "@mui/material"
import { FC, useState, useRef, useEffect } from "react"
import Scrollbars, { positionValues } from "react-custom-scrollbars"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "redux-toolkit/hooks"
import { reset, useSelectedLocationsSelector, setSelectedLocations, addLocations } from "redux-toolkit/slices/selectedLocationsSlice"
import { getLimitedPlaces } from "requests/PlaceRequests"
import { useCustomSnackbar } from "utils/snackbars"
import { PlaceCard } from "../PlaceCard"
import { SelectPlacesTabs } from "./SelectPlacesTabs"


export interface PlaceCardData {
    _id: string,
    name: string,
    type: string,
    subtitle: string,
    logo: string,
    status: string,
    address: string,
    locationId: string,
    lat: number,
    lng: number
}

export const PopularPlaces: FC = () => {

    const places = useSelectedLocationsSelector()
    const dispatch = useAppDispatch()
    // const [places, setPlaces] = useState<PlaceCardData[]>([])

    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [firstLoading, setFirstLoading] = useState(true)
    const start = useRef(0)
    const limit = useRef(10)
    const total = useRef(1)
    const isFirstFetch = useRef(true)
    const navigate = useNavigate()
    const { enqueueErrorSnackbar } = useCustomSnackbar()

    const fetchPlaces = async () => {
        setLoading(true)
        console.log(start.current)
        if (start.current < total.current) {
            try {
                const res = await getLimitedPlaces(start.current, limit.current)
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


    const openPlaceDetails = (locationId: string) => {
        navigate(`/search/${locationId}`)
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
                                    onClick={() => openPlaceDetails(place.locationId)}
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