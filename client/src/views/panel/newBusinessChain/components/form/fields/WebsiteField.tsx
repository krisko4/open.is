import LanguageIcon from '@mui/icons-material/Language';
import { InputAdornment, TextField } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useWebsiteSelector } from 'store/slices/currentPlaceSlice';

export const WebsiteField: FC = () => {
  // const isFirstRender = useRef(true);
  const {
    register,
    getValues,
    formState: { errors },
    setValue,
  } = useFormContext();
  const website = useWebsiteSelector();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (website !== getValues('website')) {
      setValue('website', website, { shouldValidate: true });
    }
  }, [website]);

  return (
    <TextField
      color={'secondary'}
      label={'Website address'}
      fullWidth={true}
      variant="outlined"
      {...register('website')}
      placeholder={'https://www.example.com'}
      helperText={errors.website?.message}
      error={errors.website?.message ? true : false}
      inputProps={{
        maxLength: 50,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LanguageIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};
