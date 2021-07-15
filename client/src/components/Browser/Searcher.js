import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import React, {useContext, useEffect, useRef, useState} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {SelectedPlacesContext} from "../../contexts/SelectedPlacesContext";
import {getPlacesByAddress, getPlacesByName} from "../../requests/PlaceRequests";


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
                color: 'white'
            },
            "& .MuiInputLabel-outlined": {
                color: "red"
            }

        },
        tag: {
            backgroundColor: 'red',
            "& .MuiChip-label": {
                color: 'white'
            },
        },
        clearIndicator: {
            color: 'red'
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
                borderColor: "red",
                borderRadius: 15
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "red"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey"
            },

        }
    }),
);


const Searcher = () => {

    const classes = useStyles()

    const {selectedPlaces, setSelectedPlaces, chosenCriterias, setChosenCriterias} = useContext(SelectedPlacesContext)
    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const loading = open && selectedPlaces.length === 0 && inputValue.length > 0
    const isFirstFind = useRef(true)
    const isPlaceFoundByName = useRef(true)

    useEffect(() => {
            if (isFirstFind.current) {
                isFirstFind.current = false
                return
            }
            if (inputValue === '') {
                setSelectedPlaces([])
                return
            }
            const findSelectedPlaces = () => {
                getPlacesByName(inputValue, chosenCriterias, setSelectedPlaces, isPlaceFoundByName)
            }

            const delaySearch = setTimeout(() => {
                findSelectedPlaces()
            }, 500)
            return () => clearTimeout(delaySearch)

        }, [inputValue]
    )

    const fetchByAddress = async (place, criterias) => {
        return new Promise((resolve) => {
            getPlacesByAddress(place.label)
                .then((response) => {
                    console.log(response.data)
                    for (const place of response.data) {
                        criterias.push(place)
                    }
                    resolve()
                })
        })
    }

    const selectPlace = async(placesArray) => {
        const criterias = []
        for (const place of placesArray) {
            if (place.type === 'address') {
               await fetchByAddress(place, criterias)
            } else {
                criterias.push(place)
            }
        }
        setChosenCriterias(criterias)
        setSelectedPlaces([])
        setInputValue('')
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
            options={selectedPlaces}
            getOptionLabel={(option) => option.name}
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
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />}
            renderOption={(option, {inputValue}) => {
                const label = isPlaceFoundByName.current ? option.name : option.label
                const matches = match(label, inputValue);
                const parts = parse(label, matches);
                if (isPlaceFoundByName.current) {
                    return (
                        <Grid container>
                            <Grid item>
                                <Avatar style={{marginRight: 5}}
                                        src="https://d-art.ppstatic.pl/kadry/k/r/1/53/86/5ca4afec59405_o_medium.jpg"/>
                            </Grid>
                            <Grid item>
                                {parts.map((part, index) => (
                                    <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>
                            <span style={{color: 'white'}}>{part.text}</span>
                                </span>
                                ))}
                                <div>
                                    <Typography style={{color: 'white'}} variant="overline">
                                        {option.address}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    )
                }
                return (
                    <Grid container>
                        <Grid item>
                            {parts.map((part, index) => (
                                <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>
                            <span style={{color: 'white'}}>{part.text}</span>
                                </span>
                            ))}
                        </Grid>
                    </Grid>
                )
            }}


        />
    )

}

export default Searcher