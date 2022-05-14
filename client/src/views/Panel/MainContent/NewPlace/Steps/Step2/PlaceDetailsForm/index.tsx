import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import { useStepContext } from 'contexts';
import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { BusinessType, Subtitle, Description } from './Fields';

const schema = yup.object({
  subtitle: yup.string().required('This field is required').max(100, 'You have exceeded  the maximum word limit'),
  description: yup.string().required('This field is required').max(1000, 'You have exceeded the maximum word limit'),
  type: yup.string().required(),
});

interface Inputs {
  subtitle: string;
  type: string | null;
  description: string;
}

export const PlaceDetailsForm: FC = () => {
  const { setActiveStep, activeStep, steps } = useStepContext();

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      subtitle: '',
      type: null,
      description: '',
    },
  });

  useEffect(() => {
    steps[activeStep].isValid = methods.formState.isValid;
  }, [methods.formState.isValid]);

  return (
    <FormProvider {...methods}>
      <form style={{ flexGrow: 1 }}>
        <Grid item container>
          {/* <BusinessTypeContainer /> */}
          <BusinessType />
          <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
            {/* <SubtitleContainer /> */}
            <Subtitle />
          </Grid>
          {/* <DescriptionContainer /> */}
          <Description />
          <Button
            size="large"
            fullWidth={true}
            variant="contained"
            style={{ marginTop: 10 }}
            color="primary"
            onClick={() => setActiveStep((step) => step + 1)}
            disabled={!methods.formState.isValid}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
};
