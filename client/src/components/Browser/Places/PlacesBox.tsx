import { Tab, Tabs } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import { Place } from "@material-ui/icons";
import React, { FC, LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import myAxios from "../../../axios/axios";
import { useMapContext } from "../../../contexts/MapContext/MapContext";
import { useSelectedPlacesContext } from "../../../contexts/SelectedPlacesContext";
import { getPlaces, incrementVisitCount } from "../../../requests/PlaceRequests";
import { PlaceCard } from "./PlaceCard";
import { PlaceDetails } from "./PlaceDetails/PlaceDetails";


const MyTab = (props: any) => {
    const { label, ...rest } = props
    return <Tab {...rest} label={label} style={{ color: 'white' }} disableRipple />
}


const PlacesBox: FC = () => {



    const { setPopupOpen, setPlaceCoords, setPopupIndex, isPlaceCardClicked, setPlaceCardClicked, currentPlace, setCurrentPlace } = useMapContext()
    const [tabIndex, setTabIndex] = useState(0)
    const isFirstRender = useRef(true)
    const scrollbarRef = useRef<any>()
    const history = useHistory()
    let match = useRouteMatch();


    useEffect(() => {
        (async () => {
            let places
            switch (tabIndex) {
                case 0:
                    places = await getPlaces('/places/active/popular')
                    break
                case 1:
                    places = await getPlaces('/places/active/new')
                    break
                case 2:
                    places = await getPlaces('/places/active/top')
                    break
                default:
                    places = []
                    console.log('Invalid tab index')
            }
            setChosenCriterias(places)
        })()

    }, [tabIndex])


    const { chosenCriterias, setChosenCriterias } = useSelectedPlacesContext()

    const openPlaceDetails = (place: any) => {
        scrollbarRef.current?.scrollToTop()
        history.push(`${match.url}/${place.name}`)
    }



    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (chosenCriterias.length > 0) {
            const newChosenCriterias = chosenCriterias.map((criterium: any) => criterium._id === currentPlace._id ? currentPlace : criterium)
            console.log(newChosenCriterias)
            setChosenCriterias(newChosenCriterias)
        }
    }, [currentPlace])


    return (
        <Grid container direction="column" style={{ height: '100%' }} >
            {isPlaceCardClicked ||
                <Grid container style={{ background: '#2C2C2C' }} justify="flex-end" alignItems="center">
                    <Tabs
                        value={tabIndex}
                        style={{ marginTop: 10 }}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={(e, newIndex) => setTabIndex(newIndex)}
                    >
                        <MyTab label="Popular" />
                        <MyTab label="Recently added" />
                        <MyTab label="Top rated" />
                    </Tabs>
                </Grid>
            }
            <Grid container style={{ flexGrow: 1 }} >
                <Scrollbars ref={scrollbarRef}>
                    <Switch>
                        {chosenCriterias.map((place: any, index: number) =>
                            <Route
                                key={index}
                                path={`${match.url}/${place.name}`}
                            >
                                <PlaceDetails currentPlace={place} popupIndex={index} />
                            </Route>
                        )}
                    </Switch>
                    {!isPlaceCardClicked && chosenCriterias.map((place: any, index: number) => {
                        return (
                            <Fade in={true} timeout={1000} key={index}>
                                <ListItem
                                    style={{ marginTop: 8, paddingTop: 0, paddingBottom: 0, marginBottom: 8 }}
                                    key={index}
                                    onClick={() => openPlaceDetails(place)}
                                    button
                                >
                                    <PlaceCard place={place} />
                                </ListItem>
                            </Fade>
                        )
                    })}

                    {/* {!isPlaceCardClicked ? <>
                        {chosenCriterias.map((place: any, index: number) => {
                            return (
                                <Fade in={true} timeout={1000} key={index}>
                                    <ListItem
                                        style={{ marginTop: 8, paddingTop: 0, paddingBottom: 0, marginBottom: 8 }}
                                        key={index}
                                        onClick={() => openPlaceDetails(place, index)}
                                        button
                                    >
                                        <PlaceCard place={place} />
                                    </ListItem>
                                </Fade>
                            )
                        })} </>
                        : <PlaceDetails />
                    } */}
                </Scrollbars >
            </Grid >
        </Grid >



    )
}

export default PlacesBox