import { CircularProgress, Grid, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { Formik, Form } from "formik"
import React, { FC, useEffect, useContext, useRef, useState } from "react"
import { findByAddress } from "../../../../../../requests/PlaceRequests"
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { SelectedPlacesContext } from "../../../../../../contexts/SelectedPlacesContext"
import { MapContext } from "../../../../../../contexts/MapContext/MapContext"
const addressDetails = {
    address: ''
}
const handleSubmit = (values) => {
    console.log(values)
}
export const AddressDetailsForm = () => {

    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const { setMapZoom, setMapCenter } = useContext(MapContext)
    const { selectedPlaces, setSelectedPlaces } = useContext(SelectedPlacesContext)
    const loading = open && selectedPlaces.length === 0 && inputValue.length > 0
    const isFirstFind = useRef(true)


    const selectPlace = (place) => {
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
            <Formik
                initialValues={addressDetails}
                onSubmit={values => handleSubmit(values)}
            >
                {({ values }) => (

                    <Grid item lg={8}>
                        <Form>
                            <Autocomplete
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                options={selectedPlaces}
                                onChange={(event, value) => selectPlace(value)}
                                // value={values.address}
                                getOptionLabel={(option) => option.name}
                                // renderInput={(params) => <TextField {...params} label="Enter the address of your place" />}
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
                        </Form>
                    </Grid>

                )}
            </Formik>
        </Grid>
    )
}