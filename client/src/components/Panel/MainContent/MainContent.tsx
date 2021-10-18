import { Fade } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { FC, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ChosenOptions, usePanelContext } from "../../../contexts/PanelContext";
import { StepContextProvider } from "../../../contexts/StepContext";
import Header from "../Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { NewPlace } from "./NewPlace/NewPlace";
import { NoPlaces } from "./NoPlaces/NoPlaces";
import { PlaceManagement } from './PlaceManagement/PlaceManagement';
import {MyAccount} from './MyAccount/MyAccount'

export const MainContent: FC = () => {

  const { selectedOption } = usePanelContext()

  return (
    <Grid container direction="row" style={{ height: '100%' }} item lg={10}>
      <Scrollbars autoHide>
        <Header />
        {selectedOption === ChosenOptions.DASHBOARD && <Dashboard />}
        {selectedOption === ChosenOptions.NEW_PLACE &&
          <StepContextProvider>
            <NewPlace />
          </StepContextProvider>}
        {selectedOption === ChosenOptions.NO_PLACES && <NoPlaces />}
        {selectedOption === ChosenOptions.PLACE_MANAGEMENT && <PlaceManagement />}
        {selectedOption === ChosenOptions.MY_ACCOUNT && <MyAccount />}
      </Scrollbars>
    </Grid>

  )
}

