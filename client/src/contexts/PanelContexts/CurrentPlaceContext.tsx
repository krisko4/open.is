
import { createContext, useContext, FC, useState } from "react";
import { defaultNews, defaultOpinions } from "../../components/reusable/defaults";


export enum Status {
    OPEN = 'open',
    CLOSED = 'closed'
}

export interface PlaceProps {
    status: Status,
    visitCount: number,
    _id: string,
    name: string,
    address: string,
    type: string,
    lat: number,
    lng: number,
    description: string,
    subtitle: string,
    phone: string,
    img: string | ArrayBuffer | null | File,
    email: string,
    website: string,
    instagram: string,
    news : NewsProps[],
    opinions : OpinionProps[],
    facebook: string,
    userId: string,
    visits: VisitProps[],
    averageNote: {
        ones: number,
        twos: number,
        threes: number,
        fours: number,
        fives: number,
        average: number
    },
    openingHours? : any,
    isActive: boolean,
    isUserOwner?: boolean
}

interface NewsProps {
    title: string,
    date: string,
    content: string
}


interface OpinionProps {
    author: string,
    date: string,
    content: string,
    note: number,
    averageNote: number,
    authorImg: string
}


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
    status: Status.CLOSED,
    visitCount: 0,
    _id: '',
    name: '',
    address: '',
    type: '',
    lat: 0,
    lng: 0,
    description: '',
    subtitle: '',
    phone: '',
    img: '',
    email: '',
    website: '',
    userId: '',
    instagram: '',
    facebook: '',
    averageNote: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        average: 0
    },
    isActive: false,
    opinions: defaultOpinions,
    visits: [],
    news: defaultNews
}

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
}




const useProviderSettings = () => {

    const [currentPlace, setCurrentPlace] = useState<PlaceProps>(clearPlace)
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
        setVisits
    }
}

type CurrentPlaceContextData = ReturnType<typeof useProviderSettings>

export const useCurrentPlaceContext = () => {
    const currentPlaceContext = useContext(CurrentPlaceContext)
    if (!currentPlaceContext) throw new Error('CurrentPlaceContextProvider should be used inside CurrentPlaceContext!')
    return currentPlaceContext

}

