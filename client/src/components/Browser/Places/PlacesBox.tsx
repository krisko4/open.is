import { Tab, Tabs } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import { FiberNew, Star, Timelapse, Favorite } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { FC, LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import myAxios from "../../../axios/axios";
import { useMapContext } from "../../../contexts/MapContext/MapContext";
import { useSelectedPlacesContext } from "../../../contexts/SelectedPlacesContext";
import { getPlaces, incrementVisitCount } from "../../../requests/PlaceRequests";
import { PlaceCard } from "./PlaceCard";
import { PlaceDetails } from "./PlaceDetails/PlaceDetails";


const useStyles = makeStyles({
    myTab: {
        color: 'white',
        '&& .MuiTab-wrapper': {
            flexDirection: 'row',
            alignItems: 'unset'
        },
        '&& .MuiSvgIcon-root': {
            fill: 'white',
            marginRight: 2
        }
    }
})

const MyTab = (props: any) => {
    const classes = useStyles()
    const { label, icon, ...rest } = props
    return <Tab {...rest} icon={icon} label={label} className={classes.myTab} />
}


enum tabType {
    POPULAR = 0,
    RECENTLY_ADDED = 1,
    TOP_RATED = 2,
    FAVORITE = 3
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
        if (currentPlace) {
            console.log(chosenCriterias)
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
                        
                        selectionFollowsFocus
                        variant="scrollable"
                        scrollButtons="on"
                        TabScrollButtonProps={
                          {
                              style: {
                                  color: 'white'
                              }
                          }
                        }
                        value={tabIndex}
                        style={{ marginTop: 10 }}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={(e, newIndex) => setTabIndex(newIndex)}
                    >
                        <MyTab icon={<FiberNew />} label="Popular" />
                        <MyTab icon={<Timelapse />} label="Recently added" />
                        <MyTab icon={<Star />} label="Top rated" />
                        <MyTab icon={<Favorite />} label="Favorite" />
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
                                    key={place._id}
                                    onClick={() => openPlaceDetails(place)}
                                    button
                                >
                                    <PlaceCard tabIndex={tabIndex} place={place} />
                                </ListItem>
                            </Fade>
                        )
                    })}
                </Scrollbars >
            </Grid >
        </Grid >



    )
}

export default PlacesBox