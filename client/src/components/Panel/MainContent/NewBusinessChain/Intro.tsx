import {
  Grid, Grow, Typography, Slide, Card, CardContent, Button,
} from '@mui/material';
import React, { FC } from 'react';
import { NewPlaceStepper } from '../NewPlace/Steps/NewPlaceStepper';

interface Props {
  setStartClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const Intro: FC<Props> = ({ setStartClicked }) => (
  <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center">
    <Grid container justifyContent="space-evenly">
      <Grow in timeout={1200}>
        <Grid item container direction="column" alignItems="center" justifyContent="space-evenly" lg={6}>
          <Typography variant="h2">New business chain</Typography>
          <img src={`${process.env.REACT_APP_BASE_URL}/images/chain2.gif`} />
          <Grid justifyContent="center" container>
            <Grid item lg={8}>
              <Button fullWidth variant="contained" onClick={() => setStartClicked(true)} size="large" color="primary">Let&quot;s start</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grow>
      <Grid item container lg={4} justifyContent="center" alignItems="center">
        <Slide in timeout={1000} direction="left">
          <Card>
            <CardContent>
              <Typography variant="h2">What is a business chain?</Typography>
              <Grid style={{ marginTop: 10 }} item container lg={11}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  If you are an owner of a business with multiple locations, business chain is a great option for you.
                  Follow some simple steps to add your locations quickly and conveniently.
                                    </Typography>
                <NewPlaceStepper
                  orientation="vertical"
                />
              </Grid>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
    </Grid>
  </Grid>
);

export default Intro;
