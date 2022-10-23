import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useGetNotificationStatisticsQuery } from 'store/api';
import { NotificationStatistics, NotificationType } from 'store/api/types';
import { GroupedNotificationStatistics } from 'utils/notification_statistics';
import StatsChart from './StatsChart';

interface Props {
  eventId: string;
}

enum Options {
  REWARD,
  EVENT,
  GEOLOCATION,
}

const formatString = (num: number, text: string) => (num === 1 ? text : `${text}s`);
const formatHave = (num: number) => (num === 1 ? 'has' : 'have');

const getStatistics = (selectedOption: Options, statistics: GroupedNotificationStatistics) => {
  const { eventStatistics, rewardStatistics, geolocationStatistics } = statistics;
  switch (selectedOption) {
    case Options.EVENT:
      return eventStatistics;
    case Options.REWARD:
      return rewardStatistics;
    case Options.GEOLOCATION:
      return geolocationStatistics;
    default:
      return undefined;
  }
};

const renderStatistics = (selectedOption: Options, stats?: NotificationStatistics) =>
  !stats
    ? null
    : [
        {
          text:
            selectedOption === Options.EVENT || selectedOption === Options.GEOLOCATION
              ? `A notification about your event has been sent to ${stats.all} ${formatString(
                  stats.all,
                  selectedOption === Options.EVENT ? 'subscriber' : 'participator'
                )}`
              : `A notification about your reward has been sent to ${stats.all} ${formatString(
                  stats.all,
                  'participator'
                )}`,

          series: [stats.all],
          legend: ['Sent', 'Not sent'],
        },
        {
          text: `${stats.received} ${formatString(
            stats.received,
            selectedOption === Options.EVENT ? 'subscriber' : 'participator'
          )} ${formatHave(stats.received)} received a notification`,
          series: [stats.received, stats.all - stats.received],
          chartFirst: true,
          legend: ['Received', 'Not received'],
        },
        {
          text: `${stats.clicked} ${formatString(
            stats.clicked,
            selectedOption === Options.EVENT ? 'subscriber' : 'participator'
          )} ${formatHave(stats.clicked)} clicked on a notification`,
          series: [stats.clicked, stats.all - stats.clicked],
          legend: ['Clicked', 'Not clicked'],
        },
      ];

const Statistics: FC<Props> = ({ eventId }) => {
  const { data: statistics, isFetching } = useGetNotificationStatisticsQuery(eventId, {
    refetchOnMountOrArgChange: true,
  });
  const [selectedOption, setSelectedOption] = useState<Options>(Options.EVENT);

  console.log(statistics);

  return (
    <>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        statistics && (
          <Scrollbars>
            <Grid container sx={{ pt: 3, pb: 3, height: '100%' }} justifyContent="center">
              <Typography variant="h2">Statistics</Typography>
              <Grid container justifyContent="flex-end" sx={{ pr: 2 }}>
                <Button
                  disabled={!statistics.rewardStatistics}
                  variant="contained"
                  onClick={() => setSelectedOption(Options.REWARD)}
                  color="success"
                >
                  Rewards
                </Button>
                <Button sx={{ ml: 1 }} variant="contained" onClick={() => setSelectedOption(Options.EVENT)}>
                  Event
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  color="secondary"
                  disabled={!statistics.geolocationStatistics}
                  onClick={() => setSelectedOption(Options.GEOLOCATION)}
                >
                  Geolocation
                </Button>
              </Grid>
              {renderStatistics(selectedOption, getStatistics(selectedOption, statistics))?.map((stat) => (
                <Grid key={stat.text} container sx={{ pt: 3 }} alignItems="center" justifyContent="space-evenly">
                  {stat.chartFirst ? (
                    <>
                      <Grid item xs={5}>
                        <StatsChart legend={stat.legend} series={stat.series} />
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="h6">{stat.text}</Typography>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={5}>
                        <Typography variant="h6">{stat.text}</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <StatsChart legend={stat.legend} series={stat.series} />
                      </Grid>
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
          </Scrollbars>
        )
      )}
    </>
  );
};

export default Statistics;
