import { Fade, Grid, Slide, Typography } from '@mui/material';
import { Event } from 'components/Event';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { reset } from 'store/slices/eventSlice';
import { EventForm } from './components/form';

export const NewEvent: FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Grid container alignItems="center" sx={{ flexGrow: 1, pt: 2, pb: 2 }} justifyContent="space-evenly">
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
