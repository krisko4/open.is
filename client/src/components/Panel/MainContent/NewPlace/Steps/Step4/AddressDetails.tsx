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

const tileLayer = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

export const AddressDetails: FC = () => {

    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const { setMapZoom, setMapCenter } = useMapContext()
    const { selectedPlaces, setSelectedPlaces } = useSelectedPlacesContext()
    const { currentPlace, setCurrentPlace } = usePanelContext()
    const [selectedAddress, setSelectedAddress] = useState<any>(null)
    const { setActiveStep } = useStepContext()
    const isFirstFind = useRef(true)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submitAddress = () => {
        if (selectedAddress.raw.address.house_number === undefined) {
            setErrorMessage('This is not a valid address. Please provide a street number.')
            return
        }         
         const newCurrentPlace = {...currentPlace}
         newCurrentPlace.address = selectedAddress
         setCurrentPlace(newCurrentPlace)
         setActiveStep(currentStep => currentStep + 1)
    }

    const selectPlace = (place: any) => {
        setSelectedAddress(place)
        if (place) {
            setMapZoom(20)
            setMapCenter({ lat: place.y, lng: place.x })
        }
    }

    useEffect(() => {
        if (isFirstFind.current) {
            isFirstFind.current = false
            return
        }
        console.log(inputValue)
        setErrorMessage('')
        setSelectedAddress(null)
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
            <Fade in={errorMessage !== ''}>
                <Grid item lg={8} style={{ textAlign: 'center' }}>
                    <Typography style={{ color: 'red' }} variant="caption">{errorMessage}</Typography>
                </Grid>
            </Fade>
            <Grid item lg={8}>
                <Autocomplete

                    freeSolo
                    loading={loading}

                    value={currentPlace.address}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    options={selectedPlaces}
                    onChange={(event, value) => selectPlace(value)}
                    getOptionLabel={(option) => option && option.name}
                    noOptionsText="No options"
                    renderOption={(option, { inputValue }) => {
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