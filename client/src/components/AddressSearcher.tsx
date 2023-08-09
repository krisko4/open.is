import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { findByAddress } from 'api';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { setMapCoords } from 'store/slices/mapSlice';
import { setSelectedAddress } from 'store/slices/selectedAddressSlice';

interface Props {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  placeholder?: string;
  label?: string;
}

const DEFAULT_LABEL = 'Enter the address of your place';
const DEFAULT_PLACEHOLDER = 'What is the address of your place?';

export const AddressSearcher: FC<Props> = ({ errorMessage, placeholder, label, setErrorMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const isFirstFind = useRef(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [availableAddresses, setAvailableAddresses] = useState<any>([]);

  const selectPlace = async (place: any) => {
    setErrorMessage('');
    if (place) {
      if (!place.raw.address.postcode) {
        setErrorMessage('This is not a valid address. Your address should include street number and postcode.');
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { osm_type, osm_id } = place.raw;
      dispatch(
        setSelectedAddress({
          label: place.label,
          lng: place.x,
          lat: place.y,
          language: navigator.language,
          postcode: place.raw.address.postcode,
          addressId: `${osm_type[0].toString().toUpperCase()}${osm_id}`,
        })
      );
      dispatch(
        setMapCoords({
          lat: place.y,
          lng: place.x,
          zoom: 20,
        })
      );
    }
  };

  useEffect(() => {
    if (isFirstFind.current) {
      isFirstFind.current = false;
      return;
    }
    setErrorMessage('');
    setLoading(true);
    if (inputValue === '') {
      setLoading(false);
      setAvailableAddresses([]);
      return;
    }
    const delaySearch = setTimeout(async () => {
      const addresses = await findByAddress(inputValue);
      setAvailableAddresses(addresses);
      setLoading(false);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [inputValue, setErrorMessage]);

  return (
    <Autocomplete
      freeSolo={true}
      loading={loading}
      options={availableAddresses}
      onChange={(event, value) => selectPlace(value)}
      getOptionLabel={(option: any) => option.name}
      noOptionsText="No options"
      renderInput={(params) => (
        <TextField
          {...params}
          error={errorMessage !== ''}
          helperText={errorMessage}
          variant="outlined"
          placeholder={placeholder || DEFAULT_PLACEHOLDER}
          label={label || DEFAULT_LABEL}
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
      renderOption={(props, option: any) => {
        const label = option.name;
        const matches = match(label, inputValue);
        const parts = parse(label, matches);
        return (
          <li key={option.raw.osm_id} {...props}>
            <h4 style={{ marginLeft: 10, marginRight: 10 }}>
              {parts.map((part, index) => (
                <span key={index} style={{ marginBottom: 10, fontWeight: part.highlight ? 700 : 400 }}>
                  <span>{part.text}</span>
                </span>
              ))}
            </h4>
          </li>
        );
      }}
    />
  );
};