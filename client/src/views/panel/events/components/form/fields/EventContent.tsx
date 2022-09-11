import { TextField } from '@mui/material';
import { FC, useRef, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setContent, useContentSelector } from 'redux-toolkit/slices/eventSlice';
import { Fields } from '..';

export const EventContent: FC = () => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const content = useContentSelector();
  const dispatch = useAppDispatch();

  const eventContent = useWatch({
    control,
    name: Fields.CONTENT,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setValue(Fields.CONTENT, content);
      isFirstRender.current = false;
      return;
    }
    dispatch(setContent(eventContent));
  }, [eventContent]);

  return (
    <TextField
      fullWidth={true}
      {...register(Fields.CONTENT)}
      label="This is a description of my event!"
      multiline
      color="success"
      rows={10}
      variant="outlined"
      placeholder="Describe your event in few words"
      error={errors.content?.message ? true : false}
    />
  );
};
