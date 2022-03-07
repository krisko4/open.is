import { FC, useEffect, useMemo } from "react";
import { useRouteMatch } from "react-router-dom";
import { CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps, RawPlaceDataProps } from "../../../../../../contexts/PlaceProps";
import { StepContextProvider } from "../../../../../../contexts/StepContext";
import { convertToCurrentPlace } from "../../../../../../utils/place_data_utils";
import { NewPlace } from "../../../NewPlace/NewPlace";
import newPlaceSteps from "../../../NewPlace/Steps/steps";



interface LocationState {
    place: CurrentPlaceProps,
    businessId: string
}

interface MatchProps {
    id: string
}

export const PlaceSettings: FC = () => {


    const { currentPlace} = useCurrentPlaceContext()

    const initialPlaceData = useMemo(() => {
        while (currentPlace.images.length < 4) {
            currentPlace.images.push({
                file: null,
                img: ''
            })
        }
        return {
            ...currentPlace,
            facebook: currentPlace.facebook.substring(21),
            instagram: currentPlace.instagram.substring(22)
        }

    }, [currentPlace])

    return (
        <StepContextProvider steps={newPlaceSteps}>
            <NewPlace
                isEditionMode={true}
                initialPlaceData={initialPlaceData}
            />
        </StepContextProvider>
    )

}