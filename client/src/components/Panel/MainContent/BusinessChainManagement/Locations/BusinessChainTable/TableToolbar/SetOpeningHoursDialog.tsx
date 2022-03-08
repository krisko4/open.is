import { FC } from "react"
import { useBusinessChainSelector } from "redux-toolkit/slices/businessChainSlice"
import { CurrentPlaceContextProvider } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { FullHeightDialog } from "../../../../../../reusable/FullHeightDialog"
import { OpeningHours } from "../../../../PlaceManagement/PlaceBoard/OpeningHours/OpeningHours"

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedLocations: string[]
}

export const SetOpeningHoursDialog: FC<Props> = ({ dialogOpen, setDialogOpen, selectedLocations }) => {
    const businessChain = useBusinessChainSelector()
    return (
        <FullHeightDialog
            title="Opening hours management"
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
        >
            <CurrentPlaceContextProvider>
                <OpeningHours selectedLocations={selectedLocations} businessChain={businessChain} />
            </CurrentPlaceContextProvider>
        </FullHeightDialog>

    )
}