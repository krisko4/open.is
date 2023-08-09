import { CircularProgress, Grid, Typography } from '@mui/material';
import { format, isBefore } from 'date-fns';
import { FC, useState } from 'react';
import { useGetEventByIdQuery, useGetRewardByEventIdQuery } from 'store/api';
import { RewardDrawingOptions } from '../enums';
import { EventFinished } from './EventFinished';
import { NewReward } from './NewReward';
import { NoRewards } from './NoRewards';
import RewardDetails from './RewardDetails';

interface Props {
  eventId: string;
}

export const Rewards: FC<Props> = ({ eventId }) => {
  const [selectedOption, setSelectedOption] = useState<RewardDrawingOptions | null>(
    RewardDrawingOptions.NO_REWARD_DRAWINGS,
  );
  const { data: reward, isFetching } = useGetRewardByEventIdQuery(eventId, { refetchOnMountOrArgChange: true });
  const { data: event } = useGetEventByIdQuery(eventId);

  return (
    <Grid container sx={{ height: '100%' }}>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        event && (
          <>
            {reward ? (
              <RewardDetails event={event} reward={reward} />
            ) : isBefore(new Date(event.endDate), new Date()) ? (
              <EventFinished />
            ) : (
              <>
                {selectedOption === RewardDrawingOptions.NEW_REWARD_DRAWING ? (
                  <NewReward eventId={eventId} />
                ) : (
                  <NoRewards setSelectedOption={setSelectedOption} />
                )}
              </>
            )}
          </>
        )
      )}
    </Grid>
  );
};
