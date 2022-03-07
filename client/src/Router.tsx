import { CssBaseline } from "@mui/material";
import { BusinessChainManagement } from "components/Panel/MainContent/BusinessChainManagement/BusinessChainManagement";
import { Dashboard } from "components/Panel/MainContent/Dashboard/Dashboard";
import { AccountSettings } from "components/Panel/MainContent/MyAccount/AccountSettings";
import { NewBusinessChain } from "components/Panel/MainContent/NewBusinessChain/NewBusinessChain";
import businessChainSteps from "components/Panel/MainContent/NewBusinessChain/steps";
import { NewPlace } from "components/Panel/MainContent/NewPlace/NewPlace";
import newPlaceSteps from "components/Panel/MainContent/NewPlace/Steps/steps";
import { OpeningHours } from "components/Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHours";
import { Opinions } from "components/Panel/MainContent/PlaceManagement/PlaceBoard/Opinions/Opinions";
import { PlaceBoard } from "components/Panel/MainContent/PlaceManagement/PlaceBoard/PlaceBoard";
import { PlaceData } from "components/Panel/MainContent/PlaceManagement/PlaceBoard/PlaceData/PlaceData";
import { PlaceSettings } from "components/Panel/MainContent/PlaceManagement/PlaceBoard/Settings/PlaceSettings";
import { NotReady } from "components/reusable/NotReady";
import { BusinessChainContextProvider } from "contexts/PanelContexts/BusinessChainContext";
import { CurrentPlaceContextProvider } from "contexts/PanelContexts/CurrentPlaceContext";
import { StepContextProvider } from "contexts/StepContext";
import React, { FC } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Confirmation } from './components/Auth/Confirmation';
import { EmailChangeConfirmation } from './components/Auth/EmailChangeConfirmation';
import Browser from "./components/Browser/Browser";
import { About } from "./components/HomePage/About/About";
import { Contact } from './components/HomePage/Contact/Contact';
import HomePage from './components/HomePage/MainPage/HomePage';
import { Panel } from './components/Panel/Panel';
import { ColorModeContextProvider } from "./contexts/ColorModeContext";
import { BrowserTheme } from "./themes/BrowserTheme";
import { PanelTheme } from "./themes/PanelTheme";

function NoMatch() {
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
                <Route path="/panel" element={
                    <ColorModeContextProvider>
                        <PanelTheme>
                            <CssBaseline enableColorScheme />
                            <Panel />
                        </PanelTheme>
                    </ColorModeContextProvider>
                }>
                    <Route
                        index
                        element={
                            <Navigate to="dashboard" />
                        }
                    />
                    <Route
                        path={`new-place`}
                        element={
                            <StepContextProvider steps={newPlaceSteps}>
                                <NewPlace />
                            </StepContextProvider>
                        }
                    />
                    <Route
                        path={`management/:id`}
                        element={<PlaceBoard />}
                    >
                        <Route path="home" element={<PlaceData/>} />
                        <Route path="settings" element={<Opinions/>} />
                        <Route path="opening-hours" element={<OpeningHours/>} />
                        <Route path="opinions" element={<PlaceSettings/>} />
                        <Route path="statistics" element={<NotReady/>} />
                        {/* <Route path="opinions" element={<PlaceSettings/>} /> */}
                    </Route>
                    <Route
                        path={`dashboard`}
                        element={
                            <Dashboard />
                        }
                    />
                    <Route
                        path={`account`}
                        element={<AccountSettings />}
                    />
                    <Route path={`business-chain/:id`}
                        element={
                            <BusinessChainContextProvider>
                                <BusinessChainManagement />
                            </BusinessChainContextProvider>
                        }
                    />
                    <Route
                        path={`new-business-chain`}
                        element={
                            <StepContextProvider steps={businessChainSteps}>
                                <NewBusinessChain />
                            </StepContextProvider>
                        }
                    />
                </Route>
                <Route path="/search" element={
                    <ColorModeContextProvider>
                        <BrowserTheme>
                            <CssBaseline enableColorScheme />
                            <Browser />
                        </BrowserTheme>
                    </ColorModeContextProvider>
                } />
                <Route path="/confirm/:token" element={<Confirmation />} />
                <Route path="/:email/confirm/:token" element={<EmailChangeConfirmation />} />
                <Route path="*" element={<NoMatch />} />

            </Routes>
        </BrowserRouter>
    )
}