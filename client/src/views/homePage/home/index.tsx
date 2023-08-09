import { FC } from 'react';
import { Banner } from './components/Banner';
import Content from './components/Content';
import Footer from './components/Footer';

const HomePage: FC = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Banner />
      <Content />
      <Footer />
    </div>
  );
};

export default HomePage;
