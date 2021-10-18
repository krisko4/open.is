import { createContext, useContext, FC, useState } from "react";


export enum ChosenOptions {
    DASHBOARD,
    NEW_PLACE,
    NO_PLACES,
    PLACE_MANAGEMENT,
    MY_ACCOUNT
}

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
    isActive: boolean
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
    averageNote: number
}


export const PanelContext = createContext<PanelContextData | null>(null)


export const PanelContextProvider: FC = ({ children }) => {

    const state = useProviderSettings()

    return (
        <PanelContext.Provider value={state}>
            {children}
        </PanelContext.Provider>
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
    opinions: [],
    visits: [],
    news: []
}

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
}




const useProviderSettings = () => {

    const [selectedOption, setSelectedOption] = useState<ChosenOptions | null>(null)
    const [currentPlace, setCurrentPlace] = useState<PlaceProps>(clearPlace)
    const [placeIndex, setPlaceIndex] = useState(0)
    const [news, setNews] = useState<NewsProps[]>([])
    const [opinions, setOpinions] = useState<OpinionProps[]>([])
    const [visits, setVisits] = useState<VisitProps[]>([])
    const [places, setPlaces] = useState<PlaceProps[]>([])
    const [opinionCount, setOpinionCount] = useState(0)
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        img: null
    })
    // const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>('')

    return {
        places,
        setPlaces,
        selectedOption,
        setSelectedOption,
        currentPlace,
        setCurrentPlace,
        news,
        setNews,
        opinions,
        setOpinions,
        opinionCount,
        setOpinionCount,
        placeIndex,
        setPlaceIndex,
        visits,
        setVisits
        // userData,
        // setUserData
    }
}

type PanelContextData = ReturnType<typeof useProviderSettings>

export const usePanelContext = () => {
    const panelContext = useContext(PanelContext)
    if (!panelContext) throw new Error('PanelContextProvider should be used inside PanelContext!')
    return panelContext

}

