import { makeStyles } from '@mui/styles';
import React, { FC, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Section1 } from './Section1';
import { Section2 } from './Section2';
import { Section3 } from './Section3';
import { Team } from './Team';
const useStyles = makeStyles({
  carousel: {
    height: '100vh',
  },
});

interface Props {
  initialIndex?: 0 | 1 | 2;
}

export const SectionsCarousel: FC<Props> = ({ initialIndex }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(initialIndex || 0);
  return (
    <>
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
    </>
  );
};
