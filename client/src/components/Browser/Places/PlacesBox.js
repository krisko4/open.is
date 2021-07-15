import Grid from "@material-ui/core/Grid";
import React, {useContext, useEffect, useRef, useState} from "react";
import PlaceCard from "./PlaceCard";
import {Scrollbars} from 'react-custom-scrollbars';
import ListItem from "@material-ui/core/ListItem";
import PlaceDetails from "./PlaceDetails/PlaceDetails";
import {SelectedPlacesContext} from "../../../contexts/SelectedPlacesContext";




const PlacesBox = ({setMapCenter}) => {


    const [isPlaceCardClicked, setPlaceCardClicked] = useState(false)
    const {chosenCriterias} = useContext(SelectedPlacesContext)
    const currentPlace = useRef(null)

    const openPlaceDetails = (place) => {
        currentPlace.current = place
        setPlaceCardClicked(true)
        setMapCenter([place.lat, place.lng])
    }

    useEffect(() => {
        console.log(chosenCriterias)
    }, [chosenCriterias])


    return (
        <Grid item container direction="column" lg={6}
              style={{
                  background: '#202020',
                  }}>
            {!isPlaceCardClicked &&
            <Scrollbars >
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
            }
            {isPlaceCardClicked &&
            <PlaceDetails setPlaceCardClicked={setPlaceCardClicked} place={currentPlace.current}/>
            }
        </Grid>
    )
}

export default PlacesBox