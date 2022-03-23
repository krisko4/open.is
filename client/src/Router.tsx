import { CssBaseline } from '@mui/material';
import React, { FC } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Confirmation } from './components/Auth/Confirmation';
import { EmailChangeConfirmation } from './components/Auth/EmailChangeConfirmation';
import Browser from './components/Browser/Browser';
import { About } from './components/HomePage/About/About';
import { Contact } from './components/HomePage/Contact/Contact';
import HomePage from './components/HomePage/MainPage/HomePage';
import { Panel } from './components/Panel/Panel';
import { ColorModeContextProvider } from './contexts/ColorModeContext';
import { BrowserTheme } from './themes/BrowserTheme';
import { PanelTheme } from './themes/PanelTheme';

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
export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};
