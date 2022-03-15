import HomeIcon from '@mui/icons-material/Home';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import { Typography } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { OpenStreetMapProvider } from "leaflet-geosearch";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import { SearcherOptionsProps, resetSearcherOptions, setSearcherOptions, useSearcherOptionsSelector } from "redux-toolkit/slices/searcherOptionsSlice";
import { SelectedLocationProps, setSelectedLocations } from "redux-toolkit/slices/selectedLocationsSlice";
import { getPlacesByName, getPlacesBySearchParams } from "../../requests/PlaceRequests";


const provider = new OpenStreetMapProvider({});


const Searcher: FC = () => {


    const [options, setOptions] = useState<SearcherOptionsProps[]>([])
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)
    const isFirstFind = useRef(true)
    const searcherOptions = useSearcherOptionsSelector()


    useEffect(() => {
        return () => {
            dispatch(resetSearcherOptions())
        }
    }, [])

    useEffect(() => {
        if (isFirstFind.current) {
            isFirstFind.current = false
            return
        }
        if (inputValue === '') {
            setLoading(false)
            setOptions([])
            return
        }
        setLoading(true)
        const delaySearch = setTimeout(async () => {
            const names: SearcherOptionsProps[] = await getPlacesByName(inputValue)
            if (names.length === 0) {
                const isAlreadyFoundByAddress = searcherOptions.some(option => option.foundBy === 'address')
                if (isAlreadyFoundByAddress) {
                    setOptions([])
                } else {
                    const result = await provider.search({ query: inputValue })
                    setOptions(result.length === 0 ? [] : [{ name: inputValue, foundBy: 'address' }])
                }
            } else {
                const isAlreadyFoundByName = searcherOptions.some(option => option.foundBy === 'name')
                setOptions(isAlreadyFoundByName ? [] : names)
            }
            setLoading(false)
        }, 500)
        return () => clearTimeout(delaySearch)

    }, [inputValue]
    )


    const selectPlace = async (searchOptions: SearcherOptionsProps[]) => {
        console.log(searchOptions)
        dispatch(setSearcherOptions(searchOptions))
        const res = await getPlacesBySearchParams(searchOptions)
        const locations: SelectedLocationProps[] = res.data
        dispatch(setSelectedLocations(locations))
    }

    return (
        <Autocomplete
            loading={loading}
            multiple
            freeSolo={true}
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => selectPlace(value as SearcherOptionsProps[])}
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
            renderOption={(props, option) => {
                const label = option.name
                const matches = match(label, inputValue);
                const parts = parse(label, matches);
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