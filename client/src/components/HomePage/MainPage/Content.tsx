import Grid from '@mui/material/Grid';
import React, { FC, useEffect, useState } from 'react';
import Section1 from './Sections/Section1';
import Section2 from './Sections/Section2';
import Section3 from './Sections/Section3';
import Section4 from './Sections/Section4';
import Section5 from './Sections/Section5';
import { PanelSection } from './Sections/PanelSection';
import './styles.css';
import WingsSection from './Sections/WingsSection';

const Content: FC = () => {
  const [isVisible1, setVisible1] = useState(false);
  const [isVisible2, setVisible2] = useState(false);
  const [isVisible3, setVisible3] = useState(false);
  const [isVisible4, setVisible4] = useState(false);
  const [isVisible5, setVisible5] = useState(false);
  const [isVisible6, setVisible6] = useState(false);
  const [isVisible7, setVisible7] = useState(false);
  const [isVisible8, setVisible8] = useState(false);
  const [isVisible9, setVisible9] = useState(false);

  const handleScroll = () => {
    setVisible1(window.scrollY > 700);
    setVisible2(window.scrollY > 1600);
    setVisible3(window.scrollY > 3000);
    setVisible4(window.scrollY > 3500);
    setVisible5(window.scrollY > 4200);
    setVisible6(window.scrollY > 4900);
    setVisible7(window.scrollY > 7000);
    setVisible8(window.scrollY > 7600);
    setVisible9(window.scrollY > 7600);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Grid container justifyContent="center" style={{ background: 'black' }}>
      <Section1 isVisible={isVisible1} />
      <Section2 isVisible={isVisible2} />
      <Section3 isVisible={isVisible3} isVisible1={isVisible4} />
      <PanelSection isVisible1={isVisible5} isVisible2={isVisible6} />
      <Section4 isVisible={isVisible7} />
      <WingsSection />
      <Section5 isVisible={isVisible8} />
    </Grid>
  );
};

export default Content;
