import { InfoOutlined } from '@mui/icons-material';
import { Alert, Divider, Grid, IconButton, Paper, Slide, Tooltip, Typography } from '@mui/material';
import InformationBox from 'components/InformationBox';
import { FC, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Participator } from 'store/api/types';
import { ParticipatorList } from './ParticipatorList';
import ParticipatorsChart from './ParticipatorsChart';
import { default as SubscribersChart } from './SubscribersChart';

interface Props {
  participators: Participator[];
}

export const Participators: FC<Props> = ({ participators }) => {
  const stats = useMemo(() => {
    let subscribersCount = 0;
    let subParticipatorsCount = 0;
    let realParticipatorsCount = 0;
    participators.forEach((p) => {
      if (p.isSubscriber) {
        subscribersCount++;
      }
      if (p.didReallyParticipate) {
        realParticipatorsCount++;
        if (p.isSubscriber) {
          subParticipatorsCount++;
        }
      }
    });
    const subPercentage = participators.length === 0 ? 0 : Math.floor((subscribersCount / participators.length) * 100);
    const participationPercentage =
      participators.length === 0 ? 0 : Math.floor((realParticipatorsCount / participators.length) * 100);
    return { subscribersCount, participationPercentage, subParticipatorsCount, realParticipatorsCount, subPercentage };
  }, [participators]);

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
                <Grid container justifyContent="center" sx={{ mt: '1rem' }}>
                  <Grid item xs={10}>
                    <Grid container sx={{ mt: 1, mb: 1 }} justifyContent="space-between">
                      <Grid item xs={3}>
                        <InformationBox title="Participators" value={participators.length} />
                      </Grid>
                      <Grid item xs={3} sx={{ pl: 2 }}>
                        <InformationBox title="Subscribers" value={stats.subscribersCount} />
                      </Grid>
                      <Grid item xs={3} sx={{ pl: 2 }}>
                        <InformationBox
                          title={
                            <Grid container alignItems={'center'}>
                              Real participators
                              <Tooltip
                                arrow={true}
                                title="Real participator is a person who physically attended your event by scanning QR code"
                                placement="top"
                              >
                                <InfoOutlined style={{ marginLeft: '3px', width: '15px', height: '15px' }} />
                              </Tooltip>
                            </Grid>
                          }
                          value={stats.realParticipatorsCount}
                        />
                      </Grid>
                      <Grid item xs={3} sx={{ pl: 2 }}>
                        <InformationBox
                          title={
                            <Grid container alignItems={'center'}>
                              Subscribers
                              <Tooltip
                                arrow={true}
                                title="Real participator is a person who physically attended your event by scanning QR code"
                                placement="top"
                              >
                                <InfoOutlined style={{ marginLeft: '3px', width: '15px', height: '15px' }} />
                              </Tooltip>
                            </Grid>
                          }
                          value={stats.subParticipatorsCount}
                        />
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                      <Alert variant="outlined" sx={{ mt: 1, mb: 1, width: '100%' }} severity="info">
                        {stats.subPercentage === 0
                          ? 'No participators are subscribing your business'
                          : `${stats.subPercentage}% of all participators are subscribers`}
                      </Alert>
                      <Alert variant="outlined" sx={{ mt: 0.5, mb: 1, width: '100%' }} severity="info">
                        {stats.participationPercentage === 0
                          ? 'No participators have physically attended your event'
                          : `${stats.participationPercentage}% of all participators have physically attended your event`}
                      </Alert>
                      <Grid container>
                        <Grid item xs={6}>
                          <SubscribersChart
                            subscribers={stats.subscribersCount}
                            nonSubscribers={participators.length - stats.subscribersCount}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <ParticipatorsChart
                            participators={participators.length - stats.realParticipatorsCount}
                            realParticipators={stats.realParticipatorsCount}
                          />
                        </Grid>
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
