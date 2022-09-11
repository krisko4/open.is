import { Autocomplete, TextField } from '@mui/material';
import { getBusinessTypes } from 'api/businessTypes';
import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { setType, useTypeSelector } from 'store/slices/currentPlaceSlice';

export const BusinessType: FC = () => {
  const [businessTypes, setBusinessTypes] = useState<any>([]);
  const dispatch = useAppDispatch();
  const businessType = useTypeSelector();
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    getBusinessTypes()
      .then((res) => setBusinessTypes(res.data))
      .catch((err) => console.log(err));
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
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          onChange={(e, newValue) => onChange(newValue)}
          value={value}
          options={businessTypes}
          fullWidth={true}
          renderInput={(params) => (
            <TextField
              placeholder="Select your business type"
              error={errors.type?.message ? true : false}
              helperText={
                errors.type?.message && <span style={{ color: 'red' }}>Please choose a correct business type</span>
              }
              variant="outlined"
              color="primary"
              {...params}
              label="Business type"
            />
          )}
        />
      )}
    />
  );
};
