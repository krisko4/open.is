import { CircularProgress, Grid } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOpeningHoursForSelectedLocationQuery } from 'store/api';
import { OpeningHours } from '..';

export const OpeningHoursWrapper: FC = () => {
  const { locationId, placeId } = useParams();
  const { data, isFetching } = useGetOpeningHoursForSelectedLocationQuery(locationId as string);
  return (
    <>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        data && (
          <OpeningHours
            placeId={placeId}
            locationId={locationId}
            openingHours={data.openingHours}
            alwaysOpen={data.alwaysOpen}
            isActive={data.isActive}
          />
        )
      )}
    </>
  );
};
