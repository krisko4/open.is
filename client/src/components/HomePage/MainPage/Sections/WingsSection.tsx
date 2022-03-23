import { Fade, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useLoginContext } from '../../../../contexts/LoginContext';
import { StyledSection, StyledVideo } from './Section1';
import { VideoSection } from './VideoSection';

const WingsSection: FC = () => {
  const { setLoginOpen } = useAuthContext();
  const { userData } = useLoginContext();
  return (
    <VideoSection isVisible={true} videoSource={`${process.env.REACT_APP_BASE_URL}/images/wings.mp4`}>
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
    // <Fade in={true} timeout={1000}>
    //   <StyledSection style={{ height: '800px' }}>
    //     <StyledVideo autoPlay muted loop>
    //       <source src={`${process.env.REACT_APP_BASE_URL}/images/wings.mp4`} type="video/mp4" />
    //     </StyledVideo>
    //     <Grid
    //       container
    //       alignItems="center"
    //       justifyContent="center"
    //       sx={{
    //         height: '100%',
    //         width: '100%',
    //       }}
    //     >
    //       <Fade style={{ zIndex: 1 }} in={true} timeout={1000}>
    //         <Grid
    //           container
    //           sx={{ background: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))', height: '100%' }}
    //           justifyContent="center"
    //           alignItems="center"
    //         >
    //           <Grid item xs={6} sx={{ textAlign: 'center' }}>
    //             <Typography data-testid="title" variant="h3" style={{ color: 'white' }}>
    //               Spread your wings
    //             </Typography>
    //             <Typography data-testid="content" variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
    //               Let us take care of your development
    //             </Typography>
    //             {!userData.isLoggedIn && (
    //               <Button
    //                 variant="outlined"
    //                 size="large"
    //                 onClick={() => setLoginOpen(true)}
    //                 style={{ color: 'white', borderColor: 'white', marginTop: 10 }}
    //               >
    //                 Join us
    //               </Button>
    //             )}
    //           </Grid>
    //         </Grid>
    //       </Fade>
    //     </Grid>
    //   </StyledSection>
    // </Fade>
    // <Grid
    //   container
    //   style={{
    //     width: '100%',
    //     height: '100%',
    //     backgroundPosition: 'center',
    //     backgroundSize: 'cover',
    //     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.1)), url(${process.env.REACT_APP_BASE_URL}/images/img.jpg)`,
    //   }}
    // >
    //   <Grid container style={{ height: 800 }} alignItems="center" justifyContent="center" direction="column">
    //     <Grid item style={{ textAlign: 'center' }}>
    //       <Typography variant="h2" style={{ color: 'white' }}>
    //         Spread your wings.
    //       </Typography>
    //       <Typography variant="h6" style={{ color: 'white' }}>
    //         Let us take care of your development
    //       </Typography>
    //     </Grid>
    //     {!userData.isLoggedIn && (
    //       <Button
    //         variant="outlined"
    //         size="large"
    //         onClick={() => setLoginOpen(true)}
    //         style={{ color: 'white', borderColor: 'white', marginTop: 10 }}
    //       >
    //         Join us
    //       </Button>
    //     )}
    //   </Grid>
    // </Grid>
  );
};

export default WingsSection;
