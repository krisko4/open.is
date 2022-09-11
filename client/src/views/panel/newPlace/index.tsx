import { Button, Card, CardContent, Grid, Paper, Slide, Typography } from '@mui/material';
import { useStepContext } from 'contexts';
import React, { FC, useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useAppDispatch } from 'store/hooks';
import { resetCurrentPlace, setCurrentPlace } from 'store/slices/currentPlaceSlice';
import { resetMap } from 'store/slices/mapSlice';
import { CurrentPlaceProps } from 'store/slices/PlaceProps';
import { resetSelectedAddress } from 'store/slices/selectedAddressSlice';
import { resetSelectedLocations } from 'store/slices/selectedLocationsSlice';
import { useCustomSnackbar } from 'utils/snackbars';
import { PlaceDetailsCard } from '../../../components/PlaceDetailsCard';
import { NewPlaceStepper } from './components/NewPlaceStepper';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { Step4 } from './components/Step4';
import { Step5Container } from './components/Step5Container';

function getStepContent(step: number, isEditionMode: boolean) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    case 3:
      return <Step4 isEditionMode={isEditionMode} />;
    default:
      return 'Unknown step';
  }
}

interface Props {
  isEditionMode?: boolean;
  initialPlaceData?: CurrentPlaceProps;
}

export const NewPlace: FC<Props> = ({ isEditionMode, initialPlaceData }) => {
  const { activeStep, setActiveStep } = useStepContext();
  const { enqueueInfoSnackbar } = useCustomSnackbar();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('no kiszka');
    if (isEditionMode)
      enqueueInfoSnackbar(
        'In edition mode you can switch freely between steps. Click on the step label to check it out.'
      );
    if (initialPlaceData) {
      dispatch(setCurrentPlace(initialPlaceData));
      return;
    }
    dispatch(resetCurrentPlace());
    dispatch(resetMap());
    dispatch(resetSelectedAddress());
    dispatch(resetSelectedLocations());
    return () => {
      dispatch(resetCurrentPlace());
      dispatch(resetSelectedAddress());
      dispatch(resetMap());
      dispatch(resetSelectedLocations());
    };
  }, []);

  return (
    <Grid container sx={{ height: '100%' }} direction="column">
      {activeStep > 0 && activeStep !== 3 && (
        <Paper sx={{ width: '100%' }}>
          <Grid container sx={{ height: '120px' }} alignItems="center">
            <Button
              color="primary"
              sx={{ ml: '30px' }}
              variant="outlined"
              onClick={() => setActiveStep((step) => step - 1)}
            >
              Back
            </Button>
            <NewPlaceStepper isEditionMode={isEditionMode} />
          </Grid>
        </Paper>
      )}
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid container sx={{ height: '100%', p: 1 }} justifyContent="space-evenly" alignItems="center">
          <Grid container item justifyContent="space-evenly">
            {activeStep !== 4 && (
              <Grid container item xs={12} sm={8} lg={activeStep === 3 ? 5 : 4}>
                {getStepContent(activeStep, isEditionMode || false)}
              </Grid>
            )}
            {activeStep === 4 && (
              <Grid container justifyContent="space-around" sx={{ pt: '20px', overflow: 'hidden', pb: '20px' }}>
                <Slide in={true} direction="right" timeout={500}>
                  <Grid item xs={5} sx={{ mr: 2 }}>
                    <PlaceDetailsCard logoFile={logoFile} setLogoFile={setLogoFile} isEditable={true} />
                  </Grid>
                </Slide>
                <Grid item xs={5}>
                  <Step5Container
                    initialPlaceData={initialPlaceData}
                    logoFile={logoFile}
                    isEditionMode={isEditionMode}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 1 || activeStep === 2 ? (
              <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                style={{ height: 700, marginTop: 20, overflow: 'hidden' }}
                xs={11}
                lg={6}
              >
                <TransformWrapper
                  limitToBounds={false}
                  doubleClick={{
                    disabled: true,
                  }}
                  initialPositionY={-370}
                  initialPositionX={70}
                  initialScale={0.93}
                  minScale={0.5}
                >
                  <TransformComponent>
                    <Slide in={true} direction="left">
                      <Grid container>
                        <PlaceDetailsCard />
                      </Grid>
                    </Slide>
                  </TransformComponent>
                </TransformWrapper>
              </Grid>
            ) : (
              activeStep !== 4 && (
                <Grid container item lg={4} xs={12}>
                  <Slide in={true} timeout={500}>
                    <div>
                      <Card>
                        <CardContent>
                          <Typography variant="h2">Step {activeStep + 1}</Typography>
                          <Grid container item style={{ marginTop: 10 }} xs={11}>
                            <Typography variant="body1">
                              {activeStep === 0
                                ? 'The name of your business will be used in our search engines. Each user will be able to find your place in the browser by entering the name of your business in the search bar.'
                                : 'Please enter the location of your business inside the search bar. Make sure to provide valid address, including city and street number.'}
                            </Typography>
                            <NewPlaceStepper orientation="vertical" isEditionMode={isEditionMode} />
                          </Grid>
                        </CardContent>
                      </Card>
                    </div>
                  </Slide>
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
