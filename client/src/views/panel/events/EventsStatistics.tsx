import { EmojiEvents, Person, RateReview } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { ParticipatorsStatistics } from './components/ParticipatorsStatistics';
import { RatingsStatistics } from './components/RatingsStatistics';
import { RewardsStatistics } from './components/RewardsStatistics';

enum StatisticsType {
  REWARDS,
  PARTICIPATORS,
  RATINGS,
}

export const EventsStatistics = () => {
  const [selectedOption, setSelectedOption] = useState<StatisticsType>(StatisticsType.PARTICIPATORS);
  return (
    <Grid container sx={{ p: 2 }} justifyContent="space-evenly">
      <Grid sx={{ mb: 1 }} container justifyContent="flex-end">
        <Grid item>
          <Button
            startIcon={<Person />}
            variant="contained"
            color="secondary"
            onClick={() => setSelectedOption(StatisticsType.PARTICIPATORS)}
          >
            Participators
          </Button>
          <Button
            sx={{ ml: 1 }}
            startIcon={<EmojiEvents />}
            variant="contained"
            onClick={() => setSelectedOption(StatisticsType.REWARDS)}
          >
            Rewards
          </Button>
          <Button
            sx={{ ml: 1 }}
            startIcon={<RateReview />}
            variant="outlined"
            onClick={() => setSelectedOption(StatisticsType.RATINGS)}
          >
            Ratings
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        {selectedOption === StatisticsType.PARTICIPATORS && <ParticipatorsStatistics />}
        {selectedOption === StatisticsType.REWARDS && <RewardsStatistics />}
        {selectedOption === StatisticsType.RATINGS && <RatingsStatistics />}
      </Grid>
    </Grid>
  );
};
