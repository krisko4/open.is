import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { PlaceData } from "components/reusable/PlaceData/PlaceData";
import React, { FC, useEffect } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setCurrentPlace } from "redux-toolkit/slices/currentPlaceSlice";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PlaceProps";
import { addNewVisit } from "../../../../requests/VisitRequests";
import { PlaceToolbar } from "./PlaceToolbar";



const addVisit = async (place: CurrentPlaceProps) => {
    try {
        const response = await addNewVisit(place._id as string)
        return response.data
    } catch (err) {
        console.log(err)
    }

}

interface Props {
    popupIndex: number,
    place: CurrentPlaceProps
}


export const PlaceDetails: FC<Props> = ({ popupIndex, place }) => {

    const { setPopupOpen, setPlaceCoords, setPopupIndex } = useMapContext()
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setCurrentPlace(place))
        addVisit(place)
        setPopupOpen(true)
        setPopupIndex(popupIndex)
        setPlaceCoords({
            lat: place.lat,
            lng: place.lng,
            mapZoom: 18
        })
    }, [])



    return (
        <Grid container>
            <Paper sx={{ flexGrow: 1 }}>
                <PlaceToolbar />
                <PlaceData/>
            </Paper >
        </Grid >
    );
}
