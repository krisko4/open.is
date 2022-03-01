import { styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import TextField from "@mui/material/TextField";
import HomeIcon from '@mui/icons-material/Home';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import Autocomplete from '@mui/material/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { OpenStreetMapProvider } from "leaflet-geosearch";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAddressDetailsContext } from "../../contexts/AddressDetailsContext";
import { getPlacesByName, getPlacesBySearchParams } from "../../requests/PlaceRequests";
import { convertToCurrentPlace } from "../../utils/place_data_utils";
import { CurrentPlaceProps, RawPlaceDataProps } from "../../contexts/PlaceProps";


const provider = new OpenStreetMapProvider({});

const StyledAutocomplete = styled(Autocomplete)({
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
})


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


export interface SearchParams {
    name: string,
    foundBy: string
}


const Searcher: FC = () => {

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
            const names = await getPlacesByName(inputValue)
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


    const selectPlace = async (searchParams: SearchParams[]) => {
        console.log('hello')
        console.log(searchParams)
        const places: RawPlaceDataProps[] = await getPlacesBySearchParams(searchParams)
        let currentPlaces = places.map(place => convertToCurrentPlace(place))
        let chosenCriterias: CurrentPlaceProps[] = []
        currentPlaces.forEach(currentPlacesArray => currentPlacesArray.forEach(currentPlace => chosenCriterias.push(currentPlace)))
        setChosenCriterias(chosenCriterias)
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
            // classes={classes}
            freeSolo={true}
            options={availableAddresses}
            getOptionLabel={(option: any) => option.name}
            onChange={(event, value: any) => selectPlace(value)}
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
            renderOption={(props, option: any) => {
                const label = option.name
                const matches = match(label, inputValue);
                const parts = parse(label, matches);
                console.log(props)
                return (
                    <li {...props}>
                        <Grid container alignItems="center" justifyContent="space-evenly" sx={{ p: 2 }}>
                            <Grid item>
                                {option.foundBy === "name" ?
                                    <HomeIcon color="primary" />
                                    :
                                    <PlaceTwoToneIcon color="primary" />
                                }
                            </Grid>
                            <Grid item lg={11} container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    {
                                        parts.map((part, index) => (
                                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                <span>{part.text}</span>
                                            </span>
                                        ))
                                    }
                                    <div>
                                        <Typography variant="overline" >
                                            {option.foundBy === "name" ? 'Found by name' : 'Found by address'}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Button size="small" variant="contained">
                                    {option.foundBy === "name" ? "Place" : "Address"}
                                </Button>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}


        />
    );

}

export default Searcher