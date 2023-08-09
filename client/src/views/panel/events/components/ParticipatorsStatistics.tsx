import { NotificationsOutlined, Person} from '@mui/icons-material';
import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { useParams } from 'react-router';
import { useGetParticipatorsNotificationsStatisticsQuery, useGetParticipatorsStatisticsQuery } from 'store/api';
import { NotificationType } from 'store/api/types';

enum StatisticsType {
  NOTIFICATIONS,
  PARTICIPATORS,
}

const ParticipatorsChart = () => {
  const { locationId } = useParams();
  const { data: statistics, isLoading } = useGetParticipatorsStatisticsQuery(
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
        name: 'Participators',
        data: statistics.map((s) => s.participators),
      },
      {
        name: 'Subscribers',
        data: statistics.map((s) => s.subscribers),
      },
      {
        name: 'Real participators',
        data: statistics.map((s) => s.realParticipators),
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
        categories: statistics.map((s) => s.eventName),
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
            The following chart represents participation statistics of your events
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

const NotificationsChart = () => {
  const { locationId } = useParams();
  const { data: statistics, isLoading } = useGetParticipatorsNotificationsStatisticsQuery(
    {
      locationId: locationId as string,
    },
    { refetchOnMountOrArgChange: true },
  );

  const eventStats = statistics && statistics.filter((s) => s.type === NotificationType.EVENT);

  const chartData = useMemo(() => {
    if (!eventStats)
      return {
        series: [],
        options: undefined,
      };
    const series = [
      {
        name: 'Sent',
        data: eventStats.map((s) => s.all),
      },
      {
        name: 'Received',
        data: eventStats.map((s) => s.received),
      },
      {
        name: 'Clicked',
        data: eventStats.map((s) => s.clicked),
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
        categories: statistics.map((s) => s.eventName),
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
            The following chart represents notifications statistics of your events
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

export const ParticipatorsStatistics: FC = () => {
  const [statisticsType, setStatisticsType] = useState<StatisticsType>(StatisticsType.PARTICIPATORS);

  return (
    <Grid container alignItems="center" sx={{ flexGrow: 1, pt: 2, pb: 2 }} justifyContent="space-evenly">
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between">
              <Typography variant="h5">
                {statisticsType === StatisticsType.NOTIFICATIONS ? 'Notifications' : 'Participators'}
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
                  onClick={() => setStatisticsType(StatisticsType.PARTICIPATORS)}
                  startIcon={<Person />}
                  color="secondary"
                  variant="contained"
                >
                  Participators
                </Button>
              </div>
            </Grid>
            {statisticsType === StatisticsType.PARTICIPATORS && <ParticipatorsChart />}
            {statisticsType === StatisticsType.NOTIFICATIONS && <NotificationsChart />}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
