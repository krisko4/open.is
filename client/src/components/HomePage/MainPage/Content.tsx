import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import Section1 from './Sections/Section1';
import Section2 from './Sections/Section2';
import Section3 from './Sections/Section3';
import Section4 from './Sections/Section4';
import Section5 from './Sections/Section5';
import Section6 from './Sections/Section6';
import './styles.css';



const Content = () => {

  const [isVisible1, setVisible1] = useState(false);
  const [isVisible3, setVisible3] = useState(false);
  const [isVisible4, setVisible4] = useState(false);
  const [isVisible6, setVisible6] = useState(false);
  const [isVisible7, setVisible7] = useState(false);

  const handleScroll = () => {
    setVisible1(window.scrollY > 700);
    setVisible3(window.scrollY > 1500);
    setVisible6(window.scrollY > 2200);
    setVisible7(window.scrollY > 2800);
    setVisible4(window.scrollY > 4000);
    // window.scrollY > 700 && setVisible1(true);
    // window.scrollY > 500 && setVisible2(true);
    // window.scrollY > 1500 && setVisible3(true);
    // window.scrollY > 2200 && setVisible6(true);
    // window.scrollY > 2800 && setVisible7(true);
    // window.scrollY > 4000 && setVisible4(true);


  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
        <Grid container justifyContent="center" style={{ background: 'black', paddingTop: 100 }}>
            <Section1 isVisible1={isVisible1} />
            <Section3 isVisible3={isVisible3} />
            <Section6 isVisible6={isVisible6} isVisible7={isVisible7} />
            <Section4 isVisible4={isVisible4} />
            <Section2 />
            <Section5 />
        </Grid >
  );
};

export default Content;