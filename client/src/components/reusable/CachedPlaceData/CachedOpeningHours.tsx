import AddIcon from '@mui/icons-material/Add';
import { Fade, Button, Grid, Typography, CircularProgress } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOpeningHoursForSelectedLocationQuery } from 'redux-toolkit/api/placesApi';
import { useColorMode } from '../../../contexts/ColorModeContext';
import { OpeningHoursCard } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHoursCard';
import { Destinations } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/PlaceBoard';

export const CachedOpeningHours: FC = () => {
  const { mode } = useColorMode();
  const { locationId, placeId } = useParams();
  const { data, isFetching } = useGetOpeningHoursForSelectedLocationQuery(locationId as string);
  const navigate = useNavigate();
  const navigateToOpeningHours = () => {
    navigate(`/panel/management/${placeId}/${locationId}/${Destinations.OPENING_HOURS}`);
  };
  return (
    <Fade in={true} timeout={500}>
      <Grid container direction="column" style={{ height: '100%' }} alignItems="center">
        {isFetching ? (
          <Grid container sx={{ flexGrow: 1 }} justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          data && (
            <>
              {data.openingHours || data.alwaysOpen ? (
                <Grid container style={{ flexGrow: 1 }} justifyContent="center" alignItems="center">
                  {data.alwaysOpen ? (
                    <>
                      <img
                        style={{ width: '100%' }}
                        src={
                          mode === 'light'
                            ? `${process.env.REACT_APP_BASE_URL}/images/open24light.png`
                            : `${process.env.REACT_APP_BASE_URL}/images/open24dark.gif`
                        }
                      />
                    </>
                  ) : (
                    <Grid item lg={10}>
                      <OpeningHoursCard openingHours={data.openingHours} />
                    </Grid>
                  )}
                </Grid>
              ) : (
                <>
                  <Grid
                    justifyContent="center"
                    style={{ height: '100%' }}
                    direction="column"
                    alignItems="center"
                    container
                  >
                    <Typography variant="h6">Opening hours have not been specified yet.</Typography>
                    <Typography variant="subtitle1">Press the button below to set opening hours.</Typography>
                    <Button
                      startIcon={<AddIcon />}
                      style={{ marginTop: 10 }}
                      onClick={() => navigateToOpeningHours()}
                      variant="contained"
                      color="primary"
                    >
                      Set opening hours
                    </Button>
                  </Grid>
                  {/* {isUserOwner ?
                                        <Grid justifyContent="center" style={{ height: '100%' }} direction="column" alignItems="center" container>
                                            <Typography variant="h6">Opening hours have not been specified yet.</Typography>
                                            <Typography variant="subtitle1">Press the button below to set opening hours.</Typography>
                                            <Button
                                                startIcon={<AddIcon />}
                                                style={{ marginTop: 10 }}
                                                onClick={() => navigateToOpeningHours()}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Set opening hours
                                            </Button>
                                        </Grid>
                                        :
                                        <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                                            <Grid item lg={10}>
                                                <OpeningHoursCard openingHours={defaultHours} />
                                                <Typography variant="subtitle1">This is just an example. You will be able to specify opening hours after your place is registered.</Typography>
                                            </Grid>
                                        </Grid>
                                    } */}
                </>
              )}
            </>
          )
        )}
      </Grid>
    </Fade>
  );
};
