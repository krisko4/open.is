import DoorFrontIcon from '@mui/icons-material/DoorFront';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Card, CardContent, CircularProgress, Fade, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetStatusForSelectedLocationQuery, useSetStatusForSelectedLocationMutation } from 'redux-toolkit/api';
import { Status } from 'redux-toolkit/slices/PlaceProps';
import { useCustomSnackbar } from 'utils/snackbars';

export const PlaceStatus: FC = () => {
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const { locationId } = useParams();
  const [setStatusForSelectedLocation, { isLoading }] = useSetStatusForSelectedLocationMutation();
  const { data: status, isFetching } = useGetStatusForSelectedLocationQuery(locationId as string);
  const [doorColor, setDoorColor] = useState<any>(status === Status.OPEN ? 'success' : 'error');

  useEffect(() => {
    if (status) {
      setDoorColor(status === Status.OPEN ? 'success' : 'error');
    }
  }, [status]);

  const changeStatus = async (newStatus: Status) => {
    try {
      await setStatusForSelectedLocation({
        locationId: locationId as string,
        status: newStatus,
      }).unwrap();
      if (newStatus === Status.OPEN) {
        enqueueSuccessSnackbar('Your place is now open');
        return;
      }
      enqueueSuccessSnackbar('Your place is now closed');
    } catch (err) {
      enqueueErrorSnackbar();
    }
  };
  return (
    <Card sx={{ flexGrow: 1 }} elevation={3}>
      <CardContent>
        <Typography variant="h5">Opening status</Typography>
        <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
          This is the current opening state of your place
        </Typography>
        <Fade in={true} timeout={500}>
          <Grid container alignItems="center" direction="column">
            {status === Status.OPEN ? (
              <>
                <Tooltip title="Close" arrow placement="top">
                  <IconButton
                    disabled={isLoading}
                    onClick={() => changeStatus(Status.CLOSED)}
                    onMouseEnter={() => setDoorColor('error')}
                    onMouseLeave={() => setDoorColor('success')}
                  >
                    {doorColor === 'error' ? (
                      <DoorFrontIcon color={doorColor} sx={{ width: '200px', height: '200px' }}></DoorFrontIcon>
                    ) : (
                      <MeetingRoomIcon color={doorColor} sx={{ width: '200px', height: '200px' }} />
                    )}
                  </IconButton>
                </Tooltip>
                <Typography variant="h1">
                  {isLoading || isFetching ? <CircularProgress /> : status?.toUpperCase()}
                </Typography>
              </>
            ) : (
              <>
                <Tooltip title="Open" arrow placement="top">
                  <IconButton
                    onClick={() => changeStatus(Status.OPEN)}
                    onMouseEnter={() => setDoorColor('success')}
                    onMouseLeave={() => setDoorColor('error')}
                  >
                    {doorColor === 'error' ? (
                      <DoorFrontIcon color={doorColor} sx={{ width: '200px', height: '200px' }}></DoorFrontIcon>
                    ) : (
                      <MeetingRoomIcon color={doorColor} sx={{ width: '200px', height: '200px' }} />
                    )}
                  </IconButton>
                </Tooltip>
                <Typography variant="h1">
                  {isLoading || isFetching ? <CircularProgress /> : status?.toUpperCase()}
                </Typography>
              </>
            )}
          </Grid>
        </Fade>
      </CardContent>
    </Card>
  );
};
