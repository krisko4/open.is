import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Tooltip, Button } from '@mui/material';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setWebsite } from 'redux-toolkit/slices/currentPlaceSlice';

export const WebsiteButton: FC = () => {
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
        disabled={errors.website?.message ? true : false}
        variant="outlined"
        onClick={() => dispatch(setWebsite(getValues('website')))}
      >
        Website
      </Button>
    </Tooltip>
  );
};
