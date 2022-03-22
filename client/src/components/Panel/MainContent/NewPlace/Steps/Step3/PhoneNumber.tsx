import { TextField } from '@mui/material';
import React, { useRef } from 'react';
import { FC, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import PhoneInput from 'react-phone-input-material-ui';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { usePhoneSelector, setPhone } from 'redux-toolkit/slices/currentPlaceSlice';
// import "react-phone-input-material-ui/lib/style.css";

export const PhoneNumber: FC = () => {
  const { control, setValue } = useFormContext();
  const dispatch = useAppDispatch();
  const phone = usePhoneSelector();
  const currentPhone = useWatch({
    control,
    name: 'phone',
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setValue('phone', phone);
      isFirstRender.current = false;
      return;
    }
    dispatch(setPhone(currentPhone));
  }, [currentPhone]);
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
