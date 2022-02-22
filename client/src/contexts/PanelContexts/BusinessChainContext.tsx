import { createContext, useContext, FC, useState } from "react";
import { defaultNews, defaultOpinions } from "../../utils/defaults";
import { RawPlaceDataProps, Status } from "../PlaceProps";

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
            addressId: '',
            visitCount: 0,
            lat: 0,
            lng: 0,
            phone: '',
            instagram: '',
            facebook: '',
            email: '',
            website: '',
            isActive: false,
            alwaysOpen: false
        }
    ],
    type: '',
    description: '',
    subtitle: '',
    logo: '',
    images: [],
    userId: '',
    isBusinessChain: true

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

