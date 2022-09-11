import { TextField } from '@mui/material';
import { FC, useRef, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setTitle, useTitleSelector } from 'redux-toolkit/slices/eventSlice';
import { Fields } from '..';

export const EventTitle: FC = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const title = useTitleSelector();
  const dispatch = useAppDispatch();

  const eventTitle = useWatch({
    control,
    name: Fields.TITLE,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setValue(Fields.TITLE, title);
      isFirstRender.current = false;
      return;
    }
    dispatch(setTitle(eventTitle));
  }, [eventTitle]);

  return (
    <TextField
      fullWidth={true}
      {...register(Fields.TITLE)}
      label="This is a title of my event!"
      multiline
      color="success"
      variant="outlined"
      placeholder="Name your event"
      error={errors.title?.message ? true : false}
      helperText={errors.title?.message || `${title.length}/100`}
      inputProps={{
        maxLength: 100,
      }}
    />
  );
};
