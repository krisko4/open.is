import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Card, CardContent, CircularProgress, Fade, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetVisitsForSelectedLocationQuery } from 'redux-toolkit/api';

export const VisitsToday: FC = () => {
  const [visitsToday, setVisitsToday] = useState(0);
  const [visitsYesterday, setVisitsYesterday] = useState(0);
  const { locationId } = useParams();
  const { data: visits, isFetching } = useGetVisitsForSelectedLocationQuery(locationId as string);

  useEffect(() => {
    if (visits) {
      setVisitsYesterday(visits.yesterday);
      setVisitsToday(visits.today);
    }
  }, [visits]);

  return (
    <Fade in={true} timeout={2200}>
      <Card sx={{ height: '170px' }}>
        <CardContent>
          <>
            <Typography style={{ fontWeight: 'bold' }} variant="overline">
              Visits today
            </Typography>
            <Grid container style={{ marginTop: 5 }}>
              <Grid item lg={6} container justifyContent="center" direction="column">
                <Fade in={true} timeout={500}>
                  <div>
                    {isFetching ? (
                      <CircularProgress />
                    ) : (
                      visits && (
                        <>
                          <Grid container alignItems="center">
                            {visitsToday === visitsYesterday || visits.total === 0 ? (
                              <>
                                <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                <span style={{ marginLeft: 5, color: '#ffbf00' }}>0</span>
                              </>
                            ) : visitsToday - visitsYesterday > 0 ? (
                              <>
                                <TrendingUpIcon style={{ color: '#03C03C' }} />
                                <span style={{ marginLeft: 5, color: '#03C03C' }}>
                                  + {visitsToday - visitsYesterday}
                                </span>
                              </>
                            ) : (
                              <>
                                <TrendingDownIcon style={{ color: 'red' }} />
                                <span style={{ marginLeft: 5, color: 'red' }}> {visitsToday - visitsYesterday}</span>
                              </>
                            )}
                          </Grid>
                          <Typography variant="h3">{visitsToday}</Typography>
                        </>
                      )
                    )}
                  </div>
                </Fade>
              </Grid>
              {/* <Grid item lg={6} container justifyContent="center">
                            <CardMedia style={{ height: 100, width: 120 }} />
                        </Grid> */}
            </Grid>
          </>
        </CardContent>
      </Card>
    </Fade>
  );
};
