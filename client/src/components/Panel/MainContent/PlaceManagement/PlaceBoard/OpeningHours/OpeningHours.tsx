import { LoadingButton } from '@mui/lab';
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Slide,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useSetSelectedLocationsAlwaysOpenMutation } from 'redux-toolkit/api/placesApi';
import { useBusinessChainIdSelector } from 'redux-toolkit/slices/businessChainSlice';
import { OpeningHoursProps, OpeningHoursKeys } from 'redux-toolkit/slices/PlaceProps';
import { defaultOpeningHours } from 'utils/defaults';
import { useCustomSnackbar } from '../../../../../../utils/snackbars';
import { OpeningHoursDialog } from './OpeningHoursDialog';
import { SingleDayOpeningHours } from './SingleDayOpeningHours';

interface Props {
  selectedLocations?: string[];
  openingHours?: OpeningHoursProps;
  alwaysOpen?: boolean;
  isActive?: boolean;
  locationId?: string;
  placeId?: string;
}

export const OpeningHours: FC<Props> = ({
  selectedLocations,
  openingHours,
  alwaysOpen,
  placeId,
  isActive,
  locationId,
}) => {
  const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();

  const [value, setValue] = useState<OpeningHoursKeys>('monday');
  const [areHoursValid, setHoursValid] = useState(false);
  const [checked, setChecked] = useState(alwaysOpen || false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const businessChainId = useBusinessChainIdSelector();
  const [setSelectedLocationsAlwaysOpen, { isLoading }] = useSetSelectedLocationsAlwaysOpenMutation();

  const [hours, setHours] = useState<OpeningHoursProps>(defaultOpeningHours);

  useEffect(() => {
    if (alwaysOpen) {
      setChecked(alwaysOpen);
    }
    if (openingHours) {
      const newHours = _.cloneDeep(openingHours);
      for (const value of Object.values(newHours)) {
        value.valid = true;
      }
      console.log(newHours);
      setHours({ ...newHours });
    }
  }, [openingHours, alwaysOpen]);

  const handleChange = (event: React.SyntheticEvent, newValue: OpeningHoursKeys) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (Object.values(hours).some((value) => !value.valid)) {
      setHoursValid(false);
      return;
    }
    setHoursValid(true);
  }, [hours]);

  const saveChanges = async () => {
    // if not always open, open openingHoursDialog
    if (!checked) {
      setDialogOpen(true);
      return;
    }
    // if always open is checked
    try {
      if (selectedLocations) {
        await setSelectedLocationsAlwaysOpen({
          placeId: businessChainId as string,
          locationIds: selectedLocations,
        }).unwrap();
      } else {
        await setSelectedLocationsAlwaysOpen({
          placeId: placeId as string,
          locationIds: [locationId as string],
        }).unwrap();
      }
      enqueueSuccessSnackbar('You have successfully updated your opening hours');
    } catch (err) {
      console.log(err);
      enqueueErrorSnackbar();
    }
  };

  return (
    <Grid container sx={{ height: '100%', overflow: 'hidden' }} direction="column">
      {selectedLocations ? (
        <Slide in={true}>
          <Alert data-testid="locations-alert" variant="filled" severity="info">
            You have selected {selectedLocations.length} {selectedLocations.length === 1 ? 'location' : 'locations'}.
            The changes will be applied to each selected location.
          </Alert>
        </Slide>
      ) : (
        <>
          {isActive || (
            <Slide in={true}>
              <Alert data-testid="active-alert" variant="filled" severity="warning">
                Your place is currently not visible in the browser. Please set opening hours to activate your business.
              </Alert>
            </Slide>
          )}
        </>
      )}
      <Grid sx={{ flexGrow: 1 }} container alignItems="center">
        <Grid container justifyContent="space-evenly">
          <Grid
            data-testid="opening-hours-container"
            item
            lg={6}
            xs={10}
            sx={checked ? { opacity: '0.4', pointerEvents: 'none' } : {}}
          >
            <Slide direction="right" in={true} timeout={1000}>
              <Card sx={{ height: '100%' }}>
                <Grid container direction="column" sx={{ height: '100%' }}>
                  <Paper>
                    <Tabs value={value} onChange={handleChange} variant="fullWidth">
                      {Object.keys(hours).map((day) => (
                        <Tab data-testid="day-tab" value={day} label={day} key={day} />
                      ))}
                    </Tabs>
                  </Paper>
                  <SingleDayOpeningHours openingHours={hours} setOpeningHours={setHours} day={value} />
                </Grid>
              </Card>
            </Slide>
          </Grid>
          <Grid item lg={5} xs={10}>
            <Slide in={true} timeout={1000} direction="left">
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h2">Opening hours management</Typography>
                  <Grid style={{ marginTop: 10 }} item lg={11}>
                    <Typography variant="body1">
                      This is an important section of your business. Our great mission is to encourage you to update the
                      opening state of your place as frequently as it is possible. Your commitment will shortly result
                      with benefits:
                    </Typography>
                  </Grid>
                  <Alert sx={{ mt: 3, mb: 1 }} variant="outlined">
                    <AlertTitle>Information</AlertTitle>
                    Your visitors will stay up to date with your opening hours
                  </Alert>
                  <Alert sx={{ mb: 1 }} variant="outlined">
                    <AlertTitle>Reliability</AlertTitle>
                    Your business will be considered as reliable
                  </Alert>
                  <Alert variant="outlined">
                    <AlertTitle>Growth</AlertTitle>
                    Your customer basis will expand
                  </Alert>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
      <Slide timeout={500} in={true} direction="up">
        <Grid container>
          <Paper square sx={{ flexGrow: 1 }}>
            <Toolbar sx={{ flexGrow: 1 }}>
              <Grid container justifyContent="space-between">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        data-testid="checkbox"
                        onChange={(e) => setChecked(e.target.checked)}
                        checked={checked}
                      />
                    }
                    label="My place is always open"
                    labelPlacement="end"
                  />
                </FormGroup>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  onClick={saveChanges}
                  disabled={(!areHoursValid && !checked) || (checked && alwaysOpen)}
                  // (areOpeningHoursEqual(openingHours, currentPlace.openingHours) && !checked)}
                  size="large"
                  color="primary"
                >
                  Save changes
                </LoadingButton>
              </Grid>
            </Toolbar>
          </Paper>
        </Grid>
      </Slide>
      <OpeningHoursDialog
        locationId={locationId}
        placeId={placeId}
        openingHours={hours}
        selectedLocations={selectedLocations}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </Grid>
  );
};
