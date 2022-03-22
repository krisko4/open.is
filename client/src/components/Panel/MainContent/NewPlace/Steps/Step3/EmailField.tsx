import MailIcon from '@mui/icons-material/Mail';
import { InputAdornment, TextField } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setEmail, useEmailSelector } from 'redux-toolkit/slices/currentPlaceSlice';

export const EmailField: FC = () => {
  const isFirstRender = useRef(true);
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const email = useEmailSelector();
  const dispatch = useAppDispatch();

  const mail = useWatch({
    control,
    name: 'email',
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setValue('email', email);
      return;
    }
    dispatch(setEmail(mail));
  }, [mail]);

  return (
    <TextField
      fullWidth
      {...register('email')}
      label="E-mail address"
      error={errors.email?.message ? true : false}
      helperText={errors.email?.message}
      variant="outlined"
      placeholder="example@mail.org"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MailIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};
