import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { RewardDrawingOptions } from '../../enums';
import { NewReward } from './NewReward';
import { NoRewards } from './NoRewards';

const REWARDS = [];

export const Rewards: FC = () => {
  const [selectedOption, setSelectedOption] = useState<RewardDrawingOptions | null>(
    RewardDrawingOptions.NO_REWARD_DRAWINGS
  );
  return (
    <Grid container sx={{ height: '100%' }}>
      {selectedOption === RewardDrawingOptions.NO_REWARD_DRAWINGS && (
        <NoRewards setSelectedOption={setSelectedOption} />
      )}
      {selectedOption === RewardDrawingOptions.NEW_REWARD_DRAWING && <NewReward />}
    </Grid>
  );
};
