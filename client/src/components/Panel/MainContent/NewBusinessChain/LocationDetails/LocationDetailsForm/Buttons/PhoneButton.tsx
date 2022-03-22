import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Tooltip, Button } from '@mui/material';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setPhone } from 'redux-toolkit/slices/currentPlaceSlice';

export const PhoneButton: FC = () => {
  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();

  return (
    <Tooltip title="Set value for all locations">
      <Button
        size="small"
        style={{ marginTop: 15 }}
        disabled={errors.phone?.message ? true : false}
        variant="outlined"
        onClick={() => dispatch(setPhone(getValues('phone')))}
      >
        Phone number
      </Button>
    </Tooltip>
  );
};
