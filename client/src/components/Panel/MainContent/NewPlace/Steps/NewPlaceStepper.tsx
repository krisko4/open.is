import { Button, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useStepContext } from '../../../../../contexts/StepContext';

interface Props {
  orientation?: any;
  isEditionMode?: boolean;
}

export const NewPlaceStepper: FC<Props> = (props) => {
  const { activeStep, setActiveStep, steps } = useStepContext();
  const { children, orientation, isEditionMode, ...rest } = props;
  const [step, setStep] = useState(activeStep);

  const handleChange = (index: number) => {
    if (orientation !== 'vertical') {
      if (index < step || isEditionMode) {
        setActiveStep(index);
        // setStep(index)
      }
      return;
    }
    setStep(index);
  };

  useEffect(() => {
    setStep(activeStep);
  }, [activeStep]);

  return (
    <Stepper
      orientation={orientation}
      alternativeLabel={orientation !== 'vertical'}
      {...rest}
      sx={{
        flexGrow: orientation === 'vertical' ? 0 : 1,
      }}
      activeStep={step}
    >
      {steps.map((anyStep, index) => {
        return (
          <Step key={index}>
            <StepLabel
              onMouseEnter={() => activeStep === 0 || (activeStep === 3 && handleChange(index))}
              onClick={() => handleChange(index)}
            >
              {anyStep.title}
            </StepLabel>
            {orientation === 'vertical' && (
              <StepContent>
                <Typography>{anyStep.content}</Typography>
                {(index < activeStep || (index !== activeStep && isEditionMode)) && (
                  <Button variant="contained" onClick={() => setActiveStep(index)} sx={{ mt: 1 }}>
                    Jump to step
                  </Button>
                )}
              </StepContent>
            )}
          </Step>
        );
      })}
    </Stepper>
  );
};
