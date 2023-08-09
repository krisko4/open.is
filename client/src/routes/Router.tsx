import { CssBaseline } from '@mui/material';
import { EmailChangeConfirmation } from 'components/auth/Confirmation/EmailChangeConfirmation';
import { Browser } from 'layouts/browser';
import { HomeLayout } from 'layouts/index';
import { Panel } from 'layouts/panel';
import React, { FC } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { About } from 'views/homePage/about';
import { Contact } from 'views/homePage/contact';
import HomePage from 'views/homePage/home';
import { Confirmation } from '../components/auth/Confirmation/Confirmation';
import { Notification } from '../components/Notifications/Notification';
import { ColorModeContextProvider } from '../contexts/ColorModeContext';
import { BrowserTheme } from '../themes/BrowserTheme';
import { PanelTheme } from '../themes/PanelTheme';

export function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const PageLayout = () => {
  return (
    <>
      <Outlet />
      <Notification />
    </>
  );
};

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route
            path="/panel/*"
            element={
              <ColorModeContextProvider>
                <PanelTheme>
                  <CssBaseline enableColorScheme />
                  <Panel />
                </PanelTheme>
              </ColorModeContextProvider>
            }
          ></Route>
          <Route
            path="/search/*"
            element={
              <ColorModeContextProvider>
                <BrowserTheme>
                  <CssBaseline enableColorScheme />
                  <Browser />
                </BrowserTheme>
              </ColorModeContextProvider>
            }
          />
          <Route path="/confirm/:token" element={<Confirmation />} />
          <Route path="/:email/confirm/:token" element={<EmailChangeConfirmation />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
