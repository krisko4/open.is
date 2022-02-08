import { createContext, useContext, FC, useState } from "react";




export const PanelContext = createContext<PanelContextData | null>(null)


export const PanelContextProvider: FC = ({ children }) => {

    const state = useProviderSettings()

    return (
        <PanelContext.Provider value={state}>
            {children}
        </PanelContext.Provider>
    )
}


export enum Status {
    OPEN = 'open',
    CLOSED = 'closed'
}
export enum ChosenOptions {
    DASHBOARD,
    NEW_PLACE,
    NO_PLACES,
    PLACE_MANAGEMENT,
    MY_ACCOUNT,
    NEW_BUSINESS_CHAIN
}

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
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
    logo: string | ArrayBuffer | null | File,
    images: string[],
    email: string,
    website: string,
    instagram: string,
    news: NewsProps[],
    opinions: OpinionProps[],
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
    openingHours?: any,
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
    averageNote: number,
    authorImg: string
}


const useProviderSettings = () => {

    const [places, setPlaces] = useState<PlaceProps[]>([])
    const [selectedOption, setSelectedOption] = useState<ChosenOptions | null>(null)
    const [placeIndex, setPlaceIndex] = useState(0)

    return {
        places,
        setPlaces,
        placeIndex,
        setPlaceIndex,
        selectedOption,
        setSelectedOption
    }
}

type PanelContextData = ReturnType<typeof useProviderSettings>

export const usePanelContext = () => {
    const panelContext = useContext(PanelContext)
    if (!panelContext) throw new Error('PanelContextProvider should be used inside PanelContext!')
    return panelContext

}

