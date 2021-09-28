import { createContext, FC, ReactNode, useContext, useState } from "react";
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

interface PlaceDetailsTypes {
    type: string | null,
    subtitle: string,
    description: string
}

const useProviderSettings = () => {
    const [placeName, setPlaceName] = useState('')
    const [activeStep, setActiveStep] = useState(0)
    const [address, setAddress] = useState<any>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [subtitle, setSubtitle] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')

    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>('')

    const [contactDetails, setContactDetails] = useState({
        phoneNumber: '',
        website: '',
        email: ''
    })
    return {
        activeStep,
        setActiveStep,
        placeName,
        setPlaceName,
        subtitle,
        setSubtitle,
        type,
        setType,
        description,
        setDescription,
        contactDetails,
        setContactDetails,
        uploadedImage,
        setUploadedImage,
        address,
        setAddress,
        imageFile,
        setImageFile

    }
}
type StepContextData = ReturnType<typeof useProviderSettings>

export const useStepContext = () => {
    const stepContext = useContext(StepContext)
    if (!stepContext) throw new Error('stepContext should be used inside StepContextProvider')
    return stepContext
}