import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { FC, useRef, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { useMapContext } from "../../../contexts/MapContext/MapContext";
import { useSelectedPlacesContext } from "../../../contexts/SelectedPlacesContext";
import { PlaceCard } from "./PlaceCard";
import { PlaceDetails } from "./PlaceDetails/PlaceDetails";


const PlacesBox : FC = () => {



    const {setMapCenter, setMapZoom, setPopupOpen} = useMapContext() 


    const [isPlaceCardClicked, setPlaceCardClicked] = useState(false)
    const {chosenCriterias} = useSelectedPlacesContext()
    const currentPlace = useRef(null)

    const openPlaceDetails = (place : any) => {
        currentPlace.current = place
        setPlaceCardClicked(true)
        setMapCenter([place.lat, place.lng])
        setMapZoom(18)
        setPopupOpen(true)
    }


    return (
        <Grid
            item
            container
            lg={6}
            style={{
                background: '#202020',
            }}>
            {!isPlaceCardClicked ?
            <Scrollbars>
                {chosenCriterias.map((place, index) => {
                    return (
                        <ListItem
                            style={{marginTop: 8, paddingTop: 0, paddingBottom: 0, marginBottom: 8}}
                            key={index}
                            onClick={() => setTimeout(() => openPlaceDetails(place), 200)}
                            button
                        >
                            <PlaceCard place={place}/>
                        </ListItem>
                    )
                })}
            </Scrollbars>
                : <PlaceDetails setPlaceCardClicked={setPlaceCardClicked} place={currentPlace.current}/>
            }

        </Grid>
    )
}

export default PlacesBox