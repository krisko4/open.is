import { RawPlaceDataProps } from "../contexts/PanelContexts/BusinessChainContext"
import { CurrentPlaceProps } from "../contexts/PanelContexts/CurrentPlaceContext"
import {Image} from '../contexts/PanelContexts/CurrentPlaceContext'

export const convertToRawPlaceData = (currentPlace: CurrentPlaceProps) => {
    const locations = [
        {
            _id: currentPlace._id,
            address: currentPlace.address,
            lat: currentPlace.lat,
            lng: currentPlace.lng,
            visitCount: currentPlace.visitCount,
            visits: currentPlace.visits,
            opinions: currentPlace.opinions,
            news: currentPlace.news,
            phone: currentPlace.phone,
            website: currentPlace.website,
            facebook: currentPlace.facebook,
            instagram: currentPlace.instagram,
            averageNote: currentPlace.averageNote,
            openingHours: currentPlace.openingHours,
            isUserOwner: currentPlace.isUserOwner,
            alwaysOpen: currentPlace.alwaysOpen,
            isActive: currentPlace.isActive,
            email: currentPlace.email,
            status: currentPlace.status,
            isUserSubscriber: currentPlace.isUserSubscriber
        }
    ]
    const images = currentPlace.images.map(image => image.img)
    const rawPlaceData: RawPlaceDataProps = {
        logo: currentPlace.logo,
        images: images,
        userId: currentPlace.userId,
        name: currentPlace.name,
        subtitle: currentPlace.subtitle,
        description: currentPlace.description,
        type: currentPlace.type,
        locations: locations,
        isUserOwner: currentPlace.isUserOwner
    }
    return rawPlaceData
}


export const convertToCurrentPlace = (place: RawPlaceDataProps) => {

    const { locations } = place
    const images = place.images.map(image => {
        const returnedVal: Image = {
            img: image as string,
            file: null

        }
        return returnedVal
        
    })
    const currentPlaces = locations.map(location => {
        return {
            ...location,
            name: place.name,
            type: place.type,
            description: place.description,
            subtitle: place.subtitle,
            logo: place.logo,
            images: images,
            userId: place.userId,
            isUserOwner: place.isUserOwner

        }
    })
    console.log(currentPlaces)
    return currentPlaces
}