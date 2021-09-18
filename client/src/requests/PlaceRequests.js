import myAxios from "../axios/axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";


const provider = new OpenStreetMapProvider({
    params: {
        addressdetails: 1
    }
});

export const findByAddress = async (inputValue) => {
    const result = await provider.search({ query: inputValue })
    if (result) {
        const inputArray = inputValue.split(' ')
        const upperCasedInputArray = inputArray.map((input) => {
            return input.charAt(0).toUpperCase() + input.slice(1)
        })
        result.forEach((address) => {
            const addressArray = address.label.split(', ')
            const filteredAddressArray = addressArray.filter((address) => {
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


// export const getPlaces = async (inputValue, chosenCriterias, setSelectedPlaces, setChosenCriterias, isPlaceFoundByName) => {
//     try{
//       //  setChosenCriterias([])
//       //  const places = await getPlacesByName(inputValue)
//         const names =  await getPlaceNames(inputValue)
//         names.length === 0 && findByAddress(inputValue, setSelectedPlaces)
//         // if(!places){
//         //     findByAddress(inputValue, setSelectedPlaces)
//         //     isPlaceFoundByName.current = false
//         //     return
//         // }
//        //  isPlaceFoundByName.current = true
//     //    const selected = []

//         // places.forEach((element) => {
//         //     const isAlreadySelected = chosenCriterias.some(place => {
//         //         return place._id === element._id
//         //     })
//         //     if (!isAlreadySelected) {
//         //         selected.push(element)
//         //     }
//         // })
//         setSelectedPlaces(names)
//     } catch(err) {
//         console.error(err)
//     }

// }

export const getPlacesByChosenCriterias = async (criterias) => {
    let names = []
    let addresses = []
    criterias.forEach(criterium => criterium.foundBy === 'name' ? names.push(criterium.name) : addresses.push(criterium.name))

    let params = {}
    if (addresses.length > 0) params['address'] = addresses.join('|')
    if (names.length > 0) params['name'] = names.join('|')
    console.log(params)
    return getPlacesWithParams('/places/active', params)
    // try {
    //     const response = await myAxios.get('/places/active', {
    //         params: params
    //     })
    //     return response.data

    // } catch (err) {
    //     console.log(err)
    // }
}

export const getPlacesByAddress = (address) => {
    return myAxios.get('/places/active', {
        withCredentials: true,
        params: {
            address: address
        }
    })
}

export const incrementVisitCount = (placeId) => {
    return myAxios.patch(`/places/${placeId}/visit-count`)
}

// export const getPopularPlaces = async () => {
//     try {
//         const response = await myAxios.get('/places/active/popular', {
//             withCredentials: true
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// }

export const getPlaces = async (url) => {
    try {
        const response = await myAxios.get(url, {
            withCredentials: true
        })
        return response.data
    } catch (err) {
        console.log(err)
    }

}

export const getPlacesWithParams = async (url, params) => {
    try {
        const response = await myAxios.get(url, {
            params: params,
            withCredentials: true
        })
        return response.data
    } catch (err) {
        console.log(err)
    }

}
// export const getRecentlyAddedPlaces = async () => {
//     try {
//         const response = await myAxios.get('/places/active/new', {
//             withCredentials: true
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// }

// export const getTopRatedPlaces = async () => {
//     try {
//         const response = await myAxios.get('/places/active/top', {
//             withCredentials: true
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// }
// export const getPlacesByName = async (name) => {
//     try {
//         const response = await myAxios.get('/places/active', {
//             withCredentials: true,
//             params: {
//                 name: name
//             }
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
//}

// export const getPlaceNames = async (name) => {
//     try {
//         const response = await myAxios.get('/places/name', {
//             params: {
//                 name: name
//             }
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// }