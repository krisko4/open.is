
import InstagramIcon from '@mui/icons-material/Instagram';


import { InputAdornment, TextField } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setInstagram, useInstagramSelector } from 'redux-toolkit/slices/currentPlaceSlice';





export const InstagramField: FC = () => {


  const isFirstRender = useRef(true);
  const { control, register, formState: { errors }, setValue } = useFormContext();
  const instagram = useInstagramSelector();
  const dispatch = useAppDispatch();

  const ig = useWatch({
    control,
    name: 'instagram',
  });


  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setValue('instagram', instagram);
      return;
    }
    dispatch(setInstagram(ig));
  }, [ig]);


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

