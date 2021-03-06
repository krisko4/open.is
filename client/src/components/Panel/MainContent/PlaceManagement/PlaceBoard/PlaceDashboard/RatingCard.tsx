import { Card, CircularProgress, Fade, Grid, Rating, Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAverageNoteForSelectedLocationQuery } from 'redux-toolkit/api/placesApi';
import { AverageNoteProps } from 'redux-toolkit/slices/PlaceProps';
import { RatingChart } from '../../Charts/RatingChart';

export const RatingCard: FC = () => {
  const { locationId } = useParams();
  const { data: averageNote, isFetching } = useGetAverageNoteForSelectedLocationQuery(locationId as string);
  return (
    <Fade in={true} timeout={2000}>
      <Card sx={{ flexGrow: 1 }} elevation={3}>
        <Grid container direction="column" sx={{ height: '100%', padding: 2 }}>
          <Typography variant="h5">Rating</Typography>
          <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
            The following chart represents the rating of your place
          </Typography>
          <Grid container justifyContent="center" sx={{ flexGrow: 1 }}>
            <Fade in={true} timeout={500}>
              <div>
                {isFetching ? (
                  <Grid container alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <>
                    <Rating
                      size="large"
                      name="simple-controlled"
                      readOnly
                      value={averageNote?.average || 0}
                      style={{ marginTop: 10 }}
                    />
                    <RatingChart averageNote={averageNote as AverageNoteProps} />
                  </>
                )}
              </div>
            </Fade>
          </Grid>
        </Grid>
      </Card>
    </Fade>
  );
};
