import { Auth } from 'components/Auth';
import { FC } from 'react';
import { AuthContextProvider } from '../../../contexts/AuthContext';
import { Banner } from './Banner';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

const HomePage: FC = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <AuthContextProvider>
        <Header />
        <Auth />
        <Banner />
        <Content />
      </AuthContextProvider>
      <Footer />
    </div>
  );
};

export default HomePage;
