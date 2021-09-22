import { Button, CircularProgress, Fade, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { FC, useEffect, useRef, useState } from "react";
import { useMapContext } from "../../../../../../contexts/MapContext/MapContext";
import { usePanelContext } from "../../../../../../contexts/PanelContext";
import { useSelectedPlacesContext } from "../../../../../../contexts/SelectedPlacesContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { findByAddress } from "../../../../../../requests/PlaceRequests";
import { MapBox } from "../../../../../Browser/Places/MapBox/MapBox";


export const AddressDetails: FC = () => {

    const [open, setOpen] = useState(false)
    const { setMapZoom, setMapCenter } = useMapContext()

    const [tileLayer, setTileLayer] = useState({
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })

    const { selectedPlaces, setSelectedPlaces, setChosenCriterias, selectedAddress, isEditionMode, setSelectedAddress, setEditionMode } = useSelectedPlacesContext()
    const { currentPlace, setCurrentPlace } = usePanelContext()
    const [inputValue, setInputValue] = useState('')
    const { setActiveStep } = useStepContext()
    const isFirstFind = useRef(true)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submitAddress = () => {
        console.log(selectedAddress.postcode)
        if (selectedAddress.postcode === '') {
            setErrorMessage('This is not a valid address. Please provide a street number.')
            return
        }
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.address = selectedAddress.label
        const lat: number = selectedAddress.lat
        const lng: number = selectedAddress.lng
        newCurrentPlace.lat = lat
        newCurrentPlace.lng = lng
        setCurrentPlace(newCurrentPlace)
        setActiveStep(currentStep => currentStep + 1)
    }

    const selectPlace = async (place: any) => {
        console.log(place)
        if (place) {
            setSelectedAddress({
                label: place.label,
                lng: place.x,
                lat: place.y,
                postcode: place.raw.address.postcode
            })
            setMapZoom(20)
            setMapCenter({ lat: place.y, lng: place.x })

            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.lat = place.y
            newCurrentPlace.lng = place.x
            setCurrentPlace(newCurrentPlace)
            setChosenCriterias([newCurrentPlace])
        }
    }


    useEffect(() => {
        if (currentPlace.address !== ''){
            setMapZoom(20)
            setSelectedAddress({
                label: currentPlace.address,
                lng: currentPlace.lng,
                lat: currentPlace.lat,
                postcode: 'default'
            })
            setMapCenter({ lat: currentPlace.lat, lng: currentPlace.lng })
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
        <Grid container justify="center" style={{ marginTop: 10 }}>
            <Typography style={{ marginBottom: 10, textAlign: 'center' }}><b>Current address:</b><br /> {selectedAddress.label}</Typography>
            <Fade in={errorMessage !== ''}>
                <Grid item lg={8} style={{ textAlign: 'center' }}>
                    <Typography style={{ color: 'red' }} variant="caption">{errorMessage}</Typography>
                </Grid>
            </Fade>
            <Grid item lg={8}>
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
            </Grid>
            <Grid style={{ height: 400, marginTop: 20 }} item lg={12}>
                <MapBox tileLayer={tileLayer} />
            </Grid>
            <Button disabled={!selectedAddress || loading} variant="contained" onClick={() => submitAddress()} fullWidth={true} style={{ marginTop: 10 }} color="primary">Submit</Button>
        </Grid>
    )
}