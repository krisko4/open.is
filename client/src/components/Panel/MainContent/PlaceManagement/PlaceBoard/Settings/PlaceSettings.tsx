import { FC, useMemo } from "react";
import { CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { NewPlace } from "../../../NewPlace/NewPlace";




export const PlaceSettings: FC = () => {


    const { currentPlace } = useCurrentPlaceContext()

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
        <NewPlace
            isEditionMode={true}
            initialPlaceData={initialPlaceData}
        />
    )

}