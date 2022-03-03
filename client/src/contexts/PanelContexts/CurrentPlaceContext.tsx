
import { createContext, useContext, FC, useState, useEffect } from "react";
import { defaultNews, defaultOpinions } from "../../utils/defaults";
import { CurrentPlaceProps, VisitProps } from "../PlaceProps";

export const CurrentPlaceContext = createContext<CurrentPlaceContextData | null>(null)

interface Props{
    initialPlaceData? : CurrentPlaceProps
}

export const CurrentPlaceContextProvider: FC<Props> = ({ children, initialPlaceData }) => {

    const state = useProviderSettings(initialPlaceData)

    return (
        <CurrentPlaceContext.Provider value={state}>
            {children}
        </CurrentPlaceContext.Provider>
    )
}

export const clearPlace = {
    name: '',
    address: '',
    addressId: '',
    addressLanguage: '',
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





const useProviderSettings = (initialPlaceData? : CurrentPlaceProps) => {

    
    const [currentPlace, setCurrentPlace] = useState<CurrentPlaceProps>(initialPlaceData || {...clearPlace})
    const [imageFile, setImageFile] = useState<File | null>(null)
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
        setImageFile,
        initialPlaceData,
    }
}

type CurrentPlaceContextData = ReturnType<typeof useProviderSettings>

export const useCurrentPlaceContext = () => {
    const currentPlaceContext = useContext(CurrentPlaceContext)
    if (!currentPlaceContext) throw new Error('CurrentPlaceContext should be used inside CurrentPlaceContextProvider!')
    return currentPlaceContext

}

