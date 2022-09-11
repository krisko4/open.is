import { Button, Tooltip } from '@mui/material';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { setPhone } from 'store/slices/currentPlaceSlice';

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
