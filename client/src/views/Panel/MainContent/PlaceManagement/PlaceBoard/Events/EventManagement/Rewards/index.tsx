import { Grid, CircularProgress, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useGetRewardByLocationIdQuery } from 'redux-toolkit/api';
import { RewardDrawingOptions } from '../../enums';
import { NewReward } from './NewReward';
import { NoRewards } from './NoRewards';
import RewardDetails from './RewardDetails';
import { format } from 'date-fns';

interface Props {
  eventId: string;
}

export const Rewards: FC<Props> = ({ eventId }) => {
  const [selectedOption, setSelectedOption] = useState<RewardDrawingOptions | null>(
    RewardDrawingOptions.NO_REWARD_DRAWINGS
  );
  const { data: reward, isFetching } = useGetRewardByLocationIdQuery(eventId);

  return (
    <Grid container sx={{ height: '100%' }}>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : reward ? (
        <RewardDetails reward={reward} />
      ) : (
        <>
          {selectedOption === RewardDrawingOptions.NEW_REWARD_DRAWING ? (
            <NewReward />
          ) : (
            <NoRewards setSelectedOption={setSelectedOption} />
          )}
        </>
      )}
    </Grid>
  );
};
