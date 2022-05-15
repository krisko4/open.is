import { CircularProgress, Alert, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetStatusForSelectedLocationQuery } from 'redux-toolkit/api';

export const CachedPlaceStatus = () => {
  const { locationId } = useParams();
  const { data: status, isFetching } = useGetStatusForSelectedLocationQuery(locationId as string);

  return (
    <Tooltip title={'This is a current status of your place'}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          {status === 'open' ? (
            <Alert severity="success" variant="filled">
              This place is now OPEN
            </Alert>
          ) : (
            <Alert severity="error" variant="filled">
              This place is now CLOSED
            </Alert>
          )}
        </>
      )}
    </Tooltip>
  );
};
