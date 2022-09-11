import FacebookIcon from '@mui/icons-material/Facebook';
import { InputAdornment, TextField } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useFacebookSelector } from 'store/slices/currentPlaceSlice';

export const FacebookField: FC = () => {
  //   const isFirstRender = useRef(true);
  const {
    register,
    getValues,
    formState: { errors },
    setValue,
  } = useFormContext();
  const facebook = useFacebookSelector();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (facebook !== getValues('facebook')) {
      setValue('facebook', facebook, { shouldValidate: true });
    }
  }, [facebook]);

  return (
    <TextField
      color={'warning'}
      label={'https://facebook.com/my-profile'}
      fullWidth={true}
      variant="outlined"
      {...register('facebook')}
      placeholder={'my-profile'}
      helperText={errors.facebook?.message}
      error={errors.facebook?.message ? true : false}
      inputProps={{
        maxLength: 50,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <p>https://facebook.com/</p>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <FacebookIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};
