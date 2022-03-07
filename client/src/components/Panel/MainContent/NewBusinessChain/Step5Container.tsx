import { FC, useMemo } from "react"
import { useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice"
import { useLocationContext } from "../../../../contexts/PanelContexts/LocationContext"
import { Step5 } from "../NewPlace/Steps/Step5/Step5"

interface Props{
    isEditionMode?: boolean,
    logoFile: File | null
}

export const Step5Container: FC<Props> = ({isEditionMode, logoFile}) => {

    const currentPlace = useCurrentPlaceSelector()
    const {selectedLocations} = useLocationContext()

    const formData = useMemo(() => {
        const formData = new FormData()
        const images: any = currentPlace.images.filter(image => image.file).map(image => image.file)
        const place = {
            logo: logoFile as File,
            name: currentPlace.name,
            subtitle: currentPlace.subtitle,
            description: currentPlace.description,
            type: currentPlace.type as string,
            isBusinessChain:  "true"
        }
        const locations = selectedLocations.map(location => {
            const newLocation = {...location}
            delete newLocation['isValid']
            newLocation.facebook = `https://facebook.com/` + newLocation.facebook
            newLocation.instagram = `https://instagram.com/` + newLocation.instagram
            return newLocation
        }
        )
        let key: keyof typeof place
        for (key in place) formData.append(key, place[key])
        formData.append('locations', JSON.stringify(locations))
        for (const image of images) {
            formData.append('images', image)
        }
        return formData
    }, [logoFile, currentPlace.images])
    return (
        <Step5 isEditionMode={isEditionMode} formData={formData} />
    )
}