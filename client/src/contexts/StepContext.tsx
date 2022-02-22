import { createContext, FC, ReactNode, useContext, useState } from "react";
import { ContextProps } from "./ContextProps";



export const StepContext = createContext<StepContextData | null>(null)

interface Step{
    title: string,
    content: string,
    isValid?: boolean
}

interface Props{
    steps : Step[]
}

export const StepContextProvider: FC<Props> = ({ children, steps }) => {
    const value = useProviderSettings(steps)

    return (
        <StepContext.Provider value={value}>
            {children}
        </StepContext.Provider>
    )
}


const useProviderSettings = (steps : Step[]) => {
    const [activeStep, setActiveStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [areStepsValid, setStepsValid] = useState(false)

    return {
        activeStep,
        setActiveStep,
        imageFile,
        setImageFile,
        currentStep,
        setCurrentStep,
        steps,
        areStepsValid,
        setStepsValid

    }
}
type StepContextData = ReturnType<typeof useProviderSettings>

export const useStepContext = () => {
    const stepContext = useContext(StepContext)
    if (!stepContext) throw new Error('stepContext should be used inside StepContextProvider')
    return stepContext
}