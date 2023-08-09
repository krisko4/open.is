import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Card, CardContent, CircularProgress, Fade, Grid, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetVisitsForSelectedLocationQuery } from 'store/api';

export const TotalVisits: FC = () => {
  const { locationId } = useParams();
  const { data: visits, isFetching } = useGetVisitsForSelectedLocationQuery(locationId as string, {
    refetchOnMountOrArgChange: true,
  });

  const visitsDiff = useMemo(() => {
    if (visits) {
      const { total, today } = visits;
      if (total === today) {
        return today * 100;
      }
      return Math.round(((total / (total - today)) * 100 - 100) * 10) / 10;
    }
    return 0;
  }, [visits]);

  return (
    <Fade in={true} timeout={2000}>
      <Card sx={{ height: '170px' }}>
        <CardContent>
          <Grid container direction="column">
            <Typography style={{ fontWeight: 'bold' }} variant="overline">
              Total visits
            </Typography>
            <Grid container style={{ marginTop: 5, flexGrow: 1 }}>
              <Grid item lg={6} container justifyContent="center" direction="column">
                <Fade in={true}>
                  <div>
                    {isFetching ? (
                      <CircularProgress />
                    ) : (
                      visits && (
                        <>
                          <Grid container alignItems="center">
                            {visitsDiff === 0 ? (
                              <>
                                <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                              </>
                            ) : (
                              <>
                                <TrendingUpIcon style={{ color: '#03C03C' }} />
                                <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {visitsDiff}%</span>
                              </>
                            )}
                          </Grid>
                          <Typography variant="h3">{visits.total}</Typography>
                        </>
                      )
                    )}
                  </div>
                </Fade>
              </Grid>
              {/* <Grid item lg={6} container justifyContent="center">
                            <TotalVisitsChart visits={currentPlace.visits} />
                        </Grid> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );
};
