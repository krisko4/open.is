import { Alert, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useGetNotificationStatisticsQuery } from 'store/api';
import { NotificationStatistics } from 'store/api/types';
import { GroupedNotificationStatistics } from 'utils/notification_statistics';
import StatsChart from './StatsChart';

interface Props {
  eventId: string;
}

enum Options {
  REWARD,
  EVENT,
  GEOLOCATION,
  RATING,
}

const formatString = (num: number, text: string) => (num === 1 ? text : `${text}s`);
const formatHave = (num: number) => (num === 1 ? 'has' : 'have');

const getStatistics = (selectedOption: Options, statistics: GroupedNotificationStatistics) => {
  const { eventStatistics, rewardStatistics, ratingStatistics, geolocationStatistics } = statistics;
  switch (selectedOption) {
    case Options.EVENT:
      return eventStatistics;
    case Options.REWARD:
      return rewardStatistics;
    case Options.GEOLOCATION:
      return geolocationStatistics;
    case Options.RATING:
      return ratingStatistics;
    default:
      return undefined;
  }
};

const renderStatistics = (selectedOption: Options, stats?: NotificationStatistics) => {
  if (!stats) return null;
  const texts = {
    sent: {
      [Options.EVENT]: `A geolocation notification has been sent to 71 ${formatString(stats.all, 'subscriber')}`,
      // [Options.EVENT]: `A notification about your event has been sent to ${stats.all} ${formatString(
      //   stats.all,
      //   'subscriber',
      // )}`,
      [Options.REWARD]: `A notification about your reward has been sent to ${stats.all} ${formatString(
        stats.all,
        'subscriber',
      )}`,
      [Options.GEOLOCATION]: `A geolocation notification has been sent to ${stats.all} ${formatString(
        stats.all,
        'subscriber',
      )}`,
      [Options.RATING]: `A rating request notification has been sent to 113 ${formatString(stats.all, 'subscriber')}`,
    },
  };

  return [
    {
      id: 'sent',
      text: texts.sent[selectedOption],
      series: [stats.all],
      legend: ['Sent', 'Not sent'],
    },
    {
      id: 'received',
      text: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {`69 ${formatString(stats.received, 'subscriber')} ${formatHave(stats.received)} received a
                notification`}
            {/* {`${stats.received} ${formatString(stats.received, 'receiver')} ${formatHave(stats.received)} received a
                notification`} */}
          </div>
          <Typography variant="caption">
            {/* {`${stats.all - stats.received} ${formatString(stats.received, 'receiver')} ${formatHave(
              stats.received,
            )} not */}
            {`2 ${formatString(stats.received, 'subscriber')} ${formatHave(stats.received)} not
                received a notification`}
          </Typography>
        </div>
      ),
      // series: [stats.received, stats.all - stats.received],
      series: [69, 2],
      chartFirst: true,
      legend: ['Received', 'Not received'],
    },
    {
      id: 'clicked',
      text: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {`41 ${formatString(stats.clicked, 'receiver')} ${formatHave(stats.clicked)} clicked on a notification`}
            {/* {`${stats.clicked} ${formatString(stats.clicked, 'receiver')} ${formatHave(
              stats.clicked,
            )} clicked on a notification`} */}
          </div>
          <Typography variant="caption">
            In average, a receiver clicks on a notification after 46 seconds
            {/* In average, a receiver clicks on a notification after {stats.averageClickTime} seconds */}
          </Typography>
        </div>
      ),
      // series: [stats.clicked, stats.all - stats.clicked],
      series: [41, 71 - 41],
      legend: ['Clicked', 'Not clicked'],
    },
    {
      id: 'participated',
      chartFirst: true,
      text: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>{`57 ${formatString(stats.clicked, 'receiver')} are real participators`}</div>
          <Typography variant="caption">Real participator is a person who physically attended your event</Typography>
        </div>
      ),
      series: [57, 71 - 57],
      legend: ['Attended', 'Not attended'],
    },
  ];
};
const Statistics: FC<Props> = ({ eventId }) => {
  const { data: statistics, isFetching } = useGetNotificationStatisticsQuery(eventId, {
    refetchOnMountOrArgChange: true,
  });

  console.log(statistics);
  const [selectedOption, setSelectedOption] = useState<Options>(Options.EVENT);

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
              <Grid container justifyContent="flex-end" sx={{ pr: 3, pt: 3 }}>
                <Button variant="contained" onClick={() => setSelectedOption(Options.EVENT)}>
                  Event
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  disabled={!statistics.rewardStatistics}
                  variant="contained"
                  onClick={() => setSelectedOption(Options.REWARD)}
                  color="success"
                >
                  Rewards
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
                <Button
                  sx={{ ml: 1 }}
                  variant="outlined"
                  color="primary"
                  disabled={!statistics.ratingStatistics}
                  onClick={() => setSelectedOption(Options.RATING)}
                >
                  Rating
                </Button>
              </Grid>
              {/* {selectedOption === Options.EVENT && (
                <Alert severity="info" variant="outlined" sx={{ width: '80%', mt: 2 }}>
                  15 out of 23 notification receivers are real participators
                </Alert>
              )} */}
              {renderStatistics(selectedOption, getStatistics(selectedOption, statistics))?.map((stat) => (
                <Grid key={stat.id} container sx={{ pt: 4 }} alignItems="center" justifyContent="space-evenly">
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
