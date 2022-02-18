import { OpenStreetMapProvider } from "leaflet-geosearch";
import myAxios from "../axios/axios";
import { SearchParams } from "../components/Browser/Searcher";
import { Status } from "../contexts/PlaceProps";


const provider = new OpenStreetMapProvider({
    params: {
        addressdetails: 1
    }
});

export const findByAddress = async (inputValue: string) => {
    const result = await provider.search({ query: inputValue })
    if (result) {
        const inputArray = inputValue.split(' ')
        const upperCasedInputArray = inputArray.map((input) => {
            return input.charAt(0).toUpperCase() + input.slice(1)
        })
        result.forEach((address: any) => {
            const addressArray = address.label.split(', ')
            const filteredAddressArray = addressArray.filter((address: any) => {
                return !upperCasedInputArray.includes(address)
            })
            const upperCasedInput = upperCasedInputArray.toString().replace(/,/gi, ' ')
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
    return getPlacesWithParams('/places/active', params)
}

export const getPlacesByAddress = (address: string) => {
    return myAxios.get('/places/active', {
        params: {
            address: address
        }
    })
}
export const deleteLocation = (businessId: string, locationId: string) => myAxios.delete(`/places/${businessId}/locations/${locationId}`)

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

export const setPlaceStatus = (placeId : string, status: Status) =>
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
