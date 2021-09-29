import React, { FC, useEffect, useState } from "react";
import myAxios from "../../../../axios/axios";
import { usePanelContext } from "../../../../contexts/PanelContext";
import { PlaceData } from './PlaceData';


export const PlaceManagement: FC = () => {

    const { places, currentPlace, setCurrentPlace, setVisits, setNews, setOpinions, setOpinionCount } = usePanelContext()


    useEffect(() => {
        currentPlace.news && setNews(currentPlace.news)
        currentPlace.opinions && setOpinions(currentPlace.opinions)
        currentPlace.visits && setVisits(currentPlace.visits)
    }, [currentPlace])



    return <>
    {places.map((place: any, index: number) => <PlaceData key={index} index={index} />)}
    </>

}