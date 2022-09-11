import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import HomeIcon from '@mui/icons-material/Home';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import {
  resetSearcherOptions,
  SearcherOptionsProps,
  setSearcherOptions,
  useSearcherOptionsSelector,
} from 'redux-toolkit/slices/searcherOptionsSlice';
import { SelectedLocationProps, setSelectedLocations } from 'redux-toolkit/slices/selectedLocationsSlice';
import { getFoundPlaceNamesOrTypes, getPlacesBySearchParams } from '../../../requests/PlaceRequests';

const provider = new OpenStreetMapProvider({});

const Searcher: FC = () => {
  const [options, setOptions] = useState<SearcherOptionsProps[]>([]);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const isFirstFind = useRef(true);
  const searcherOptions = useSearcherOptionsSelector();

  useEffect(() => {
    return () => {
      dispatch(resetSearcherOptions());
    };
  }, []);

  useEffect(() => {
    if (isFirstFind.current) {
      isFirstFind.current = false;
      return;
    }
    if (inputValue === '') {
      setLoading(false);
      setOptions([]);
      return;
    }
    setLoading(true);
    const delaySearch = setTimeout(async () => {
      const namesOrTypes: SearcherOptionsProps[] = await getFoundPlaceNamesOrTypes(inputValue);
      if (namesOrTypes.length > 0) {
        const isAlreadyFound = searcherOptions.some((option) => option.foundBy === 'name' || option.foundBy === 'type');
        setOptions(isAlreadyFound ? [] : namesOrTypes);
        setLoading(false);
        return;
      }
      const isAlreadyFound = searcherOptions.some((option) => option.foundBy === 'address');
      if (isAlreadyFound) {
        setOptions([]);
        setLoading(false);
        return;
      }
      const result = await provider.search({ query: inputValue });
      if (result.length > 0) {
        setOptions([{ name: inputValue, foundBy: 'address' }]);
        setLoading(false);
        return;
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [inputValue]);

  const selectPlace = async (searchOptions: SearcherOptionsProps[]) => {
    dispatch(setSearcherOptions(searchOptions));
    const res = await getPlacesBySearchParams(searchOptions);
    const locations: SelectedLocationProps[] = res.data;
    dispatch(setSelectedLocations(locations));
  };

  return (
    <Autocomplete
      loading={loading}
      multiple
      freeSolo={true}
      options={options}
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => selectPlace(value as SearcherOptionsProps[])}
      noOptionsText="No options"
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Name, address, type"
          label="What place are you searching for?"
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const label = option.name;
        const matches = match(label, inputValue);
        const parts = parse(label, matches);
        return (
          <li {...props}>
            <Grid container alignItems="center" justifyContent="space-evenly" sx={{ p: 2 }}>
              <Grid item>
                {option.foundBy === 'name' ? (
                  <HomeIcon color="primary" />
                ) : option.foundBy === 'type' ? (
                  <FlipCameraAndroidIcon color="primary" />
                ) : (
                  <PlaceTwoToneIcon color="primary" />
                )}
              </Grid>
              <Grid item lg={11} container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                      <span>{part.text}</span>
                    </span>
                  ))}
                  <div>
                    <Typography variant="overline">Found by {option.foundBy}</Typography>
                  </div>
                </Grid>
                <Button size="small" variant="contained">
                  {option.foundBy === 'name' ? 'Place' : 'Address'}
                </Button>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default Searcher;
