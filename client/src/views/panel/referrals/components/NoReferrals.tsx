import { Button, Card, CardContent, Fade, Grid, Slide, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FC } from 'react';
import { SelectedOption } from '../enums';

const STEPS = [
  { title: 'Describe the reward for referring your business' },
  { title: 'Specify the amount of required referred subscribers in order to achieve a reward' },
  { title: 'Track the activity regarding your referrals' },
];

interface Props {
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption | null>>;
}

export const NoReferrals: FC<Props> = ({ setSelectedOption }) => {
  return (
    <Grid container sx={{ flexGrow: 1 }} justifyContent="space-evenly">
      <Fade in={true} timeout={1000}>
        <Grid item container direction="column" lg={5} xs={12} alignItems="center" justifyContent="center">
          <Typography variant="h2">New referral</Typography>
          <Grid justifyContent="center" container>
            <Grid item lg={9} xs={12}>
              <img style={{ width: '100%' }} src={`${process.env.REACT_APP_BASE_URL}/images/referral.gif`} />
              <Button
                onClick={() => setSelectedOption(SelectedOption.NEW_REFERRAL)}
                fullWidth
                variant="contained"
                size="large"
                color="primary"
              >
                Let&apos;s create my first referral!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
      <Grid item container lg={4} xs={12} justifyContent="center" alignItems="center">
        <Slide in timeout={500} direction="left">
          <Card>
            <CardContent>
              <Typography variant="h2">What is a referral?</Typography>
              <Grid style={{ marginTop: 10 }} item container lg={11}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  It seems you have not created any referrals yet. By setting referrals you can efficiently improve the
                  amount of your subscribers. In order to achieve it, follow some simple steps:
                </Typography>
                <Stepper orientation="vertical">
                  {STEPS.map((step) => (
                    <Step key={step.title}>
                      <StepLabel>{step.title}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
    </Grid>
  );
};
