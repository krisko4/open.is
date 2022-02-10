import React, { FC, useEffect } from "react";
import { useCurrentPlaceContext } from '../../../../contexts/PanelContexts/CurrentPlaceContext';
import { useChosenPlaceSelector } from '../../../../store/selectors/ChosenPlaceSelector';
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { PlaceData } from './PlaceBoard/PlaceData/PlaceData';


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