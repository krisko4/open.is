import React, { FC, useEffect } from "react";
import { useCurrentPlaceContext } from '../../../../contexts/PanelContexts/CurrentPlaceContext';
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { PlaceData } from './PlaceData/PlaceData';
import {useChosenPlaceSelector} from '../../../../store/selectors/ChosenPlaceSelector'


export const PlaceManagement: FC = () => {

    const places = usePlacesSelector()
    const chosenPlace = useChosenPlaceSelector()
    const {setCurrentPlace} = useCurrentPlaceContext()

    useEffect(() => {
        console.log(chosenPlace)
        setCurrentPlace({ ...chosenPlace })
    }, [chosenPlace])



    return <>
        {places.map((place) =>
            chosenPlace._id === place._id &&
            <PlaceData key={place._id} />
        )}
    </>

}