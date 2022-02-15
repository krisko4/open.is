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




export const AddressSearcher: FC<Props> = ({errorMessage,  setErrorMessage }) => {

    const [open, setOpen] = useState(false)
    const { setPlaceCoords } = useMapContext()
    // const classes = useStyles()

    const { availableAddresses, setAvailableAddresses, setChosenCriterias, setSelectedAddress } = useAddressDetailsContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [inputValue, setInputValue] = useState('')
    const isFirstFind = useRef(true)
    const [loading, setLoading] = useState(false)

    const selectPlace = async (place: any) => {
        setErrorMessage('')
        if (place) {
            console.log('hello')
            if(!place.raw.address.postcode){
                setErrorMessage('This is not a valid address. Please provide a street number.')
            }
            setSelectedAddress({
                label: place.label,
                lng: place.x,
                lat: place.y,
                postcode: place.raw.address.postcode
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
                lat: currentPlace.lat
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
            // classes={classes}
            freeSolo
            loading={loading}
            inputValue={inputValue}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            options={availableAddresses}
            onChange={(event, value) => selectPlace(value)}
            getOptionLabel={(option: any) => option.name || ''}
            noOptionsText="No options"
            // renderOption={(option: any) => {
            //     const label = option.key
            //     const matches = match(label, inputValue);
            //     const parts = parse(label, matches);
            //     return <h4 style={{marginLeft: 10, marginRight: 10}}>
            //         {label}
            //         {
            //             parts.map((part, index) => (
            //                 <span key={index} style={{ marginBottom: 10, fontWeight: part.highlight ? 700 : 400 }}>
            //                     <span >{part.text}</span>
            //                 </span>
            //             ))
            //         }

            //     </h4>
            // }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    error={errorMessage !== ''}
                    variant="outlined"
                    // focused
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
        />
    )

}