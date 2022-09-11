import DoneIcon from '@mui/icons-material/Done';
import { LoadingButton } from '@mui/lab';
import { Fade, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useStepContext } from 'contexts';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { setName, useNameSelector } from 'store/slices/currentPlaceSlice';

export const Step1: FC = () => {
  const { setCurrentStep, setActiveStep } = useStepContext();
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const name = useNameSelector();

  useEffect(() => {
    setInput(name);
  }, [name]);

  const submitName = () => {
    dispatch(setName(input));
    setCurrentStep((activeStep) => activeStep + 1);
    setActiveStep((activeStep) => activeStep + 1);
  };

  return (
    <Fade in={true} timeout={1000}>
      <Grid item container direction="column" justifyContent="space-between" style={{ textAlign: 'center' }}>
        <Typography variant="h2">What is the name of your business?</Typography>
        <TextField
          style={{ marginTop: 10 }}
          label="Business name"
          fullWidth={true}
          value={input}
          color="primary"
          placeholder="This is the name of my business!"
          variant="outlined"
          onChange={(e) => setInput(e.target.value)}
          helperText={`${input.length}/60`}
          inputProps={{ maxLength: 60 }}
          InputProps={{
            endAdornment: (
              <div>
                {input && (
                  <InputAdornment position="end">
                    <DoneIcon style={{ color: '#32de84' }} />
                  </InputAdornment>
                )}
              </div>
            ),
          }}
        ></TextField>
        <LoadingButton
          size="large"
          disabled={!input}
          fullWidth={true}
          style={{ marginTop: 20, marginBottom: 20 }}
          variant="contained"
          color="primary"
          onClick={() => submitName()}
        >
          Submit
        </LoadingButton>
      </Grid>
    </Fade>
  );
};
