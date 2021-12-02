import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCurrentPlaceContext } from '../../../../contexts/PanelContexts/CurrentPlaceContext';
import { usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { PlaceData } from './PlaceData';
import {setPlace} from '../../../../store/actions/setCurrentPlace'

interface Props {
    chosenPlace: any
}

export const PlaceManagement: FC<Props> = ({ chosenPlace }) => {

    const { places } = usePanelContext()
    const { currentPlace, setCurrentPlace, setVisits, setNews, setOpinions } = useCurrentPlaceContext()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPlace({...chosenPlace}))
        setCurrentPlace({ ...chosenPlace })
    }, [chosenPlace])

    useEffect(() => {
        currentPlace.news && setNews(currentPlace.news)
        currentPlace.opinions && setOpinions(currentPlace.opinions)
        currentPlace.visits && setVisits(currentPlace.visits)
    }, [currentPlace])


    return <>
        {places.map((place: any, index: number) =>
            <PlaceData key={index} index={index} />
        )}
    </>

}