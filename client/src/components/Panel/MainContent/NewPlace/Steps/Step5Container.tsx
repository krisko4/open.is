import { FC } from "react"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { Step5 } from "./Step5/Step5"

interface Props{
    isEditionMode?: boolean
}

export const Step5Container: FC<Props> = ({isEditionMode}) => {

    const { imageFile, currentPlace } = useCurrentPlaceContext()


    const prepareFormData = () => {
        const images: any = currentPlace.images.filter(image => image.file !== null).map(image => image.file)
        const place = {
            logo: imageFile as File,
            name: currentPlace.name,
            subtitle: currentPlace.subtitle,
            description: currentPlace.description,
            type: currentPlace.type as string,
        }
        const locations = [
            {
                address: currentPlace.address,
                addressId: currentPlace.addressId,
                addressLanguage: currentPlace.addressLanguage,
                lat: currentPlace.lat,
                lng: currentPlace.lng,
                phone: currentPlace.phone,
                email: currentPlace.email,
                website: currentPlace.website,
                facebook: `https://facebook.com/${currentPlace.facebook}`,
                instagram: `https://instagram.com/${currentPlace.instagram}`,
            }
        ]
        const formData = new FormData()
        let key: keyof typeof place
        for (key in place) formData.append(key, place[key])
        formData.append('locations', JSON.stringify(locations))
        for (const image of images) {
            formData.append('images', image)
        }
        return formData
    }

    return <Step5 isEditionMode={isEditionMode} formData={prepareFormData()} />

}