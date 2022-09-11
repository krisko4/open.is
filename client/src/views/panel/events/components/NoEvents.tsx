import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Fade,
  Grid,
  Slide,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { EventOptions } from '../enums';

const STEPS = [
  { title: 'Prepare the content of your event' },
  { title: 'Pick the date range of your event' },
  { title: 'Encourage your subscribers to participate in the event by creating reward drawings' },
  { title: 'Track the activity of event participators' },
];

interface Props {
  setSelectedOption: React.Dispatch<React.SetStateAction<EventOptions | null>>;
}

export const NoEvents: FC<Props> = ({ setSelectedOption }) => {
  return (
    <Grid container sx={{ flexGrow: 1 }} justifyContent="space-evenly">
      <Fade in={true} timeout={1000}>
        <Grid item container direction="column" lg={5} xs={12} alignItems="center" justifyContent="center">
          <Typography variant="h2">New event</Typography>
          <Grid justifyContent="center" container>
            <Grid item lg={9} xs={12}>
              <img style={{ width: '100%' }} src={`${process.env.REACT_APP_BASE_URL}/images/event.gif`} />
              <Button
                onClick={() => setSelectedOption(EventOptions.NEW_EVENT)}
                fullWidth
                variant="contained"
                size="large"
                color="primary"
              >
                Let&apos;s create my first event!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
      <Grid item container lg={4} xs={12} justifyContent="center" alignItems="center">
        <Slide in timeout={500} direction="left">
          <Card>
            <CardContent>
              <Typography variant="h2">What is an event?</Typography>
              <Grid style={{ marginTop: 10 }} item container lg={11}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  It seems you have not created any events yet. By setting events you can improve the relationship
                  between your company and your clients or gain new customers. In order to achieve it, follow some
                  simple steps:
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
