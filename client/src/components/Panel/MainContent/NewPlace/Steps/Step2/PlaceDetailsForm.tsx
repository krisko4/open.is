import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useStepContext } from '../../../../../../contexts/StepContext';
import { BusinessType } from './BusinessType';
import { Description } from './Description';
import { Subtitle } from './Subtitle';

const schema = yup.object({
  subtitle: yup.string().required('This field is required').max(100),
  description: yup.string().required('This field is required').max(600),
  type: yup.string().required(),
});

interface Inputs {
  subtitle: string,
  type: string | null,
  description: string
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
                        onClick={() => setActiveStep(step => step + 1)}
                        disabled={!methods.formState.isValid}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </FormProvider>
  );
};
