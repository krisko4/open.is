import { FC } from 'react';
import { Reward } from 'redux-toolkit/api/types';
import { Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

interface Props {
  reward: Reward;
}
const RewardDetails: FC<Props> = ({ reward }) => {
  return (
    <Grid container sx={{ height: '100%' }} direction="column" alignItems="center" justifyContent="center">
      {reward.scheduledFor ? (
        <Typography variant="h5">
          You have scheduled your reward drawing for {format(new Date(reward.scheduledFor), 'dd-MM-yyyy')}
        </Typography>
      ) : (
        reward.date && (
          <Typography variant="h5">
            The rewards have been drawn at {format(new Date(reward.date), 'dd-MM-yyyy')}
          </Typography>
        )
      )}
      <Typography variant="h5">Reward description: {reward.description}</Typography>
      <Typography variant="h5">Winners percentage: {reward.rewardPercentage}%</Typography>
    </Grid>
  );
};

export default RewardDetails;
