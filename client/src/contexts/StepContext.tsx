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


const useProviderSettings = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [imageFile, setImageFile] = useState<File | null>(null)

    return {
        activeStep,
        setActiveStep,
        imageFile,
        setImageFile,
        currentStep,
        setCurrentStep

    }
}
type StepContextData = ReturnType<typeof useProviderSettings>

export const useStepContext = () => {
    const stepContext = useContext(StepContext)
    if (!stepContext) throw new Error('stepContext should be used inside StepContextProvider')
    return stepContext
}