
import { createContext, useContext, FC, useState } from "react";
import { defaultNews, defaultOpinions } from "../../utils/defaults";


export enum Status {
    OPEN = 'open',
    CLOSED = 'closed'
}

export interface Image {
    img: string,
    file: File | null
}

export interface CurrentPlaceProps {
    status?: Status,
    visitCount?: number,
    _id?: string,
    name: string,
    address: string,
    type: string | null,
    lat: number,
    lng: number,
    description: string,
    subtitle: string,
    phone: string,
    logo: string | ArrayBuffer | null | File,
    email: string,
    images: Image[],
    website: string,
    instagram: string,
    news?: NewsProps[],
    opinions?: OpinionProps[],
    facebook: string,
    userId?: string,
    visits?: VisitProps[],
    averageNote?: {
        ones: number,
        twos: number,
        threes: number,
        fours: number,
        fives: number,
        average: number
    },
    openingHours?: any,
    isActive?: boolean,
    isUserOwner?: boolean,
    isUserSubscriber?: boolean
}

interface NewsProps {
    title: string,
    date: string,
    content: string
}

export interface LocationProps {
    _id?: string,
    address: string,
    lat: number,
    lng: number,
    phone: string,
    email: string,
    website: string,
    instagram: string,
    news?: NewsProps[],
    opinions?: OpinionProps[],
    facebook: string,
    visits?: VisitProps[],
    averageNote?: {
        ones: number,
        twos: number,
        threes: number,
        fours: number,
        fives: number,
        average: number
    },
    openingHours?: any,
    isActive?: boolean
    status?: Status,
    visitCount?: number,
    isUserSubscriber?: boolean
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
    news: defaultNews
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
    if (!currentPlaceContext) throw new Error('CurrentPlaceContextProvider should be used inside CurrentPlaceContext!')
    return currentPlaceContext

}

