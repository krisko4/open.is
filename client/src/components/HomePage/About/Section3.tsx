import { Card, CardContent, CardMedia, Divider, Grid, IconButton, Slide, styled, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { FC } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const items = [
  {
    name: 'Krzysztof Wyszyński',
    role: 'CEO',
    image: `${process.env.REACT_APP_BASE_URL}/images/ja.jpg`,
  },
  {
    name: 'Christopher Cononovitz',
    role: 'Development manager',
    image:
      'https://ocdn.eu/pulscms-transforms/1/zMSktkqTURBXy9kMzBjNzkyOWJjZTgxMGNiZTNkYzViZGJmZjZmYmMxMS5qcGVnkpUDAA3NAVjMwpMFzQGkzQEs',
  },
  {
    name: 'George Suchodolsky',
    role: 'Promotion manager',
    image: 'https://yt3.ggpht.com/a/AGF-l78NQAy60mopFW0l90704VozNKFKp5_Z37IrMg=s400-c-k-c0xffffffff-no-rj-mo',
  },
];

const StyledContainer = styled(Grid)({
  height: '100vh',
  width: '100vw',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6)),url(${process.env.REACT_APP_BASE_URL}/images/team.jpg)`,
});

const StyledArrow = styled(KeyboardArrowDownIcon)({
  width: 60,
  height: 60,
  backgroundColor: '#494949',
  '&:hover': {
    backgroundColor: '#303030',
  },
  borderRadius: '50%',
  color: 'white',
});

export const Section3: FC = () => {
  return (
    <StyledContainer container alignItems="center">
      <Grid container justifyContent="center">
        <Grid item container justifyContent="center" xs={11} lg={5} style={{ textAlign: 'center', marginBottom: 100 }}>
          <Typography variant="h2" style={{ color: 'white', fontWeight: 'bold' }}>
            Who are <span style={{ color: 'red' }}>we</span>?
          </Typography>
          <Grid item xs={10} style={{ marginTop: 20 }}>
            <Typography variant="h6" style={{ color: 'white' }}>
              We are a group of young, creative people. Programming and constant development is our passion.
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Slide in={true} timeout={1500}>
            <Grid item xs={11} lg={7} md={9} sm={10}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center" direction="column">
                    <Typography variant="h3" style={{ textAlign: 'center' }}>
                      Meet our team
                    </Typography>
                    <Divider style={{ width: '80%', marginBottom: 20, marginTop: 10, background: 'darkgrey' }} />
                  </Grid>
                  <Grid container>
                    {items.map((item, index) => (
                      <Grid
                        item
                        xs={4}
                        container
                        alignItems="center"
                        style={{ marginBottom: 20 }}
                        direction="column"
                        key={index}
                      >
                        <CardMedia
                          style={{
                            height: 200,
                            width: '100%',
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                          }}
                          image={item.image}
                        />
                        <div style={{ marginTop: 10, textAlign: 'center' }}>
                          <b>{item.name}</b>
                          <br />
                          <span style={{ fontStyle: 'italic' }}>{item.role}</span>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
              <Grid container justifyContent="center">
                <IconButton
                  onClick={() => scroll.scrollTo(800, { duration: 500 })}
                  style={{ marginTop: -40 }}
                  size="large"
                >
                  <StyledArrow />
                </IconButton>
              </Grid>
            </Grid>
          </Slide>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
