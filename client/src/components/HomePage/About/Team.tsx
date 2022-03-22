import { Avatar, CardMedia, Fade, Slide, Grid, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

export const Team: FC = () => {
  const [isVisible1, setVisible1] = useState(false);
  const [isVisible2, setVisible2] = useState(false);
  const [isVisible3, setVisible3] = useState(false);

  const handleScroll = () => {
    setVisible1(window.scrollY > 600);
    setVisible2(window.scrollY > 900);
    setVisible3(window.scrollY > 1500);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div data-testid="team" style={{ overflow: 'hidden' }}>
      <Grid container justifyContent="space-evenly" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Fade in={isVisible1} timeout={2000}>
          <Grid
            data-testid="member-1"
            item
            container
            lg={5}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h3" style={{ textAlign: 'center' }}>
              Krzysztof Wyszyński
            </Typography>
            <Typography variant="h5" style={{ fontStyle: 'italic' }}>
              CEO
            </Typography>
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
              I believe that great things can be achieved through simple ideas. Our concept is super simple, which gives
              us lot of room to grow and develop.
            </Typography>
          </Grid>
        </Fade>
        <Slide in={isVisible1} timeout={1000} direction="left">
          <CardMedia
            data-testid="member-1-img"
            image={`${process.env.REACT_APP_BASE_URL}/images/ja.jpg`}
            style={{ height: 600, width: 500, backgroundSize: 'contain ' }}
          />
        </Slide>
      </Grid>
      <Grid
        container
        justifyContent="space-evenly"
        style={{ paddingTop: 40, paddingBottom: 40, background: 'whitesmoke' }}
      >
        <Slide in={isVisible2} timeout={1000} direction="right">
          <Avatar
            data-testid="member-2-img"
            src="https://i.pinimg.com/564x/27/24/9e/27249e6089986d6d7bdd8adf7578a75d.jpg"
            style={{ height: 500, width: 500 }}
          />
        </Slide>
        <Fade in={isVisible2} timeout={2000}>
          {/* <CardMedia style={{ height: 600, width: 600 }} image={`https://i.pinimg.com/564x/27/24/9e/27249e6089986d6d7bdd8adf7578a75d.jpg`} /> */}
          <Grid
            item
            container
            lg={5}
            data-testid="member-2"
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h3" style={{ textAlign: 'center' }}>
              Christopher Cononovitz
            </Typography>
            <Typography variant="h5" style={{ fontStyle: 'italic', marginTop: 10 }}>
              Development manager
            </Typography>
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
              Nice to meet you. My name is Christopher Cononovitz. I am a development manager, which makes me
              responsible for all the stuff connected with proper development of our services. I love programming and
              creating innovative solutions. I find myself lucky to have an opportunity to lead a team of great
              developers. I believe we will be capable of expanding our platform and provide new ideas to make it better
              everyday.
            </Typography>
          </Grid>
        </Fade>
      </Grid>
      <Grid container justifyContent="space-evenly" style={{ paddingTop: 20 }}>
        <Fade in={isVisible3} timeout={2000}>
          <Grid
            item
            container
            data-testid="member-3"
            lg={5}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant="h3" style={{ textAlign: 'center' }}>
              George Suchodolsky
            </Typography>
            <Typography variant="h5" style={{ fontStyle: 'italic', marginTop: 10 }}>
              Promotion manager
            </Typography>
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20 }}>
              Hi, my name is George Suchodolsky and I am a Promotion manager. My primary duty is to encourage you to use
              our services and provide you with all the benefits you can gain by cooperating with us. I spend most of my
              free time reading books and chilling with my homies.
            </Typography>
          </Grid>
        </Fade>
        <Slide in={isVisible3} timeout={1000} direction="left">
          <CardMedia
            data-testid="member-3-img"
            style={{ height: 600, width: 600 }}
            image="https://yt3.ggpht.com/a/AGF-l78NQAy60mopFW0l90704VozNKFKp5_Z37IrMg=s400-c-k-c0xffffffff-no-rj-mo"
          />
        </Slide>
      </Grid>
    </div>
  );
};
