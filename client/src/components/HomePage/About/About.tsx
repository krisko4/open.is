import React, { FC } from 'react';
import Carousel from 'react-material-ui-carousel';
import { AuthContextProvider } from '../../../contexts/AuthContext';
import Header from '../MainPage/Header';
import { Section1 } from './Section1';
import { Section2 } from './Section2';
import { Section3 } from './Section3';


export const About: FC = () => {
  // const [index, setIndex] = useState(0);

  return (
    <AuthContextProvider>
      <Header />
      <Carousel
        // index={index}
        // onChange={(now) => setIndex(now as number)}
        navButtonsAlwaysVisible
        fullHeightHover={false}
        autoPlay={false}
        indicators={false}
      >
        <Section1 />,
        <Section3 />,
        <Section2 />,
      </Carousel>
      {/* {index === 1 && <Team />} */}
    </AuthContextProvider>
  );
};


