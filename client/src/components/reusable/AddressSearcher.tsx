import { CircularProgress, Grid, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import React, { FC, useEffect, useRef, useState } from "react"
import { useMapContext } from "../../contexts/MapContext/MapContext"
import { useCurrentPlaceContext } from "../../contexts/PanelContexts/CurrentPlaceContext"
import { useSelectedPlacesContext } from "../../contexts/SelectedPlacesContext"
import { findByAddress } from "../../requests/PlaceRequests"

interface Props{
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export const AddressSearcher: FC<Props> = ({setErrorMessage}) => {
    
    const [open, setOpen] = useState(false)
    const { setPlaceCoords } = useMapContext()

    const { selectedPlaces, setSelectedPlaces, setChosenCriterias, setSelectedAddress, setEditionMode } = useSelectedPlacesContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [inputValue, setInputValue] = useState('')
    const isFirstFind = useRef(true)
    const [loading, setLoading] = useState(false)

    const selectPlace = async (place: any) => {
        if (place) {
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
            console.log(inputValue)
            isFirstFind.current = false
            return
        }
        setErrorMessage('')
        setLoading(true)
        if (inputValue === '') {
            setLoading(false)
            setSelectedPlaces([])
            return
        }
        const delaySearch = setTimeout(async () => {
            const addresses = await findByAddress(inputValue)
            setSelectedPlaces(addresses)
            setLoading(false)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [inputValue])

    return (
        <Autocomplete
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
            options={selectedPlaces}
            onChange={(event, value) => selectPlace(value)}
            getOptionLabel={(option: any) => option && option.name}
            noOptionsText="No options"
            renderOption={(option: any, { inputValue }) => {
                const label = option.label
                const matches = match(label, inputValue);
                const parts = parse(label, matches);
                return (
                    <Grid container>
                        <Grid item>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    <span>{part.text}</span>
                                </span>
                            ))}
                        </Grid>
                    </Grid>
                )
            }}
            renderInput={(params) =>
                <TextField
                    {...params}
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