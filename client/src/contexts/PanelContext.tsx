import { createContext, useContext, FC, useState } from "react";


export enum ChosenOptions {
    DASHBOARD,
    NEW_PLACE,
    NO_PLACES,
    PLACE_MANAGEMENT
}

export enum Status {
    OPEN = 'open',
    CLOSED = 'closed'
}

interface PlaceProps {
    status: Status,
    visitCount: number,
    _id: string,
    name: string,
    address: any,
    type: string,
    lat: string,
    lng: string,
    description: string,
    subtitle: string,
    phone: string,
    img: string | ArrayBuffer | null | File,
    email: string,
    website: string,
    userId: string,
    averageNote: {
        ones: number,
        twos: number,
        threes: number,
        fours: number,
        fives: number,
        average: number
    }
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
    lat: '',
    lng: '',
    description: '',
    subtitle: '',
    phone: '',
    img: '',
    email: '',
    website: '',
    userId: '',
    averageNote: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        average: 0

    }
}

const useProviderSettings = () => {

    const [selectedOption, setSelectedOption] = useState<ChosenOptions | null>(null)
    const [currentPlace, setCurrentPlace] = useState<PlaceProps>(clearPlace)

    const [news, setNews] = useState<NewsProps[]>([])
    const [opinions, setOpinions] = useState<OpinionProps[]>([])
    const [places, setPlaces] = useState<any>([])
    const [opinionCount, setOpinionCount] = useState(0)
    // const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>('')
    const [imageFile, setImageFile] = useState<File | null>(null)

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
        // uploadedImage,
        imageFile,
        setImageFile
        // setUploadedImage
    }
}

type PanelContextData = ReturnType<typeof useProviderSettings>

export const usePanelContext = () => {
    const panelContext = useContext(PanelContext)
    if (!panelContext) throw new Error('PanelContextProvider should be used inside PanelContext!')
    return panelContext

}

