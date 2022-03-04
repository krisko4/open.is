import { FC } from "react"
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext"
import { useLocationContext } from "../../../../contexts/PanelContexts/LocationContext"
import { Step5 } from "../NewPlace/Steps/Step5/Step5"

interface Props{
    isEditionMode?: boolean
}

export const Step5Container: FC<Props> = ({isEditionMode}) => {

    const {imageFile, currentPlace, setCurrentPlace} = useCurrentPlaceContext()
    const {selectedLocations} = useLocationContext()

    const prepareFormData = () => {
        const formData = new FormData()
        const images: any = currentPlace.images.filter(image => image.file).map(image => image.file)
        const place = {
            logo: imageFile as File,
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
    }
    return (
        <Step5 isEditionMode={isEditionMode} formData={prepareFormData()} />
    )
}