
import { StepContextProvider } from "contexts/StepContext"
import { FC } from "react"
import { NewPlace } from "./NewPlace"
import newPlaceSteps from "./Steps/steps"

export const NewPlaceWrapper: FC = () => {
    return (
        <StepContextProvider steps={newPlaceSteps}>
            <NewPlace />
        </StepContextProvider>

    )
}