import React, { FC, useEffect, useState } from "react";
import myAxios from "../../../../axios/axios";
import { usePanelContext } from "../../../../contexts/PanelContext";
import { PlaceData } from './PlaceData';

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
}

export const PlaceManagement: FC = () => {

    const {places, currentPlace, setCurrentPlace, setNews, setOpinions, setOpinionCount } = usePanelContext()
    const [visits, setVisits] = useState<VisitProps[]>([])
    

    useEffect(() => {
        console.log(currentPlace._id)
        myAxios.get('/news', {
            params: {
                placeId: currentPlace._id
            }
        }).then(res => {
            console.log(res)
            setNews(res.data)
        }).catch(err => console.log(err))
        myAxios.get('/opinions', {
            params: {
                placeId: currentPlace._id
            }
        }).then(res => {
            setOpinions(res.data)
            setOpinionCount(res.data.length)
        }).catch(err => console.log(err))
        myAxios.get('/visits', {
            params: {
                placeId : currentPlace._id
            },
            withCredentials: true
        }).then(res => setVisits(res.data))
        .catch(err => console.log(err))
    }, [currentPlace])



    return places.map((place: any, index : number) => <PlaceData key={index} visits={visits} index={index} />)
      
}