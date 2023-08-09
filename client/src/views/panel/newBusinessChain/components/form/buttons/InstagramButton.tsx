import { Button, Tooltip } from '@mui/material';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { setInstagram } from 'store/slices/currentPlaceSlice';

export const InstagramButton: FC = () => {
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
        disabled={errors.instagram?.message ? true : false}
        variant="outlined"
        onClick={() => dispatch(setInstagram(getValues('instagram')))}
      >
        Instagram
      </Button>
    </Tooltip>
  );
};
