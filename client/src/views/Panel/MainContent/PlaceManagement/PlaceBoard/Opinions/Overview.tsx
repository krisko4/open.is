// @flow
import { CircularProgress, Grid, Rating, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { CachedOpinions } from 'components/CachedPlaceData/CachedOpinions';
import * as React from 'react';
import { FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';
import { useGetAverageNoteForSelectedLocationQuery } from 'redux-toolkit/api/placesApi';

const StyledRating = styled(Rating)({
  marginTop: 20,
  '& .MuiSvgIcon-root': {
    height: '100px',
    width: '100px',
  },
});

export const Overview: FC = () => {
  const { locationId } = useParams();
  const { data: averageNote, isFetching } = useGetAverageNoteForSelectedLocationQuery(locationId as string);
  return (
    <Scrollbars>
      <Grid container sx={{ height: '100%' }} alignItems="center" direction="column" justifyContent="center">
        {isFetching ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item>
              <StyledRating readOnly value={averageNote?.average || 0} />
            </Grid>
            <Typography variant="h3">Average note: {averageNote?.average || 0}</Typography>
            <Grid container sx={{ flexGrow: 1 }}>
              <CachedOpinions />
            </Grid>
          </>
        )}
      </Grid>
    </Scrollbars>
  );
};
