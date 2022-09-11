import { Auth } from 'components/auth';
import { AuthContextProvider } from 'contexts';
import { FC } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';

const Home: FC = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Auth />
      <Outlet />
    </AuthContextProvider>
  );
};

export default Home;
