import _ from "lodash";
import { FC, useMemo } from "react";
import { useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { CurrentPlaceProps } from "../../../../../../contexts/PlaceProps";
import { StepContextProvider } from "../../../../../../contexts/StepContext";
import { NewPlace } from "../../../NewPlace/NewPlace";
import newPlaceSteps from "../../../NewPlace/Steps/steps";



export const PlaceSettings: FC = () => {


    const currentPlace = useCurrentPlaceSelector()

    const initialPlaceData = useMemo(() => {
        const place = _.cloneDeep(currentPlace)
        while (place.images.length < 4) {
            place.images.push({
                file: null,
                img: ''
            })
        }
        return {
            ...place,
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