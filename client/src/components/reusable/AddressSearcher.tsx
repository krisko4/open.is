import { CircularProgress, Grid, Paper, Popper, TextField } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Autocomplete } from '@mui/material';
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import React, { FC, useEffect, useRef, useState } from "react"
import { useAddressDetailsContext } from "../../contexts/AddressDetailsContext"
import { useMapContext } from "../../contexts/MapContext/MapContext"
import { useCurrentPlaceContext } from "../../contexts/PanelContexts/CurrentPlaceContext"
import { findByAddress } from "../../requests/PlaceRequests"
import { styled } from "@mui/styles";

interface Props {
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string
}

// const useStyles = makeStyles({
//     input: {
//         '& .MuiInputBase-root, .MuiFormHelperText-root': {
//             color: 'white'
//         },
//     },
//     paper: {
//         color: 'white',
//         background: '#18202b'
//     },
//     clearIndicator: {
//         color: 'red'
//     },
//     loading: {
//         color: 'white'
//     }
// })




export const AddressSearcher: FC<Props> = ({ errorMessage, setErrorMessage }) => {

    const { setPlaceCoords } = useMapContext()
    const { availableAddresses, setAvailableAddresses, setChosenCriterias, setSelectedAddress } = useAddressDetailsContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [inputValue, setInputValue] = useState('')
    const isFirstFind = useRef(true)
    const [loading, setLoading] = useState(false)


    const selectPlace = async (place: any) => {
        setErrorMessage('')
        if (place) {
            if (!place.raw.address.postcode) {
                setErrorMessage('This is not a valid address. Your address should include street number and postcode.')
            }
            console.log(place)
            const { osm_type, osm_id } = place.raw

            setSelectedAddress({
                label: place.label,
                lng: place.x,
                lat: place.y,
                language: navigator.language,
                postcode: place.raw.address.postcode,
                addressId: `${osm_type[0].toString().toUpperCase()}${osm_id}`
            })
            setPlaceCoords({
                lat: place.y,
                lng: place.x,
                mapZoom: 20
            })
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.lat = place.y
            newCurrentPlace.lng = place.x
            setCurrentPlace(newCurrentPlace)
            setChosenCriterias([newCurrentPlace])
        }
    }


    useEffect(() => {
        if (currentPlace.address !== '') {
            setSelectedAddress({
                label: currentPlace.address,
                lng: currentPlace.lng,
                lat: currentPlace.lat,
                language: navigator.language,
                addressId: currentPlace.addressId
            })
            setPlaceCoords({
                lat: currentPlace.lat,
                lng: currentPlace.lng,
                mapZoom: 20
            })
            setChosenCriterias([{ ...currentPlace }])
        }
    }, [])

    useEffect(() => {
        if (isFirstFind.current) {
            isFirstFind.current = false
            return
        }
        setErrorMessage('')
        setLoading(true)
        if (inputValue === '') {
            setLoading(false)
            setAvailableAddresses([])
            return
        }
        const delaySearch = setTimeout(async () => {
            const addresses = await findByAddress(inputValue)
            setAvailableAddresses(addresses)
            setLoading(false)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [inputValue])

    return (
        <Autocomplete
            freeSolo={true}
            loading={loading}
            options={availableAddresses}
            onChange={(event, value) => selectPlace(value)}
            getOptionLabel={(option: any) => option.name}
            noOptionsText="No options"
            renderInput={(params) =>
                <TextField
                    {...params}
                    error={errorMessage !== ''}
                    variant="outlined"
                    placeholder="Enter the address of your place"
                    label="What is the address of your place?"
                    onChange={e => setInputValue(e.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />}
            renderOption={(props, option: any) => {
                const label = option.name
                const matches = match(label, inputValue);
                const parts = parse(label, matches);
                return <li {...props}>
                    <h4 style={{ marginLeft: 10, marginRight: 10 }}>
                        {
                            parts.map((part, index) => (
                                <span key={index} style={{ marginBottom: 10, fontWeight: part.highlight ? 700 : 400 }}>
                                    <span >{part.text}</span>
                                </span>
                            ))
                        }

                    </h4>

                </li>
            }}
        />
    )

}