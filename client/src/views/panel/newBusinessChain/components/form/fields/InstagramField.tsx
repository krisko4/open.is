import InstagramIcon from '@mui/icons-material/Instagram';

import { InputAdornment, TextField } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useInstagramSelector } from 'store/slices/currentPlaceSlice';

export const InstagramField: FC = () => {
  //   const isFirstRender = useRef(true);
  const {
    register,
    getValues,
    formState: { errors },
    setValue,
  } = useFormContext();
  const instagram = useInstagramSelector();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (instagram !== getValues('instagram')) {
      setValue('instagram', instagram, { shouldValidate: true });
    }
  }, [instagram]);
  return (
    <TextField
      color={'success'}
      label={'https://instagram.com/my-profile'}
      fullWidth={true}
      variant="outlined"
      {...register('instagram')}
      placeholder={'my-profile'}
      helperText={errors.instagram?.message}
      error={errors.instagram?.message ? true : false}
      inputProps={{
        maxLength: 50,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <p>https://instagram.com/</p>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <InstagramIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};
