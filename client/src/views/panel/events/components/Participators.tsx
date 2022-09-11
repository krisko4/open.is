import { Alert, Divider, Grid, Paper, Slide, Typography } from '@mui/material';
import InformationBox from 'components/InformationBox';
import { FC, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { EventData, Participator } from 'store/api/types';
import ParticipatorChart from './ParticipatorChart';
import { ParticipatorList } from './ParticipatorList';

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
    <Slide in={true} direction="left">
      <Paper sx={{ height: '100%', flexGrow: 1 }}>
        <Scrollbars>
          <div style={{ flexGrow: 1, height: participators.length === 0 ? '100%' : 'auto' }}>
            <Grid container alignItems="center" direction="column" sx={{ pt: 3, height: '100%', pb: 3 }}>
              <Typography variant="h2">Participators</Typography>
              {participators.length === 0 ? (
                <>
                  <Alert variant="outlined" sx={{ mt: 1, mb: 1, width: '80%' }} severity="info">
                    Currently your event has no participators
                  </Alert>
                  <Grid container sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center">
                    <div>
                      <img src="https://gifdb.com/images/thumbnail/waiting-sad-pablo-narcos-zz7uiyio8n4g1yra.gif" />
                    </div>
                  </Grid>
                </>
              ) : (
                <Grid container justifyContent="center">
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
                </Grid>
              )}
            </Grid>
          </div>
        </Scrollbars>
      </Paper>
    </Slide>
  );
};
