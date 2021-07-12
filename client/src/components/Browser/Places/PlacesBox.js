import Grid from "@material-ui/core/Grid";
import React, {useEffect, useRef, useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import createStyles from "@material-ui/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PlaceCard from "./PlaceCard";
import List from "@material-ui/core/List";
import {Scrollbars} from 'react-custom-scrollbars';
import ListItem from "@material-ui/core/ListItem";
import PlaceDetails from "./PlaceDetails";




const PlacesBox = ({chosenCriterias, setMapCenter}) => {


    const [isPlaceCardClicked, setPlaceCardClicked] = useState(false)
    const currentPlace = useRef(null)

    const openPlaceDetails = (place) => {
        currentPlace.current = place
        setPlaceCardClicked(true)
        setMapCenter([place.lat, place.lng])
    }


    return (
        <Grid item lg={6}
              style={{
                  borderRightStyle: 'solid',
                  //background: '#2d004e',
                  background: '#202020',
                  borderColor: 'black'}}>
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
            <PlaceDetails place={currentPlace.current}/>
            }
        </Grid>
    )
}

export default PlacesBox