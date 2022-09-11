import DoorFrontIcon from '@mui/icons-material/DoorFront';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { Alert, Button, Fade, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getHours } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { FC, useEffect, useState } from 'react';
import { OpeningHoursKeys, OpeningHoursProps } from 'redux-toolkit/slices/PlaceProps';

interface Props {
  day: OpeningHoursKeys;
  openingHours: OpeningHoursProps;
  setOpeningHours: React.Dispatch<React.SetStateAction<OpeningHoursProps>>;
}

export const SingleDayOpeningHours: FC<Props> = ({ day, openingHours, setOpeningHours }) => {
  const [startHour, setStartHour] = useState(openingHours[day].start as Date);
  const [endHour, setEndHour] = useState(openingHours[day].end as Date);
  const [areHoursValid, setHoursValid] = useState(true);
  const [doorColor, setDoorColor] = useState<any>('error');

  const openPlace = () => {
    const newOpeningHours = { ...openingHours };
    newOpeningHours[day].open = true;
    setOpeningHours(newOpeningHours);
    setDoorColor('error');
  };

  const closePlace = () => {
    const newOpeningHours = { ...openingHours };
    newOpeningHours[day].open = false;
    setOpeningHours(newOpeningHours);
    setDoorColor('error');
  };

  useEffect(() => {
    if (openingHours[day].start !== startHour || openingHours[day].end !== endHour) {
      const valid = getHours(new Date(endHour)) > getHours(new Date(startHour)) || getHours(new Date(endHour)) < 6;
      setHoursValid(valid);
      const newOpeningHours = { ...openingHours };
      newOpeningHours[day].start = startHour;
      newOpeningHours[day].valid = valid;
      newOpeningHours[day].end = endHour;
      setOpeningHours(newOpeningHours);
    }
  }, [startHour, endHour, setOpeningHours]);

  useEffect(() => {
    setStartHour(openingHours[day].start as Date);
    setEndHour(openingHours[day].end as Date);
  }, [day, openingHours]);

  return (
    <Grid container sx={{ flexGrow: 1 }} direction="column">
      {openingHours[day].open && (
        <Grid container item justifyContent="center" sx={{ mt: 2 }}>
          <Grid item container justifyContent="flex-end" lg={10}>
            <Button onClick={closePlace} variant="outlined" color="error">
              Close
            </Button>
          </Grid>
          {!areHoursValid && (
            <Grid item lg={10} sx={{ mb: 1, mt: 1 }}>
              <Alert data-testid="error-alert" severity="error" variant="outlined" sx={{ flexGrow: 1 }}>
                The difference between opening and closing hour is invalid
              </Alert>
            </Grid>
          )}
        </Grid>
      )}
      <Grid container sx={{ flexGrow: 1, mt: 1, mb: 2 }} justifyContent="space-evenly" direction="column">
        <Grid container justifyContent="space-evenly">
          {openingHours[day].open ? (
            <>
              <LocalizationProvider locale={frLocale} dateAdapter={AdapterDateFns}>
                <Fade in={true} timeout={500}>
                  <Grid data-testid="time-picker-container" container justifyContent="space-evenly">
                    <StaticTimePicker
                      toolbarTitle="Opening hour"
                      displayStaticWrapperAs="mobile"
                      value={startHour}
                      onChange={(newValue) => {
                        setStartHour(newValue as Date);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <StaticTimePicker
                      toolbarTitle="Closing hour"
                      displayStaticWrapperAs="mobile"
                      value={endHour}
                      onChange={(newValue) => {
                        setEndHour(newValue as Date);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                </Fade>
              </LocalizationProvider>
            </>
          ) : (
            <Fade in={true} timeout={500}>
              <Grid container data-testid="closed-container" alignItems="center" direction="column">
                <Tooltip title="Open" arrow placement="top">
                  <IconButton
                    onClick={() => openPlace()}
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
                <Typography variant="h1">CLOSED</Typography>
              </Grid>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
