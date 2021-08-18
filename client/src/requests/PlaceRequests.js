import myAxios from "../axios/axios";
import {OpenStreetMapProvider} from "leaflet-geosearch";


const provider = new OpenStreetMapProvider({});

export const findByAddress = (inputValue, setSelectedPlaces) => {
    provider.search({query: inputValue}).then(function (result) {
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
        console.log(result)
        setSelectedPlaces(result)
    });
}


export const getPlaces = async (inputValue, chosenCriterias, setSelectedPlaces, isPlaceFoundByName) => {
    try{
        const places = await getPlacesByName(inputValue)
        if(!places){
            findByAddress(inputValue, setSelectedPlaces)
            isPlaceFoundByName.current = false
            return
        }
        isPlaceFoundByName.current = true
        const selected = []
        places.forEach((element) => {
            const isAlreadySelected = chosenCriterias.some(place => {
                return place._id === element._id
            })
            if (!isAlreadySelected) {
                selected.push(element)
            }
        })
        setSelectedPlaces(selected)
    } catch(err) {
        console.error(err)
    }

    // myAxios.get('/places', {
    //     params: {
    //         name: inputValue
    //     }
    // }).then((response) => {
    //     if (response.data.length === 0) {
    //         findByAddress(inputValue, setSelectedPlaces)
    //         isPlaceFoundByName.current = false
    //         return
    //     }
    //     isPlaceFoundByName.current = true
    //     const selected = []
    //     response.data.forEach((element) => {
    //         const isAlreadySelected = chosenCriterias.some(place => {
    //             return place._id === element._id
    //         })
    //         if (!isAlreadySelected) {
    //             selected.push(element)
    //         }
    //     })
    //     setSelectedPlaces(selected)
    // }).catch(err => console.error(err))
}

export const getPlacesByAddress = (address) => {
    return myAxios.get('/places', {
        params: {
            address: address
        }
    })
}

export const getPlacesByName = async (name) => {
    const response = await myAxios.get('/places', {
        params: {
            name: name
        }
    })
    return response.data
}