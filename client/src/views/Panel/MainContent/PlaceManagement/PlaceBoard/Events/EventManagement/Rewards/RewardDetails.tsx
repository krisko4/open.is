import { FC } from 'react';
import { Reward } from 'redux-toolkit/api/types';
import { Grid, Alert, Typography, Divider } from '@mui/material';
import { format } from 'date-fns';
import Countdown from 'react-countdown';
import InformationBox from 'components/InformationBox';
import WinnersChart from './WinnersChart';

interface Props {
  reward: Reward;
}
const RewardDetails: FC<Props> = ({ reward }) => {
  return (
    <Grid container sx={{ p: 3 }} alignItems="center" direction="column">
      <Typography variant="h2">Rewards</Typography>
      <Alert variant="outlined" sx={{ mt: 1 }} severity="info">
        You have specified a reward for your event. Below you can find all the details regarding your reward.
      </Alert>
      {reward.date && (
        <Grid container justifyContent="center" sx={{ mt: 4, mb: 1 }}>
          <Grid item xs={3}>
            <InformationBox title="Participators" value={5050505050} />
          </Grid>
          <Grid item xs={3} sx={{ ml: 2 }}>
            <InformationBox title="Winners" value={100} />
          </Grid>
          <Grid item xs={3} sx={{ ml: 2 }}>
            <InformationBox title="Drawing date" value={'24-02-1998'} />
          </Grid>
          <Grid item sx={{ mt: 4 }} xs={8}>
            <WinnersChart winners={100} nonWinners={200} />
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
          {reward.scheduledFor
            ? `You have scheduled your reward drawing for ${format(new Date(reward.scheduledFor), 'dd-MM-yyyy')}`
            : reward.date && `The rewards have been drawn at ${format(new Date(reward.date), 'dd-MM-yyyy HH:mm')}`}
        </Typography>
        {reward.scheduledFor && (
          <Grid container justifyContent="center">
            <Typography variant="h6">Your reward drawing will take place in:</Typography>
            <Countdown date={reward.scheduledFor} />,
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default RewardDetails;
