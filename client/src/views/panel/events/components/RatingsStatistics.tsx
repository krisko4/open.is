import { NotificationsOutlined, RateReview } from '@mui/icons-material';
import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { useParams } from 'react-router';
import { useGetRatingsNotificationsStatisticsQuery, useGetRatingsStatisticsQuery } from 'store/api';

enum StatisticsType {
  NOTIFICATIONS,
  RATINGS,
}

const notistats = [
  {
    eventName: 'Wieczorny grill',
    all: 113,
    received: 100,
    clicked: 57,
  },
  {
    eventName: 'Piknik pod gwiazdami⭐',
    all: 94,
    received: 86,
    clicked: 36,
  },
  { eventName: 'Saturday Whisky Night🥃', all: 37, received: 36, clicked: 20 },
];

const ratingstats = [
  {
    eventName: 'Wieczorny grill',
    ones: 0,
    twos: 5,
    threes: 10,
    fours: 15,
    fives: 20,
  },
  {
    eventName: 'Piknik pod gwiazdami⭐',
    ones: 0,
    twos: 0,
    threes: 20,
    fours: 10,
    fives: 5,
  },
  { eventName: 'Saturday Whisky Night🥃', ones: 4, twos: 5, threes: 2, fours: 4, fives: 1 },
];

const NotificationsChart = () => {
  const { locationId } = useParams();
  const { data: statistics, isLoading } = useGetRatingsNotificationsStatisticsQuery(
    {
      locationId: locationId as string,
    },
    { refetchOnMountOrArgChange: true },
  );

  console.log(statistics);

  const chartData = useMemo(() => {
    if (!statistics)
      return {
        series: [],
        options: undefined,
      };
    const series = [
      {
        name: 'Sent',
        data: notistats.map((s) => s.all),
      },
      {
        name: 'Received',
        data: notistats.map((s) => s.received),
      },
      {
        name: 'Clicked',
        data: notistats.map((s) => s.clicked),
      },
    ];

    const options = {
      chart: {
        type: 'bar',
        // height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        colors: ['transparent'],
      },
      xaxis: {
        categories: notistats.map((s) => s.eventName),
      },
      fill: {
        opacity: 1,
      },
    };
    return { options, series };
  }, [statistics]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
            The following chart represents notifications statistics of your ratings
          </Typography>
          {
            //@ts-ignore
            <ApexChart type="bar" {...chartData} />
          }
        </>
      )}
    </>
  );
};

const RatingsChart = () => {
  const { locationId } = useParams();
  const { data: statistics, isLoading } = useGetRatingsStatisticsQuery(
    {
      locationId: locationId as string,
    },
    { refetchOnMountOrArgChange: true },
  );

  const chartData = useMemo(() => {
    if (!statistics)
      return {
        series: [],
        options: undefined,
      };
    const series = [
      {
        name: '⭐',
        data: ratingstats.map((s) => s.ones),
      },
      {
        name: '⭐⭐',
        data: ratingstats.map((s) => s.twos),
      },
      {
        name: '⭐⭐⭐',
        data: ratingstats.map((s) => s.threes),
      },
      {
        name: '⭐⭐⭐⭐',
        data: ratingstats.map((s) => s.fours),
      },
      {
        name: '⭐⭐⭐⭐⭐',
        data: ratingstats.map((s) => s.fives),
      },
    ];

    const options = {
      chart: {
        type: 'bar',
        // height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ratingstats.map((s) => s.eventName),
      },
      fill: {
        opacity: 1,
      },
    };
    return { options, series };
  }, [statistics]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
            The following chart represents ratings statistics of your events
          </Typography>
          {
            //@ts-ignore
            <ApexChart type="bar" {...chartData} />
          }
        </>
      )}
    </>
  );
};

export const RatingsStatistics: FC = () => {
  const [statisticsType, setStatisticsType] = useState<StatisticsType>(StatisticsType.RATINGS);

  return (
    <Grid container alignItems="center" sx={{ flexGrow: 1, pt: 2, pb: 2 }} justifyContent="space-evenly">
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between">
              <Typography variant="h5">
                {statisticsType === StatisticsType.NOTIFICATIONS ? 'Notifications' : 'Ratings'}
              </Typography>
              <div>
                <Button
                  onClick={() => setStatisticsType(StatisticsType.NOTIFICATIONS)}
                  startIcon={<NotificationsOutlined />}
                  variant="contained"
                >
                  Notifications
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  onClick={() => setStatisticsType(StatisticsType.RATINGS)}
                  startIcon={<RateReview />}
                  color="secondary"
                  variant="contained"
                >
                  Ratings
                </Button>
              </div>
            </Grid>
            {statisticsType === StatisticsType.RATINGS && <RatingsChart />}
            {statisticsType === StatisticsType.NOTIFICATIONS && <NotificationsChart />}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
