import { useEffect, FC, useState } from 'react';
import { Event } from 'components/Event';
import { Slide, Fade, Grid, Typography } from '@mui/material';
import { EventForm } from './EventForm';
import { useCustomSnackbar } from 'utils/snackbars';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { reset } from 'redux-toolkit/slices/eventSlice';

export const NewEvent: FC = () => {
  const { enqueueInfoSnackbar } = useCustomSnackbar();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    enqueueInfoSnackbar('Drag over an image section to upload a picture.');
  }, [enqueueInfoSnackbar]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  });

  return (
    <Grid container alignItems="center" justifyContent="space-evenly">
      <Grid item xs={4}>
        <Fade in={true} timeout={1000}>
          <div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h3">New event</Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Fill the form to create new event
              </Typography>
            </div>
            <EventForm imageFile={imageFile} />
          </div>
        </Fade>
      </Grid>
      <Grid item xs={4}>
        <Slide in={true} timeout={1000} direction="left">
          <div>
            <Event setImageFile={setImageFile} />
          </div>
        </Slide>
      </Grid>
    </Grid>
  );
};
