import { Button, Card, CardContent, Grid, Paper, Slide, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { resetCurrentPlace } from 'redux-toolkit/slices/currentPlaceSlice';
import { resetFormLocations } from 'redux-toolkit/slices/formLocationsSlice';
import { resetMap } from 'redux-toolkit/slices/mapSlice';
import { resetSelectedAddress } from 'redux-toolkit/slices/selectedAddressSlice';
import { resetSelectedLocations } from 'redux-toolkit/slices/selectedLocationsSlice';
import { useStepContext } from '../../../../contexts/StepContext';
import { PlaceDetailsCard } from '../NewPlace/PlaceDetailsCard';
import { NewPlaceStepper } from '../NewPlace/Steps/NewPlaceStepper';
import { Step1 } from '../NewPlace/Steps/Step1/Step1';
import { Step2 } from '../NewPlace/Steps/Step2/Step2';
import Intro from './Intro';
import { LocationDetails } from './LocationDetails/LocationDetails';
import { LocationSelection } from './LocationDetails/LocationSelection';
import { Step5Container } from './Step5Container';



function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    default:
      return 'Unknown step';
  }
}

interface Props {
  isEditionMode?: boolean,
}
export const NewBusinessChain: FC<Props> = ({ isEditionMode }) => {

  const [startClicked, setStartClicked] = useState(false);
  const { activeStep, setActiveStep } = useStepContext();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetCurrentPlace());
    dispatch(resetMap());
    dispatch(resetSelectedAddress());
    dispatch(resetSelectedLocations());
    dispatch(resetFormLocations());
    return () => {
      dispatch(resetCurrentPlace());
      dispatch(resetMap());
      dispatch(resetSelectedAddress());
      dispatch(resetSelectedLocations());
      dispatch(resetFormLocations());
    };
  }, []);

  return (
        <>
            {
                !startClicked ?
                    <Intro setStartClicked={setStartClicked} />
                  :
                    <Grid container style={{ height: '100%' }} direction="column" >
                        {activeStep > 0 && activeStep !== 3 &&
                            <Paper sx={{ width: '100%' }}>
                                <Grid container sx={{ height: '120px' }} alignItems="center">
                                    <Button color="primary" sx={{ ml: '30px' }} variant="outlined" onClick={() => setActiveStep(step => step - 1)}>Back</Button>
                                    <NewPlaceStepper
                                    />
                                </Grid>
                            </Paper>
                        }
                            <Grid container sx={{ flexGrow: 1 }} >
                                <Grid container sx={{ height: '100%' }} justifyContent="space-evenly" alignItems="center">
                                    {activeStep === 2 ?
                                        <Grid container justifyContent="space-between" sx={{ height: '100%' }}>
                                            <Grid item container justifyContent="center" alignItems="center" lg={6}>
                                                <LocationSelection />
                                            </Grid>
                                            <Grid item lg={6}>
                                                <LocationDetails
                                                    setActiveStep={setActiveStep}
                                                />
                                            </Grid>
                                        </Grid>
                                      :
                                        <Grid container item justifyContent="space-evenly">
                                            {activeStep !== 3 &&
                                                <Grid container item lg={activeStep === 3 || activeStep === 2 ? 5 : 4}>
                                                    {getStepContent(activeStep)}
                                                </Grid>
                                            }
                                            {activeStep === 3 && <Grid container justifyContent="space-around" sx={{ overflow: 'hidden', pt: '20px', pb: '20px' }}>
                                                <Slide in={true} direction="right" timeout={500}>
                                                    <Grid item lg={5} sx={{ mr: 2 }}>
                                                        <PlaceDetailsCard isEditable={true} logoFile={logoFile} setLogoFile={setLogoFile} />
                                                    </Grid>
                                                </Slide>
                                                <Grid item lg={5}>
                                                    <Step5Container logoFile={logoFile} isEditionMode={isEditionMode} />
                                                </Grid>
                                            </Grid>
                                            }
                                            {activeStep === 1 ?
                                                <Grid container item style={{ height: 700, overflow: 'hidden', marginTop: 20 }} lg={6} >
                                                    <TransformWrapper
                                                        limitToBounds={false}
                                                        doubleClick={{
                                                          disabled: true,
                                                        }}
                                                        initialPositionY={-415}
                                                        initialPositionX={80}
                                                        initialScale={0.9}
                                                        minScale={0.5}
                                                    >
                                                        <TransformComponent>
                                                            <Slide in={true} direction="left">
                                                                <Grid container >
                                                                    <PlaceDetailsCard />
                                                                </Grid>
                                                            </Slide>
                                                        </TransformComponent>
                                                    </TransformWrapper>
                                                </Grid>
                                              : activeStep !== 2 && activeStep !== 3 &&
                                                <Grid container item lg={4}>
                                                    <Slide in={true} timeout={500}>
                                                        <div>
                                                            <Card>
                                                                <CardContent>
                                                                    <Typography variant="h2">
                                                                        Step {activeStep + 1}
                                                                    </Typography>
                                                                    <Grid container item style={{ marginTop: 10 }} lg={11}>
                                                                        <Typography variant="body1">
                                                                            {activeStep === 0 ?
                                                                              'The name of your business will be used in our search engines. Each user will be able to find your place in the browser by entering the name of your business in the search bar.' :
                                                                              'Please enter the location of your business inside the search bar. Make sure to provide valid address, including city and street number.'
                                                                            }
                                                                        </Typography>
                                                                        <NewPlaceStepper
                                                                            orientation="vertical"
                                                                        />
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    </Slide>
                                                </Grid>
                                            }
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                    </Grid>
            }
        </>
  );
};