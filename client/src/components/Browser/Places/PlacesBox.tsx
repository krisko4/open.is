import { FiberNew, Timelapse, Star, Favorite, Subscriptions } from "@mui/icons-material";
import { Paper, Tab, Grid, Tabs, Fade, ListItem, Tooltip, Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useRef, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useAddressDetailsContext } from "../../../contexts/AddressDetailsContext";
import { useLoginContext } from "../../../contexts/LoginContext";
import { useMapContext } from "../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps, RawPlaceDataProps } from "../../../contexts/PlaceProps";
import { getPlaces } from "../../../requests/PlaceRequests";
import { convertToCurrentPlace } from "../../../utils/place_data_utils";
import { useCustomSnackbar } from "../../../utils/snackbars";
import { PlaceCard } from "./PlaceCard";
import { PlaceDetails } from "./PlaceDetails/PlaceDetails";


// const useStyles = makeStyles({
//     myTab: {
//         color: 'white',
//         '&& .MuiTab-wrapper': {
//             flexDirection: 'row',
//             alignItems: 'unset'
//         },
//         '&& .MuiSvgIcon-root': {
//             fill: 'white',
//             marginRight: 2
//         }
//     }
// })

const MyTab = (props: any) => {
    // const classes = useStyles()
    const { label, icon, ...rest } = props
    return <Tab {...rest} icon={icon} label={label} />
}


enum tabType {
    POPULAR = 0,
    RECENTLY_ADDED = 1,
    TOP_RATED = 2,
    FAVORITE = 3,
    SUBSCRIPTIONS = 4
}

const PlacesBox: FC = () => {



    const { chosenCriterias, setChosenCriterias } = useAddressDetailsContext()
    const { enqueueErrorSnackbar } = useCustomSnackbar()
    const { isPlaceCardClicked, currentPlace } = useMapContext()
    const { userData: { isLoggedIn } } = useLoginContext()
    const [tabIndex, setTabIndex] = useState(0)
    const isFirstRender = useRef(true)
    const scrollbarRef = useRef<any>()
    const history = useHistory()
    let match = useRouteMatch();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let places: RawPlaceDataProps[]
                switch (tabIndex) {
                    case tabType.POPULAR:
                        places = await getPlaces('/places/active/popular')
                        break
                    case tabType.RECENTLY_ADDED:
                        places = await getPlaces('/places/active/new')
                        break
                    case tabType.TOP_RATED:
                        places = await getPlaces('/places/active/top')
                        break
                    case tabType.FAVORITE:
                        places = await getPlaces('/places/active/favorite')
                        break
                    case tabType.SUBSCRIPTIONS:
                        places = await getPlaces(`/places/active/subscribed`)
                        break
                    default:
                        places = []
                        console.log('Invalid tab index')
                }
                let currentPlaces = places.map(place => convertToCurrentPlace(place))
                let chosenCriterias: CurrentPlaceProps[] = []
                currentPlaces.forEach(currentPlacesArray => currentPlacesArray.forEach(currentPlace => chosenCriterias.push(currentPlace)))
                setChosenCriterias(chosenCriterias)
            } catch (err) {
                enqueueErrorSnackbar()
            } finally {
                setLoading(false)
            }
        })()

    }, [tabIndex])

    const openPlaceDetails = (place: any) => {
        scrollbarRef.current?.scrollToTop()
        history.push({
            pathname: `${match.url}/${place._id}`,
            state: { place: place }
        })
    }


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (currentPlace) {
            const newChosenCriterias = chosenCriterias.map((criterium: any) => criterium._id === currentPlace._id ? currentPlace : criterium)
            setChosenCriterias(newChosenCriterias)
        }
    }, [currentPlace])


    return (
        <Grid container direction="column" style={{ height: '100%' }} >
            {isPlaceCardClicked ||
                <Grid container justifyContent="flex-end" alignItems="center">
                    <Paper sx={{ flexGrow: 1 }}>
                        <Tabs
                            variant="fullWidth"
                            selectionFollowsFocus
                            scrollButtons
                            value={tabIndex}
                            style={{ marginTop: 10 }}
                            onChange={(e, newIndex) => setTabIndex(newIndex)}
                        >
                            <MyTab icon={<FiberNew />} label="Popular" />
                            <MyTab icon={<Timelapse />} label="Recently added" />
                            <MyTab icon={<Star />} label="Top rated" />
                            <MyTab icon={<Favorite />} label="Favorite" />
                            {isLoggedIn ?
                                <MyTab icon={<Subscriptions />} label="Subscriptions" />
                                :
                                <Tooltip arrow title={'Sign in to view your subscriptions'}>
                                    <div>
                                        <MyTab disabled icon={<Subscriptions />} label="Subscriptions" />
                                    </div>
                                </Tooltip>
                            }
                        </Tabs>

                    </Paper>
                </Grid>
            }
            <Grid container style={{ flexGrow: 1 }} >
                {loading ?
                    <Grid container alignItems="center" justifyContent="center">
                        <CircularProgress size={100} />
                    </Grid>
                    :
                    <Scrollbars autoHide ref={scrollbarRef}>
                        <Switch>
                            {chosenCriterias.map((place: any, index: number) =>
                                <Route
                                    key={index}
                                    path={`${match.url}/${place._id}`}
                                >
                                    <PlaceDetails currentPlace={place} popupIndex={index} />
                                </Route>
                            )}
                        </Switch>
                        {
                            chosenCriterias.map((place: any, index: number) => <div key={place._id}>
                                {isPlaceCardClicked ||
                                    <Fade in={true} timeout={1000}>
                                        <ListItem
                                            disableGutters
                                            disablePadding
                                            sx={{ mt: 1, mb: 1, ml: 1, mr: 1, width: 'inherit' }}
                                            onClick={() => openPlaceDetails(place)}
                                            // sx={{ mt: '8px', mr: '8px', padding: 0, mb: '8px', width: 'none' }}
                                            key={place._id}
                                            button
                                        >
                                            <PlaceCard
                                                currentPlace={place}
                                                tabIndex={tabIndex}
                                            />
                                        </ListItem>
                                    </Fade>

                                }
                            </div>

                            )
                        }
                    </Scrollbars >

                }
            </Grid >
        </Grid >



    )
}

export default PlacesBox