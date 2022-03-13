import { StepContextProvider } from "contexts/StepContext"
import { FC } from "react"
import { NewBusinessChain } from "../NewBusinessChain/NewBusinessChain"
import businessChainSteps from "../NewBusinessChain/steps"

export const NewBusinessChainWrapper: FC = () => {
    return (
        <StepContextProvider steps={businessChainSteps}>
            <NewBusinessChain />
        </StepContextProvider>

    )
}