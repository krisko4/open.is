import { Autocomplete, TextField } from '@mui/material';
import { FC, useState, useEffect, useRef } from 'react';
import { useWatch, Controller, useFormContext } from 'react-hook-form';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setType, useTypeSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { getBusinessTypes } from 'requests/BusinessTypeRequests';

export const BusinessType: FC = () => {

  const [businessTypes, setBusinessTypes] = useState<any>([]);
  const dispatch = useAppDispatch();
  const businessType = useTypeSelector();
  const { control, setValue, formState: { errors } } = useFormContext();
  useEffect(() => {
    getBusinessTypes().then(res => setBusinessTypes(res.data))
      .catch(err => console.log(err));
  }, []);


  const type = useWatch({
    control,
    name: 'type',
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setValue('type', businessType);
      isFirstRender.current = false;
      return;
    }
    dispatch(setType(type));
  }, [type]);


  return (
        <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) =>
              (
                <Autocomplete
                    onChange={(e, newValue) => onChange(newValue)}
                    value={value}
                    options={businessTypes}
                    fullWidth={true}
                    renderInput={(params) => <TextField
                        placeholder="Select your business type"
                        error={errors.type?.message ? true : false}
                        helperText={errors.type?.message && <span style={{ color: 'red' }}>Please choose a correct business type</span>}
                        variant="outlined"
                        color="primary"
                        {...params}
                        label="Business type" />}
                />
              )

            }
        />
  );
};