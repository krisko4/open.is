import { Button, Fade } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { useAuthContext } from '../../../../../contexts/AuthContext';
import { useLoginContext } from '../../../../../contexts/LoginContext';
import { StyledSection, StyledVideo } from './Section1';
import { VideoSection } from './VideoSection';

const WingsSection: FC = () => {
  const { setLoginOpen } = useAuthContext();
  const { userData } = useLoginContext();
  return (
    <VideoSection isVisible={true} videoSource={`${import.meta.env.VITE_BASE_URL}/images/wings.mp4`}>
      <Grid
        container
        sx={{ background: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))', height: '100%' }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} lg={6} sx={{ textAlign: 'center' }}>
          <Typography data-testid="title" variant="h3" style={{ color: 'white' }}>
            Spread your wings
          </Typography>
          <Typography data-testid="content" variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
            Let us take care of your development
          </Typography>
          {!userData.isLoggedIn && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => setLoginOpen(true)}
              style={{ color: 'white', borderColor: 'white', marginTop: 10 }}
            >
              Join us
            </Button>
          )}
        </Grid>
      </Grid>
    </VideoSection>
  );
};

export default WingsSection;
