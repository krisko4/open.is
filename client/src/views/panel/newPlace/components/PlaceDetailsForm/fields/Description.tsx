import { TextField } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import { setDescription, useDescriptionSelector } from 'store/slices/currentPlaceSlice';

export const Description: FC = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const description = useDescriptionSelector();
  const dispatch = useAppDispatch();

  const desc = useWatch({
    control,
    name: 'description',
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setValue('description', description);
      isFirstRender.current = false;
      return;
    }
    dispatch(setDescription(desc));
  }, [desc]);

  return (
    <TextField
      fullWidth={true}
      {...register('description')}
      label="This is a description of my business!"
      multiline
      color="success"
      name="description"
      rows={10}
      variant="outlined"
      placeholder="Describe your business in few words"
      error={errors.description?.message ? true : false}
      helperText={errors.description?.message || `${description.length}/1000`}
      inputProps={{
        maxLength: 1000,
      }}
    />
  );
};
