import FacebookIcon from '@mui/icons-material/Facebook';
import { InputAdornment, TextField } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { setFacebook, useFacebookSelector } from 'store/slices/currentPlaceSlice';

export const FacebookField: FC = () => {
  const isFirstRender = useRef(true);
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const facebook = useFacebookSelector();
  const dispatch = useAppDispatch();

  const fb = useWatch({
    control,
    name: 'facebook',
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setValue('facebook', facebook);
      return;
    }
    dispatch(setFacebook(fb));
  }, [fb]);

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
