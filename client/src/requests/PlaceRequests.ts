import { OpenStreetMapProvider } from "leaflet-geosearch";
import myAxios from "../axios/axios";
import { SearchParams } from "../components/Browser/Searcher";
import { ContactDetails, LocationProps, Status } from "../contexts/PlaceProps";

export interface ContactData {
    website?: string,
    phone?: string,
    email?: string,
    facebook?: string,
    instagram?: string

}

const provider = new OpenStreetMapProvider({
    params: {
        addressdetails: 1
    }
});


export const getLimitedPlaces = async (fetchUrl: string, start: number, limit: number) => {
    return myAxios.get(fetchUrl, {
        params: {
            start : start,
            limit: limit
        }
    })
}

export const findByAddress = async (inputValue: string) => {
    const result = await provider.search({ query: inputValue })
    if (result) {
        const inputArray = inputValue.split(' ')
        const upperCasedInputArray = inputArray.map((input) => {
            return input.charAt(0).toUpperCase() + input.slice(1)
        })
        const upperCasedInput = upperCasedInputArray.toString().replace(/,/gi, ' ')
        result.forEach((address: any) => {
            const addressArray = address.label.split(', ')
            const filteredAddressArray = addressArray.filter((address: any) => {
                return !upperCasedInputArray.includes(address)
            })
            filteredAddressArray.splice(0, 0, upperCasedInput)
            address.name = filteredAddressArray.toString()
            address.type = 'address'
        })
    }
    return result
}


export const getPlacesBySearchParams = async (searchParams: SearchParams[]) => {
    const names: string[] = []
    const addresses: string[] = []
    searchParams.forEach((param) => param.foundBy === 'name' ? names.push(param.name) : addresses.push(param.name))
    const params: any = {}
    if (addresses.length > 0) params['address'] = addresses.join('|')
    if (names.length > 0) params['name'] = names.join('|')
    console.log(params)
    return getPlacesWithParams('/places/active', params)
}

export const getPlacesByAddress = (address: string) => {
    return myAxios.get('/places/active', {
        params: {
            address: address
        }
    })
}
export const deleteLocations = (businessId: string, locationIds: string[]) =>
    myAxios.delete(`/places/${businessId}/locations`, {
        params: {
            locationIds: locationIds
        }
    })

export const changeContactDetailsForSelectedLocations = (businessId: string, locationIds: string[], contactDetails: ContactData) =>
    myAxios.patch(`/places/${businessId}/locations/contact-details`, {
        locationIds: locationIds,
        contactDetails: contactDetails
    })

export const addLocations = (businessId: string, locations: LocationProps[]) =>
    myAxios.patch(`/places/${businessId}/locations`, {
        locations: locations
    })

export const getPlaceById = (placeId : string) => myAxios.get(`/places/${placeId}`)

export const getPlaceByIdAndSelectedLocation = (placeId : string, locationId: string) => myAxios.get(`/places/${placeId}/locations/${locationId}`)

export const getPlaceByLatLng = (lat: number, lng: number) => {
    return myAxios.get('/places', {
        params: {
            lat: lat,
            lng: lng
        }
    })
}


export const incrementVisitCount = (placeId: string) => {
    return myAxios.patch(`/places/${placeId}/visit-count`)
}

export const getPlaces = async (url: string) => {
    try {
        const response = await myAxios.get(url)
        return response.data
    } catch (err) {
        console.log(err)
    }

}

export const registerNewPlace = (data: FormData) => myAxios.post('/places', data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const updatePlaceData = (data: FormData) => myAxios.put('/places', data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const setPlaceStatus = (placeId: string, status: Status) =>
    myAxios.patch(`/places/${placeId}/status`, {
        status: status
    })

export const deletePlace = (placeId: string) =>
    myAxios.delete(`/places/${placeId}`)


export const getPlacesByName = (name: string) => getPlacesWithParams('/places/active/name', { name: name })

export const getPlacesByUserId = (uid: string) => getPlacesWithParams('/places', { uid: uid })

const getPlacesWithParams = async (url: string, params: any) => {
    try {
        const response = await myAxios.get(url, {
            params: params,
        })
        return response.data
    } catch (err) {
        console.log(err)
    }

}
