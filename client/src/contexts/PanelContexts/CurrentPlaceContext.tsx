
import { createContext, useContext, FC, useState } from "react";
import { defaultNews, defaultOpinions } from "../../utils/defaults";
import { CurrentPlaceProps } from "../PlaceProps";

export const CurrentPlaceContext = createContext<CurrentPlaceContextData | null>(null)


export const CurrentPlaceContextProvider: FC = ({ children }) => {

    const state = useProviderSettings()

    return (
        <CurrentPlaceContext.Provider value={state}>
            {children}
        </CurrentPlaceContext.Provider>
    )
}

export const clearPlace = {
    name: '',
    address: '',
    type: null,
    lat: 0,
    lng: 0,
    description: '',
    subtitle: '',
    phone: '',
    logo: '',
    images: [
        { img: '', file: null },
        { img: '', file: null },
        { img: '', file: null },
        { img: '', file: null },
    ],
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    opinions: defaultOpinions,
    visits: [],
    news: defaultNews,
    alwaysOpen: false
}

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
}




const useProviderSettings = () => {

    const [currentPlace, setCurrentPlace] = useState<CurrentPlaceProps>(clearPlace)
    const [imageFile, setImageFile] = useState<File | null>(null)
    // const [news, setNews] = useState<NewsProps[]>(defaultNews)
    // const [opinions, setOpinions] = useState<OpinionProps[]>(defaultOpinions)
    const [visits, setVisits] = useState<VisitProps[]>([])
    const [opinionCount, setOpinionCount] = useState(0)

    return {
        currentPlace,
        setCurrentPlace,
        opinionCount,
        setOpinionCount,
        visits,
        setVisits,
        imageFile,
        setImageFile
    }
}

type CurrentPlaceContextData = ReturnType<typeof useProviderSettings>

export const useCurrentPlaceContext = () => {
    const currentPlaceContext = useContext(CurrentPlaceContext)
    if (!currentPlaceContext) throw new Error('CurrentPlaceContext should be used inside CurrentPlaceContextProvider!')
    return currentPlaceContext

}

