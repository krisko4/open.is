import { TextField } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-material-ui';
import { usePhoneSelector } from 'store/slices/currentPlaceSlice';
export const PhoneField: FC = () => {
  const { control, getValues, setValue } = useFormContext();
  const phone = usePhoneSelector();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (phone !== getValues('phone')) {
      setValue('phone', phone, { shouldValidate: true });
    }
  }, [phone]);

  return (
    <Controller
      name="phone"
      control={control}
      render={({ field }) => (
        <PhoneInput
          //@ts-ignore
          style={{
            flexGrow: 1,
          }}
          {...field}
          component={TextField}
          //@ts-ignore
          label={
            <span>
              Phone number <span style={{ color: 'red' }}>*</span>
            </span>
          }
        />
      )}
    />
  );
};
