import { Auth } from 'components/Auth';
import React, { FC, useState } from 'react';
import { AuthContextProvider } from '../../../contexts/AuthContext';
import Header from '../MainPage/Header';
import { SectionsCarousel } from './SectionsCarousel';

export const About: FC = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Auth />
      <SectionsCarousel />
    </AuthContextProvider>
  );
};
