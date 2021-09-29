import { Tab, Tabs } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { FC, useEffect, useRef, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
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



    const { setPopupOpen, setPlaceCoords, setPopupIndex } = useMapContext()
    const [tabIndex, setTabIndex] = useState(0)
    const isFirstRender = useRef(true)

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


    const [isPlaceCardClicked, setPlaceCardClicked] = useState(false)
    const { chosenCriterias, setChosenCriterias } = useSelectedPlacesContext()
    const [currentPlace, setCurrentPlace] = useState<any>()

    const addVisit = async (place: any) => {
        try {
            const response = await myAxios.post('/visits', {
                date: new Date(),
                placeId: place._id
            })
            return response.data
        } catch (err) {
            console.log(err)
        }

    }

    const openPlaceDetails = async (place: any, index: number) => {
        addVisit(place)
        setCurrentPlace(place)
        setPlaceCardClicked(true)
        setPlaceCoords({
            lat: place.lat,
            lng: place.lng,
            mapZoom: 18
        })
        setPopupIndex(index)
        setPopupOpen(true)
    }


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        console.log(chosenCriterias)
        const newChosenCriterias = chosenCriterias.map((criterium: any) => criterium._id === currentPlace._id ? currentPlace : criterium)
        console.log(newChosenCriterias)
        setChosenCriterias(newChosenCriterias)
    }, [currentPlace])


    return (
        <Grid
            item
            container
            lg={6}
            style={{
                background: '#202020',
            }}>
            <Scrollbars>
                {!isPlaceCardClicked ? <>
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
                    {chosenCriterias.map((place: any, index: number) => {
                        return (
                            <Fade in={true} timeout={1000} key={index}>
                                <ListItem
                                    style={{ marginTop: 8, paddingTop: 0, paddingBottom: 0, marginBottom: 8 }}
                                    key={index}
                                    onClick={() => setTimeout(() => openPlaceDetails(place, index), 200)}
                                    button
                                >
                                    <PlaceCard place={place} />
                                </ListItem>
                            </Fade>
                        )
                    })}

                </>
                    : <PlaceDetails setPlaceCardClicked={setPlaceCardClicked} setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} />
                }
            </Scrollbars>
        </Grid>
    )
}

export default PlacesBox