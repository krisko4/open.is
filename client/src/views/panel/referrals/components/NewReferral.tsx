import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton, LocalizationProvider, MobileDateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Slide,
  Slider,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { setDate } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useCreateReferralMutation } from 'store/api';
import { setDescription } from 'store/slices/currentPlaceSlice';
import { useCustomSnackbar } from 'utils/snackbars';
import * as yup from 'yup';
import { Fields } from '../enums';

type Inputs = {
  description: string;
  requiredMembersCount: string;
};

const schema = yup.object({
  [Fields.DESCRIPTION]: yup
    .string()
    .required('This field is required')
    .max(100, 'You have exceeded the maximum word limit'),
  [Fields.REQUIRED_MEMBERS_COUNT]: yup
    .string()
    .max(50, 'You can specify up to 50 members per referral')
    .required('This field is required'),
});

const NewReferral = () => {
  const { locationId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();

  const [createReferral, { isLoading }] = useCreateReferralMutation();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = async () => {
    const { description, requiredMembersCount } = getValues();
    const payload = {
      locationId: locationId as string,
      description,
      requiredMembersCount: Number(requiredMembersCount),
    };
    try {
      await createReferral(payload);
      enqueueSuccessSnackbar('You have successfully created a new referral');
    } catch (error) {
      enqueueErrorSnackbar('An error has occured');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const {
    getValues,
    register,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      [Fields.DESCRIPTION]: '',
      [Fields.REQUIRED_MEMBERS_COUNT]: '',
    },
  });

  useEffect(() => {
    trigger();
  }, []);

  return (
    <Grid container alignItems="center" sx={{ flexGrow: 1, pt: 2, pb: 2 }} justifyContent="space-evenly">
      <Grid item xs={5} container alignItems={'center'} direction="column">
        <Grid item xs={9}>
          <Typography variant="h2">New referral</Typography>
          <Divider sx={{ mb: 2 }} />
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>
                <Typography variant="h6">Describe a referral reward</Typography>
              </StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <Typography color="text.secondary">
                  Having reached the required members count, each referrer will receive an individual code allowing them
                  to access reward specified in the referral description. What kind of reward would you like to provide?
                  Is it a coupon code for a free beer in your bar or some special discount for a product? Describe the
                  reward in few words.
                </Typography>
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth={true}
                  {...register(Fields.DESCRIPTION)}
                  label="This is a description of my reward!"
                  multiline
                  rows={10}
                  variant="outlined"
                  placeholder="Describe your referral in few words"
                />
                <Box sx={{ mt: 1 }}>
                  <Button
                    disabled={errors[Fields.DESCRIPTION] !== undefined}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                  >
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
                <Typography variant="h6">Specify a required members count</Typography>
              </StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <Typography color="text.secondary">
                  Required members count is the amount of successful invitations required to receive a reward, which you
                  have specified in the previous step.
                </Typography>
                <TextField
                  sx={{ mt: '10px' }}
                  fullWidth={true}
                  {...register(Fields.REQUIRED_MEMBERS_COUNT)}
                  label="This is a required members count!"
                  type={'number'}
                  variant="outlined"
                  placeholder="Specify the required members count"
                />
                <Box sx={{ mt: 1 }}>
                  <LoadingButton
                    disabled={errors[Fields.REQUIRED_MEMBERS_COUNT] !== undefined}
                    loading={isLoading}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mr: 1 }}
                  >
                    Create new referral
                  </LoadingButton>
                  <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Slide in timeout={500} direction="left">
          <Card>
            <CardContent>
              <Typography variant="h2">How does it work?</Typography>
              <Grid style={{ marginTop: 10 }} item container lg={11}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  In order to receive a reward, a referrer is obliged to successfully invite the specific amount of
                  users. A <b>successful invitation</b> occurs when the invited user has subscribed your business, using
                  a special individual code, which is automatically generated during the invitation process. Having
                  reached the required members count, a referrer will receive an individual code allowing them to access
                  reward specified in the referral description.
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
    </Grid>
  );
};

export default NewReferral;
