import { CssBaseline } from '@mui/material';
import React, { FC } from 'react';
import { BrowserRouter, Link, Route, Outlet, Routes } from 'react-router-dom';
import { Notification } from '../components/Notifications/Notification';
import { Confirmation } from '../components/Auth/Confirmation/Confirmation';
import { Panel } from '../views/Panel';
import { ColorModeContextProvider } from '../contexts/ColorModeContext';
import { BrowserTheme } from '../themes/BrowserTheme';
import { PanelTheme } from '../themes/PanelTheme';
import { EmailChangeConfirmation } from 'components/Auth/Confirmation/EmailChangeConfirmation';
import { About } from 'views/HomePage/About/About';
import { Contact } from 'views/HomePage/Contact';
import HomePage from 'views/HomePage/MainPage/HomePage';
import { Browser } from 'views/Browser';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
