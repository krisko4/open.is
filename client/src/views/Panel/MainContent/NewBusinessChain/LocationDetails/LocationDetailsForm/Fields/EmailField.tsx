import MailIcon from '@mui/icons-material/Mail';
import { TextField, InputAdornment } from '@mui/material';
import { FC, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useEmailSelector } from 'redux-toolkit/slices/currentPlaceSlice';
export const EmailField: FC = () => {
  const { formState, register, setValue, getValues } = useFormContext();
  const email = useEmailSelector();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (email !== getValues('email')) {
      setValue('email', email, { shouldValidate: true });
    }
  }, [email]);

  return (
    <TextField
      fullWidth
      {...register('email')}
      label="E-mail address"
      error={formState.errors.email?.message ? true : false}
      helperText={formState.errors.email?.message}
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
