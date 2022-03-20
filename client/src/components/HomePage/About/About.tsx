import { makeStyles } from '@mui/styles';
import { Auth } from 'components/Auth/Auth';
import React, { FC, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { AuthContextProvider } from '../../../contexts/AuthContext';
import Header from '../MainPage/Header';
import { Section1 } from './Section1';
import { Section2 } from './Section2';
import { Section3 } from './Section3';
import { Team } from './Team';

const useStyles = makeStyles({
  carousel: {
    height: '100vh',
  },
});


export const About: FC = () => {
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  return (
    <AuthContextProvider>
      <Header />
      <Auth/>
      <Carousel
        index={index}
        onChange={(now) => {
          setIndex(now as number);
        }}
        navButtonsAlwaysVisible
        fullHeightHover={false}
        autoPlay={false}
        indicators={false}
        className={classes.carousel}
      >
        <div key={0}>
        <Section1 />,
        </div>
        <div key={1}>
        <Section3 />,
        </div>
        <div key={2}>
        <Section2 />,
        </div>
      </Carousel>
      {index === 1 && <Team />}
    </AuthContextProvider>
  );
};


