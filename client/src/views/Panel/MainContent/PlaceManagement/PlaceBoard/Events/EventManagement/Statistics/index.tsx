import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useGetNotificationStatisticsQuery } from 'redux-toolkit/api';
import { NotificationStatistics, NotificationType } from 'redux-toolkit/api/types';
import StatsChart from './StatsChart';

interface Props {
  eventId: string;
}

enum Options {
  REWARD,
  EVENT,
}

const formatString = (num: number, text: string) => (num === 1 ? text : `${text}s`);
const formatHave = (num: number) => (num === 1 ? 'has' : 'have');

const renderStatistics = (selectedOption: Options, stats?: NotificationStatistics) =>
  !stats
    ? null
    : [
        {
          text:
            selectedOption === Options.EVENT
              ? `A notification about your event has been sent to ${stats.all} ${formatString(stats.all, 'subscriber')}`
              : `A notification about your reward has been sent to ${stats.all} ${formatString(
                  stats.all,
                  'participator'
                )}`,

          series: [stats.all],
        },
        {
          text:
            selectedOption === Options.EVENT
              ? `${stats.received} ${formatString(stats.received, 'subscriber')} ${formatHave(
                  stats.received
                )} received a notification`
              : `${stats.received} ${formatString(stats.received, 'participator')} ${formatHave(
                  stats.received
                )} received a notification`,
          series: [stats.received, stats.all],
          chartFirst: true,
        },
        {
          text:
            selectedOption === Options.EVENT
              ? `${stats.clicked} ${formatString(stats.clicked, 'subscriber')} ${formatHave(
                  stats.clicked
                )} clicked on a notification`
              : `${stats.clicked} ${formatString(stats.clicked, 'participator')} ${formatHave(
                  stats.clicked
                )} clicked on a notification`,
          series: [stats.clicked, stats.all],
        },
      ];

const Statistics: FC<Props> = ({ eventId }) => {
  const { data: statistics, isFetching } = useGetNotificationStatisticsQuery(eventId);
  const [selectedOption, setSelectedOption] = useState<Options>(Options.EVENT);

  const eventStatistics = useMemo(() => {
    if (statistics) {
      return statistics.find((s) => s.type === NotificationType.EVENT);
    }
  }, [statistics]);

  const rewardStatistics = useMemo(() => {
    if (statistics) {
      return statistics.find((s) => s.type === NotificationType.REWARD);
    }
  }, [statistics]);

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
                  disabled={!rewardStatistics}
                  variant="contained"
                  onClick={() => setSelectedOption(Options.REWARD)}
                  color="success"
                >
                  Reward
                </Button>
                <Button sx={{ ml: 1 }} variant="contained" onClick={() => setSelectedOption(Options.EVENT)}>
                  Event
                </Button>
              </Grid>
              {renderStatistics(
                selectedOption,
                selectedOption === Options.EVENT ? eventStatistics : rewardStatistics
              )?.map((stat) => (
                <Grid key={stat.text} container sx={{ pt: 3 }} alignItems="center" justifyContent="space-evenly">
                  {stat.chartFirst ? (
                    <>
                      <Grid item xs={5}>
                        <StatsChart series={stat.series} />
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
                        <StatsChart series={stat.series} />
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
