import Scrollbars from 'react-custom-scrollbars';
import { Paper, Divider, Typography, Grid, Alert } from '@mui/material';
import { useMemo, FC } from 'react';
import { EventData, Participator } from 'redux-toolkit/api/types';
import { ParticipatorList } from './ParticipatorList';
import InformationBox from 'components/InformationBox';
import ParticipatorChart from './ParticipatorChart';

interface Props {
  participators: Participator[];
}

export const Participators: FC<Props> = ({ participators }) => {
  const subPercentage = useMemo(() => {
    let count = 0;
    if (participators.length === 0) return 0;
    participators.forEach((participator) => {
      if (participator.isSubscriber) {
        count++;
      }
    });
    return (count / participators.length) * 100;
  }, [participators]);

  const subscribers = useMemo(() => participators.filter((participator) => participator.isSubscriber), [participators]);
  const nonSubscribers = useMemo(
    () => participators.filter((participator) => !participator.isSubscriber),
    [participators]
  );

  return (
    <Paper sx={{ height: '100%', flexGrow: 1 }}>
      <Scrollbars>
        <div style={{ flexGrow: 1 }}>
          <Grid container justifyContent="center" sx={{ pt: 3, pb: 3 }}>
            <Typography variant="h2">Participators</Typography>
            {participators.length === 0 ? (
              <Grid container justifyContent="center">
                <Typography variant="h6">Currently your event has no participators</Typography>
              </Grid>
            ) : (
              <Grid item xs={10}>
                <Grid container sx={{ mt: 1, mb: 1 }} justifyContent="space-between">
                  <Grid item xs={3}>
                    <InformationBox title="Participators" value={participators.length} />
                  </Grid>
                  <Grid item xs={3}>
                    <InformationBox title="Subscribers" value={subscribers.length} />
                  </Grid>
                  <Grid item xs={3}>
                    <InformationBox title="Non-subscribers" value={nonSubscribers.length} />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Alert variant="outlined" sx={{ mt: 1, mb: 1, width: '100%' }} severity="info">
                    {subPercentage === 0
                      ? 'No participators are subscribing your business'
                      : `${subPercentage}% of all participators are subscribers`}
                  </Alert>
                  <Grid item xs={8}>
                    <ParticipatorChart subscribers={subscribers.length} nonSubscribers={nonSubscribers.length} />
                  </Grid>
                </Grid>
                <Divider sx={{ pt: 1, pb: 1 }} />
                <ParticipatorList participators={participators} />
              </Grid>
            )}
          </Grid>
        </div>
      </Scrollbars>
    </Paper>
  );
};
