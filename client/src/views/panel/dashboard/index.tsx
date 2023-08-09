import { CircularProgress, Slide, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import React, { FC, useEffect, useState } from 'react';
import { useGetAllVisitsByUserIdQuery } from 'store/api';
import { VisitCount } from 'store/slices/PlaceProps';
import { ActivityChart } from './components/ActivityChart';
import { TotalOpinionsCard } from './components/TotalOpinionsCard';
import { TotalVisitsCard } from './components/TotalVisitsCard';

const generateVisitsData = (visits: VisitCount[]) => {
  let count = 0;
  return visits.map((visit) => {
    count += visit.visitCount;
    return [visit.date, count];
  });
};

export const Dashboard: FC = () => {
  //   const [mostPopularPlace, setMostPopularPlace] = useState<RawPlaceDataProps | null>(null);
  const [activityChartSeries, setActivityChartSeries] = useState<any>();
  const { data: totalVisitsData, isFetching, refetch } = useGetAllVisitsByUserIdQuery();

  useEffect(() => {
    console.log('renderrr');
  }, []);

  useEffect(() => {
    if (totalVisitsData) {
      console.log(totalVisitsData);
      const { locations } = totalVisitsData;
      setActivityChartSeries(
        locations.map((loc) => {
          return {
            name: loc.name,
            data: generateVisitsData(loc.visits),
          };
        }),
      );
      // //@ts-ignore
      // const mostPopularPlace = [...places].sort((a, b) => a.locations[0].visits.reduce((c, d) => c + d.visitCount, 0) - b.locations[0].visits.reduce((e, f) => e + f.visitCount, 0))[places.length - 1]
      // setMostPopularPlace(mostPopularPlace)
    }
  }, [totalVisitsData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Grid container sx={{ flexGrow: 1, height: '100%' }}>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        totalVisitsData && (
          <Grid container justifyContent="center" sx={{ pb: '50px', pt: '50px' }}>
            <Grid item lg={11} xs={10}>
              <Typography variant="h3">
                <Grid container>
                  <Grid item lg={10}>
                    Hello, {`${localStorage.getItem('fullName')?.split(' ')[0]}`}
                  </Grid>
                </Grid>
              </Typography>
              <Typography variant="body1">welcome to your personal dashboard</Typography>
              <Grid container style={{ marginTop: 20 }} spacing={2} justifyContent="space-between">
                <Grid item lg={6} xs={12}>
                  <TotalVisitsCard />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TotalOpinionsCard />
                </Grid>
                <Grid container item>
                  <Slide in={true} direction="up" timeout={1000}>
                    <Card sx={{ flexGrow: 1 }}>
                      <CardContent>
                        <Typography variant="h5">Activity</Typography>
                        <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                          The following chart represents historical data of user activity in your places
                        </Typography>
                        {activityChartSeries && (
                          <Grid item>
                            <ActivityChart series={activityChartSeries} />
                          </Grid>
                        )}
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
                {/* <Grid item lg={6}>
                                    <Fade in={true} timeout={2000}>
                                        <Card style={{ flexGrow: 1 }} >
                                            <CardContent>
                                                <Typography style={{ fontWeight: 'bold' }} variant="overline">Most popular location</Typography>
                                                <Grid container direction="column" alignItems="center">
                                                    <Avatar
                                                        // src="https://static.gazetka-24.pl/image/shop/auchan/logo_512.png"
                                                        src={`${mostPopularPlace?.logo}`}
                                                        alt={mostPopularPlace?.name}
                                                        style={{ height: 100, width: 100 }}
                                                    />
                                                    <Typography variant="h3" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                        {mostPopularPlace?.name}
                                                    </Typography>
                                                    <Typography variant="h6" style={{ textAlign: 'center' }} >
                                                        {mostPopularPlace?.subtitle}
                                                    </Typography>
                                                    <Grid container style={{ marginTop: 20 }} justifyContent="space-evenly">
                                                        <Grid item lg={4}>
                                                            <Card style={{ flexGrow: 1, marginRight: 10 }}>
                                                                <CardContent>
                                                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                                                    <Grid container direction="column" alignItems="center">
                                                                        <Typography variant="h4" style={{ borderBottom: '5px solid red', fontWeight: 'bold' }}>
                                                                            {
                                                                                //@ts-ignore
                                                                                mostPopularPlace?.locations[0].visits.reduce((a, b) => a + b.visitCount, 0)
                                                                            }

                                                                        </Typography>
                                                                        <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Visits today:
                                                                            {
                                                                                //@ts-ignore
                                                                                mostPopularPlace?.locations[0].visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
                                                                            }
                                                                        </Typography>

                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item lg={4}>
                                                            <Card style={{ flexGrow: 1, marginRight: 10 }}>
                                                                <CardContent>
                                                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                                                                    <Grid container alignItems="center" direction="column">
                                                                        <Typography variant="h4" style={{ borderBottom: '5px solid red', fontWeight: 'bold' }}>
                                                                            {
                                                                                // @ts-ignore
                                                                                mostPopularPlace?.locations[0].opinions.length
                                                                            }
                                                                        </Typography>
                                                                        <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Opinions today:
                                                                            {
                                                                                // @ts-ignore
                                                                                mostPopularPlace?.locations[0].opinions.filter(opinion => isToday(new Date(opinion.date))).length
                                                                            }
                                                                        </Typography>
                                                                    </Grid>

                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                        <Grid item lg={4}>
                                                            <Card style={{ flexGrow: 1 }}>
                                                                <CardContent>
                                                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Average note</Typography>
                                                                    <Grid style={{ height: 80 }} container alignItems="center" justifyContent="center" direction="column">

                                                                        <Rating
                                                                            value={
                                                                                //@ts-ignore
                                                                                mostPopularPlace?.locations[0].averageNote.average || 0
                                                                            }
                                                                            readOnly
                                                                        />
                                                                        <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Average</Typography>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        )
      )}
    </Grid>
  );
};
