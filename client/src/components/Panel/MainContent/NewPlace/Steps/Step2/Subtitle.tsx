import { TextField } from '@mui/material';
import { FC, useRef, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { useSubtitleSelector, setSubtitle } from 'redux-toolkit/slices/currentPlaceSlice';

export const Subtitle : FC = () => {

  const { control, register, formState: { errors }, setValue } = useFormContext();
  const subtitle = useSubtitleSelector();
  const dispatch = useAppDispatch();

  const sub = useWatch({
    control,
    name: 'subtitle',
  });

  const isFirstRender = useRef(true);
    
  useEffect(() => {
    if (isFirstRender.current) {
      setValue('subtitle', subtitle);
      isFirstRender.current = false;
      return;
    }
    dispatch(setSubtitle(sub));
  }, [sub]);
  return (
        <TextField
            {...register('subtitle')}
            variant="outlined"
            placeholder="Please enter a short subtitle"
            color="secondary"
            helperText={
                errors.subtitle?.message ||
                `${subtitle.length}/100`
            }
            error={errors.subtitle?.message ? true : false}
            label="Subtitle"
            fullWidth
            inputProps={{
              maxLength: 100,
            }}
        />
  );
};