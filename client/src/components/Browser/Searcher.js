import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useRef, useState} from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


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
            // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
            '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
                // Default left padding is 6px
                paddingLeft: 6
            },
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


const Searcher = ({setInputValue, selectedPlaces, setChosenCriterias}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const loading = open && selectedPlaces.length === 0

    // useEffect(() => {
    //
    //     const search = () => {
    //         // provider.search({query: inputValue}).then((results) => {
    //         //     console.log(results)
    //         // });
    //         if (isFirstSearch.current) {
    //             isFirstSearch.current = false
    //             return
    //         }
    //         console.log(inputValue)
    //     }
    //
    //     const delaySearch = setTimeout(() => {
    //         search()
    //     }, 500)
    //
    //     return () => clearTimeout(delaySearch)
    // }, [inputValue])


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
            options={selectedPlaces}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setChosenCriterias(value)}
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
                    //  onChange={e => test(e)}
                    // value={inputValue}

                />}
            renderOption={(option, {inputValue}) => {
                const matches = match(option.name, inputValue);
                const parts = parse(option.name, matches);
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
                                <Typography style={{color: 'white'}} variant="overline">{option.address}</Typography>
                            </div>

                        </Grid>
                    </Grid>

                )
            }}

        />
    )

}

export default Searcher