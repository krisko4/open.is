import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import HomeIcon from '@material-ui/icons/Home';
import PlaceTwoToneIcon from '@material-ui/icons/PlaceTwoTone';
import Autocomplete from "@material-ui/lab/Autocomplete";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { OpenStreetMapProvider } from "leaflet-geosearch";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAddressDetailsContext } from "../../contexts/AddressDetailsContext";
import { getPlacesByChosenCriterias, getPlacesWithParams } from "../../requests/PlaceRequests";


const provider = new OpenStreetMapProvider({});

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
                color: 'lightgrey'
            },
            "& .MuiInputLabel-outlined": {
                color: "#ff5252"
            }

        },
        tag: {
            backgroundColor: '#ff5252',
            "& .MuiChip-label": {
                color: 'white'
            },
        },
        clearIndicator: {
            color: '#ff5252'
        },
        loading: {
            color: 'grey'
        },
        noOptions: {
            color: '#2C2C2C'
        },
        popupIndicator: {
            visibility: 'hidden'
        },
        paper: {
            backgroundColor: '#2C2C2C',
            elevation: 10
        },
        inputRoot: {
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey",
                borderRadius: 1,
               
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff5252"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff5252"
            },

        }
    }),
);


const Searcher : FC = () => {

    const classes = useStyles()

    const { availableAddresses, setAvailableAddresses, chosenCriterias, setChosenCriterias } = useAddressDetailsContext()
    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const isFirstFind = useRef(true)

    useEffect(() => {
        if (isFirstFind.current) {
            isFirstFind.current = false
            return
        }
        if (inputValue === '') {
            setLoading(false)
            setAvailableAddresses([])
            return
        }
        setLoading(true)
        const delaySearch = setTimeout(async () => {
            const names = await getPlacesWithParams('/places/active/name', { name: inputValue })
            if (names.length === 0) {
                const result = await provider.search({ query: inputValue })
                result.length > 0 ? setAvailableAddresses([{ name: inputValue, foundBy: 'address' }]) : setAvailableAddresses([])
            } else {
                setAvailableAddresses(names)
            }
            setLoading(false)
        }, 500)
        return () => clearTimeout(delaySearch)

    }, [inputValue]
    )

    // const fetchByAddress = async (place, criterias) => {
    //     return new Promise((resolve) => {
    //         getPlacesByAddress(place.label)
    //             .then((response) => {
    //                 console.log(response.data)
    //                 for (const place of response.data) {
    //                     criterias.push(place)
    //                 }
    //                 resolve()
    //             })
    //     })
    // }

    const selectPlace = async (criterias : typeof chosenCriterias) => {

        const places = await getPlacesByChosenCriterias(criterias)
        setChosenCriterias(places)

        // for (const place of placesArray) {
        //     if (place.type === 'address') {
        //         await fetchByAddress(place, criterias)
        //     } else {
        //         criterias.push(place)
        //     }
        // }
        // setChosenCriterias(criterias)
        // setAvailableAddresses([])
        // setInputValue('')
    }

    return (
        <Autocomplete
            loading={loading}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            multiple
            autoHighlight
            classes={classes}
            freeSolo={true}
            options={availableAddresses}
            getOptionLabel={(option : any) => option.name}
            onChange={(event, value) => selectPlace(value)}
            noOptionsText="No options"
            renderInput={(params) =>
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Name, address, type"
                    label="What place are you searching for?"
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
            renderOption={(option : any, { inputValue }) => {
                //    const label = isPlaceFoundByName.current ? option.name : option.label
                // const label = isPlaceFoundByName.current ? option.name : option.label
                const label = option.name
                const matches = match(label, inputValue);
                const parts = parse(label, matches);
                if (option.foundBy === "name") {

                    return (
                        <Grid container alignItems="center">
                            <Grid item>
                                <HomeIcon style={{ marginRight: 10, color: '#2196f3' }} />
                            </Grid>
                            <Grid item lg={11} container justify="space-between" alignItems="center">
                                <Grid item>
                                    {
                                        parts.map((part, index) => (
                                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                <span style={{ color: 'white' }}>{part.text}</span>
                                            </span>
                                        ))

                                    }
                                    <div>
                                        <Typography variant="overline" style={{ color: 'lightgrey' }}>Found by name</Typography>
                                    </div>
                                </Grid>
                                <Button size="small" style={{ background: '#ff5252', color: 'white' }} variant="contained">Place</Button>
                            </Grid>
                        </Grid>
                    )

                    // <Grid container>
                    //     <Grid item>
                    //         <Avatar style={{marginRight: 5}}
                    //                 src={`${process.env.REACT_APP_BASE_URL}/images/places/${option.img}`}/>
                    //     </Grid>
                    //     <Grid item>
                    //         {parts.map((part, index) => (
                    //             <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>
                    //     <span style={{color: 'white'}}>{part.text}</span>
                    //         </span>
                    //         ))}
                    //         <div>
                    //             <Typography style={{color: 'white'}} variant="overline">
                    //                 {option.address}
                    //             </Typography>
                    //         </div>
                    //     </Grid>
                    // </Grid>

                }
                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <PlaceTwoToneIcon style={{ marginRight: 10, color: '#2196f3' }} />
                        </Grid>
                        <Grid item lg={11} container justify="space-between" alignItems="center">
                            <Grid item>
                                {
                                    parts.map((part, index) => (
                                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                            <span style={{ color: 'white' }}>{part.text}</span>
                                        </span>
                                    ))

                                }
                                <div>
                                    <Typography variant="overline" style={{ color: 'lightgrey' }}>Found by address</Typography>
                                </div>
                            </Grid>
                            <Button size="small" variant="contained" color="secondary">Address</Button>
                        </Grid>
                    </Grid>
                )
                // return (
                // //     // <Grid container>
                //     //     <Grid item>
                //     //         {parts.map((part, index) => (
                //     //             <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                //     //                 <span style={{ color: 'white' }}>{part.text}</span>
                //     //             </span>
                //     //         ))}
                //     //     </Grid>
                //     // </Grid>
                // )
            }}


        />
    )

}

export default Searcher