import { RawPlaceDataProps } from "../contexts/PanelContexts/BusinessChainContext"
import { CurrentPlaceProps } from "../contexts/PanelContexts/CurrentPlaceContext"


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
            isActive: currentPlace.isActive,
            email: currentPlace.email,
            status: currentPlace.status
        }
    ]
    const rawPlaceData: RawPlaceDataProps = {
        img: currentPlace.img,
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

    console.log(place)
    const { locations } = place
    const currentPlaces = locations.map(location => {
        return {
            ...location,
            name: place.name,
            type: place.type,
            description: place.description,
            subtitle: place.subtitle,
            img: place.img,
            userId: place.userId,
            isUserOwner: place.isUserOwner

        }
    })
    return currentPlaces
}