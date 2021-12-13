import { createContext, useContext, FC, useState } from "react";
import { defaultNews, defaultOpinions } from "../../utils/defaults";


export enum Status {
    OPEN = 'open',
    CLOSED = 'closed'
}

export interface RawPlaceDataProps {
    _id?: string,
    name: string,
    type: string,
    description: string,
    subtitle: string,
    img: string | ArrayBuffer | null | File,
    locations: LocationProps[],
    userId?: string,
    isUserOwner?: boolean
}

export interface LocationProps {
    _id? : string,
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


export const BusinessChainContext = createContext<BusinessChainContextData | null>(null)


export const BusinessChainContextProvider: FC = ({ children }) => {

    const state = useProviderSettings()

    return (
        <BusinessChainContext.Provider value={state}>
            {children}
        </BusinessChainContext.Provider>
    )
}

export const clearBusinessChain = {
    name: '',
    locations: [
        {
            status: Status.CLOSED,
            address: '',
            visitCount: 0,
            lat: 0,
            lng: 0,
            phone: '',
            instagram: '',
            facebook: '',
            email: '',
            website: '',
            isActive: false,
        }
    ],
    type: '',
    description: '',
    subtitle: '',
    img: '',
    userId: '',
}

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number
}




const useProviderSettings = () => {

    const [businessChain, setBusinessChain] = useState<RawPlaceDataProps>(clearBusinessChain)

    return {
        businessChain, setBusinessChain
    }
}

type BusinessChainContextData = ReturnType<typeof useProviderSettings>

export const useBusinessChainContext = () => {
    const businessChainContext = useContext(BusinessChainContext)
    if (!businessChainContext) throw new Error('BusinessChainContext should be used inside BusinessChainContextProvider')
    return businessChainContext

}

