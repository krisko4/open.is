import { createContext, FC, useContext, useState } from "react";
import { ContextProps } from "./ContextProps";



export const StepContext = createContext<StepContextData | null>(null)

export const StepContextProvider: FC<ContextProps> = ({ children }) => {
    const value = useProviderSettings()
    
    return (
        <StepContext.Provider value={value}>
            {children}
        </StepContext.Provider>
    )
}

const useProviderSettings = () => {
    const [placeName, setPlaceName] = useState('')
    const [placeDetails, setPlaceDetails] = useState({
        type: null,
        subtitle: '',
        description: '',
        // phoneNumber: '',
        // email: '',
        // website: ''
    })

    // const placeDetails = {
    //     type: '',
    //     subtitle: '',
    //     description: '',
    //     phoneNumber: '',
    //     email: '',
    //     website: ''
    // }

    const [contactDetails, setContactDetails] = useState({
        phoneNumber: '',
        website: '',
        email: ''
    })
    return {
        placeName,
        setPlaceName,
        placeDetails,
        setPlaceDetails,
        contactDetails,
        setContactDetails
    }
}
type StepContextData = ReturnType<typeof useProviderSettings>

export const useStepContext = () => {
    const stepContext = useContext(StepContext)
    if (!stepContext) throw new Error('stepContext should be used inside StepContextProvider')
    return stepContext
}