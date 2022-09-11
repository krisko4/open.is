import { Fade, Grid, Slide, Typography } from '@mui/material';
import { Event } from 'components/Event';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { reset } from 'redux-toolkit/slices/eventSlice';
import { useCustomSnackbar } from 'utils/snackbars';
import { EventForm } from './form';

export const NewEvent: FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  });

  return (
    <Grid container alignItems="center" sx={{ flexGrow: 1 }} justifyContent="space-evenly">
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
