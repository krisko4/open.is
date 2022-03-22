import { FC } from 'react';
import { AuthContextProvider } from '../../../contexts/AuthContext';
import { Auth } from '../../Auth/Auth';
import { Banner } from './Banner';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

const HomePage: FC = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Auth />
        <Banner />
        <Content />
      </AuthContextProvider>
      <Footer />
    </>
  );
};

export default HomePage;
