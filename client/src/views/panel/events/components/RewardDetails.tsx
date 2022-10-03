import { Alert, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import InformationBox from 'components/InformationBox';
import { format } from 'date-fns';
import { FC, useMemo } from 'react';
import Countdown from 'react-countdown';
import Scrollbars from 'react-custom-scrollbars';
import { useGetCodesByRewardIdQuery } from 'store/api';
import { EventDetails, Reward } from 'store/api/types';
import WinnersChart from './WinnersChart';

interface Props {
  reward: Reward;
  event: EventDetails;
}
const RewardDetails: FC<Props> = ({ reward, event }) => {
  const { data: winners, isFetching } = useGetCodesByRewardIdQuery(reward._id);

  const participators = useMemo(() => {
    return event.participators.filter((p) => p.isSubscriber).length;
  }, [event]);
  if (isFetching) {
    return <CircularProgress />;
  } else
    return winners ? (
      <Scrollbars>
        <Grid container sx={{ p: 3 }} alignItems="center" direction="column">
          <Typography variant="h2">Rewards</Typography>
          <Alert variant="outlined" sx={{ mt: 1 }} severity="info">
            You have specified a reward for your event. Below you can find all the details regarding your reward.
          </Alert>
          {reward.date && (
            <Grid container justifyContent="center" sx={{ mt: 4, mb: 1 }}>
              <Grid item xs={4}>
                <InformationBox title="Participators" value={participators} />
              </Grid>
              <Grid item xs={4} sx={{ pl: 2 }}>
                <InformationBox title="Winners" value={winners.length} />
              </Grid>
              <Grid item xs={4} sx={{ pl: 2 }}>
                <InformationBox title="Drawing date" value={format(new Date(reward.date), 'yyyy-MM-dd hh:mm')} />
              </Grid>
              <Grid item sx={{ mt: 4 }} xs={8}>
                <WinnersChart winners={winners.length} nonWinners={participators - winners.length} />
              </Grid>
            </Grid>
          )}
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
              {reward.rewardPercentage}% of all participators have been selected to receive a reward
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
                    'dd-MM-yyyy hh:mm'
                  )}.`
                : reward.date && `The rewards were drawn at ${format(new Date(reward.date), 'dd-MM-yyyy HH:mm')}`}
            </Typography>
            {reward.scheduledFor && !reward.date && (
              <Grid container direction="column">
                <Typography variant="h6">Your reward drawing will take place in:</Typography>
                <Grid container justifyContent="center">
                  <Countdown date={reward.scheduledFor} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Scrollbars>
    ) : null;
};

export default RewardDetails;
