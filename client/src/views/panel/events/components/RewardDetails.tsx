import { InfoOutlined } from '@mui/icons-material';
import { Alert, CircularProgress, Divider, Grid, Tooltip, Typography } from '@mui/material';
import InformationBox from 'components/InformationBox';
import { format } from 'date-fns';
import { FC, useCallback, useMemo } from 'react';
import Countdown, { formatTimeDelta } from 'react-countdown';
import Scrollbars from 'react-custom-scrollbars';
import { useGetCodesByRewardIdQuery, useGetRewardByEventIdQuery } from 'store/api';
import { EventDetails, Reward } from 'store/api/types';
import WinnersChart from './WinnersChart';

interface Props {
  reward: Reward;
  event: EventDetails;
}

const displayTime = (time: number, label: string) => {
  return time ? `${time} ${label} ` : null;
};

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <Typography variant="h6">
        {displayTime(days, 'days')}
        {displayTime(hours, 'hours')}
        {displayTime(minutes, 'minutes')}
        {displayTime(seconds, 'seconds')}
      </Typography>
    );
  }
};

const RewardDetails: FC<Props> = ({ reward, event }) => {
  const { data: winners, isFetching } = useGetCodesByRewardIdQuery(reward._id);

  const { refetch } = useGetRewardByEventIdQuery(event._id);

  if (isFetching) {
    return <CircularProgress />;
  } else
    return winners ? (
      <Scrollbars>
        <Grid container sx={{ p: 3 }} alignItems="center" direction="column">
          <Typography variant="h2">Reward details</Typography>
          {reward.date && (
            <Grid container justifyContent="center" sx={{ mt: 4, mb: 1 }}>
              <Grid item container justifyContent="center" xs={10}>
                <Grid item xs={3}>
                  <InformationBox title="Drawing participators" value={reward.participators.length} />
                </Grid>
                <Grid item xs={3} sx={{ pl: 2 }}>
                  <InformationBox title="Winners" value={winners.length} />
                </Grid>
                <Grid item xs={3} sx={{ pl: 2 }}>
                  <InformationBox title="Winners" value={winners.length} />
                  <InformationBox
                    title={
                      <Grid container alignItems={'center'}>
                        Real winners
                        <Tooltip
                          arrow={true}
                          title="Real participator is a person who physically attended your event by scanning QR code"
                          placement="top"
                        >
                          <InfoOutlined style={{ marginLeft: '3px', width: '15px', height: '15px' }} />
                        </Tooltip>
                      </Grid>
                    }
                    value={1000000}
                  />
                </Grid>
                <Grid item xs={3} sx={{ pl: 2 }}>
                  <InformationBox title="Drawing date" value={format(new Date(reward.date), 'yyyy-MM-dd HH:mm')} />
                </Grid>
                <Alert variant="outlined" sx={{ mt: 2, width: '100%' }} severity="info">
                  {reward.rewardPercentage + '%'} of drawing participators have received a reward
                </Alert>
                <Grid item sx={{ mt: 4 }} xs={8}>
                  <WinnersChart winners={winners.length} nonWinners={reward.participators.length - winners.length} />
                </Grid>
                <Grid container sx={{ mt: 5 }}>
                  <Typography variant="h3">Description</Typography>
                </Grid>
                <Divider sx={{ width: '100%' }} />
                <Grid container sx={{ pt: 4, pb: 4 }}>
                  <Typography variant="h6">{reward.description}</Typography>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                  <Typography variant="h3">Winners percentage</Typography>
                </Grid>
                <Divider sx={{ width: '100%' }} />
                <Grid container sx={{ pt: 4, pb: 4 }}>
                  <Typography variant="h6">
                    <b>{reward.rewardPercentage}%</b> of all participators have been selected to receive a reward
                  </Typography>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                  <Typography variant="h3">Date</Typography>
                </Grid>
                <Divider sx={{ width: '100%' }} />
                <Grid container sx={{ pt: 4, pb: 4 }}>
                  <Typography variant="h6">
                    {reward.scheduledFor && !reward.date
                      ? `You have scheduled your reward drawing for ${format(
                          new Date(reward.scheduledFor),
                          'dd-MM-yyyy HH:mm',
                        )}.`
                      : reward.date && `The rewards were drawn at ${format(new Date(reward.date), 'dd-MM-yyyy HH:mm')}`}
                  </Typography>
                  {reward.scheduledFor && !reward.date && (
                    <Grid container direction="column">
                      <Typography variant="h6">Your reward drawing will take place in:</Typography>
                      <Grid container justifyContent="center">
                        {
                          //@ts-ignore
                          <Countdown onComplete={() => refetch()} renderer={renderer} date={reward.scheduledFor} />
                        }
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Scrollbars>
    ) : null;
};

export default RewardDetails;
