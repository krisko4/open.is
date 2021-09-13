import { CircularProgress, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { useEffect, useRef, useState } from "react";
import { useMapContext } from "../../../../../../contexts/MapContext/MapContext";
import { useSelectedPlacesContext } from "../../../../../../contexts/SelectedPlacesContext";
import { findByAddress } from "../../../../../../requests/PlaceRequests";
import { MapBox } from "../../../../../Browser/MapBox";
import { Button } from "@material-ui/core";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { usePanelContext } from "../../../../../../contexts/PanelContext";

const tileLayer = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}

export const AddressDetails = () => {

    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const { setMapZoom, setMapCenter } = useMapContext()
    const {selectedPlaces, setSelectedPlaces } = useSelectedPlacesContext()
    const {currentPlace, setCurrentPlace} = usePanelContext()
    const {setActiveStep} = useStepContext()
    const loading = open && selectedPlaces.length === 0 && inputValue.length > 0
    const isFirstFind = useRef(true)

    const submitAddress = () => {
        setActiveStep(currentStep => currentStep + 1)
    }

    const selectPlace = (place) => {
        const newCurrentPlace = {...currentPlace}
        newCurrentPlace.address = place
        setCurrentPlace(newCurrentPlace)
        if (place) {
            console.log(place)
            setMapZoom(20)
            setMapCenter([place.y, place.x])
            setSelectedPlaces([])
        }
    }

    useEffect(() => {
        if (isFirstFind.current) {
            isFirstFind.current = false
            return
        }
        if (inputValue === '') {
            setSelectedPlaces([])
            return
        }
        const delaySearch = setTimeout(() => {
            findByAddress(inputValue, setSelectedPlaces)
        }, 500)
        return () => clearTimeout(delaySearch)
    }, [inputValue])

    return (
        <Grid item container lg={12} justify="space-evenly">
            <Grid item lg={8}>
                <Autocomplete
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
                    getOptionLabel={(option) => option.name}
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
            <Button disabled={!currentPlace.address || loading} variant="contained" onClick={() => submitAddress()} fullWidth={true} style={{ marginTop: 10 }} color="primary">Submit</Button>
        </Grid>
    )
}