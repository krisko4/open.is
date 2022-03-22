import { Grid, styled, Typography } from '@mui/material';
import React, { FC } from 'react';

const StyledContainer = styled(Grid)({
  height: '100vh',
  width: '100vw',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.6)), url(${process.env.REACT_APP_BASE_URL}/images/me.jpg)`,
});

export const Section1: FC = () => {
  return (
    <StyledContainer container alignItems="center">
      <Grid container justifyContent="flex-end">
        <Grid
          item
          container
          justifyContent="center"
          lg={5}
          style={{ textAlign: 'center', marginRight: 200, marginBottom: 300 }}
        >
          <Typography style={{ color: 'white' }} variant="h2">
            Hello, good to see you!
          </Typography>
          <Grid item lg={10} style={{ marginTop: 20 }}>
            <Typography style={{ color: 'white' }} variant="h6">
              My name is Krzysztof Wyszyński.
              <br />
              Let me introduce you to our company and my colleagues.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
