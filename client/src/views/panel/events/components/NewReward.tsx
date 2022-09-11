import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Collapse, Divider, Fade, Grid, Slider, Switch, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React, { FC, useState } from 'react';
import { useAddRewardMutation } from 'store/api';
import { Reward, RewardPayload } from 'store/api/types';
import { useCustomSnackbar } from 'utils/snackbars';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

interface Props {
  eventId: string;
}

export const NewReward: FC<Props> = ({ eventId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [checked, setChecked] = useState(true);
  const [rewardPercentage, setRewardPercentage] = useState(0);
  const [addReward, { isLoading }] = useAddRewardMutation();
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    const reward: RewardPayload = {
      description,
      rewardPercentage,
      eventId,
    };
    if (!checked && date) {
      reward['scheduledFor'] = date;
    }
    try {
      await addReward(reward).unwrap();
      enqueueSuccessSnackbar('You have successully created a reward drawing');
    } catch (err) {
      enqueueErrorSnackbar();
    }
  };

  return (
    <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
      <Grid item xs={9}>
        <Typography variant="h2">New reward drawing</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography variant="h6">Describe your reward</Typography>
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Typography color="text.secondary">
                Each winner of reward drawing will receive a special code, which can be used in order to receive a
                reward. What kind of reward would you like to provide? Is it a coupon code for a free beer in your bar
                or some special discount for a product? Describe the reward in few words.
              </Typography>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ mt: 1, width: '100%' }}
                placeholder="Describe your reward in few words"
                multiline
                rows={10}
                label="This is a description of my reward!"
              />
              <Box sx={{ mt: 1 }}>
                <Button disabled={description === ''} variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                  Continue
                </Button>
                <Button disabled onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="h6">Specify a date of your reward drawing</Typography>
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Typography color="text.secondary">
                Your reward drawing will automatically execute on specified date. You can also choose to start the
                reward drawing immediately after completing all the steps.
              </Typography>
              <FormControlLabel
                sx={{ mt: 1, mb: 1 }}
                control={<Switch value={checked} defaultChecked onChange={(e, val) => setChecked(val)} />}
                label="I want my reward drawing to start immediately"
              />
              {!checked && (
                <Fade in={true} timeout={500}>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDateTimePicker
                        onChange={(val) => setDate(val)}
                        value={date}
                        disabled={checked}
                        renderInput={(props) => <TextField sx={{ mt: 1, mb: 1, width: '100%' }} {...props} />}
                        label="Click me to specify a reward drawing execution date"
                        minDate={new Date()}
                      />
                    </LocalizationProvider>
                  </div>
                </Fade>
              )}
              <Box sx={{ mt: 1 }}>
                <Button disabled={!date && !checked} variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                  Continue
                </Button>
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="h6">Select the percentage of winners</Typography>
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Typography color="text.secondary">
                It is completely up to you how many participators you would like to reward. Move the slider to specify
                the percentage of participators who will receive a special code. Please bear in mind that only
                subscribers of your business will be included in the drawing.
              </Typography>
              <Slider
                value={rewardPercentage}
                onChange={(e, v) => setRewardPercentage(v as number)}
                marks={marks}
                sx={{ mt: 1 }}
                defaultValue={50}
                aria-label="Default"
                valueLabelDisplay="auto"
              />
              <Box sx={{ mt: 1 }}>
                <Button
                  disabled={rewardPercentage === 0 || isLoading}
                  variant="contained"
                  onClick={handleFinish}
                  sx={{ mr: 1 }}
                >
                  Finish
                </Button>
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
      </Grid>
    </Grid>
  );
};
