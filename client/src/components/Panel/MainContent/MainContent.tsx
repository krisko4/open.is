import Grid from "@material-ui/core/Grid";
import React, { FC } from "react";
import { ChosenOptions, usePanelContext } from "../../../contexts/PanelContext";
import { StepContextProvider } from "../../../contexts/StepContext";
import { Dashboard } from "./Dashboard/Dashboard";
import { NewPlace } from "./NewPlace/NewPlace";
import { NoPlaces } from "./NoPlaces/NoPlaces";
import { PlaceManagement } from './PlaceManagement/PlaceManagement';

export const MainContent: FC = () => {

  const {selectedOption} = usePanelContext()

  return (
    <Grid container justify="center" direction="row" style={{ background: '#F5F5F5' }} item lg={10}>
      {selectedOption === ChosenOptions.DASHBOARD && <Dashboard />}
      {selectedOption === ChosenOptions.NEW_PLACE &&
        <StepContextProvider>
          <NewPlace />
        </StepContextProvider>}
      {selectedOption === ChosenOptions.NO_PLACES && <NoPlaces />}
      {selectedOption === ChosenOptions.PLACE_MANAGEMENT && <PlaceManagement/>}
    </Grid>

  )
}