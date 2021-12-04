import Grid from "@material-ui/core/Grid";
import React, { FC, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { ChosenOptions, usePanelContext } from "../../../contexts/PanelContexts/PanelContext";
import { StepContextProvider } from "../../../contexts/StepContext";
import Header from "../Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { MyAccount } from './MyAccount/MyAccount';
import { NewPlace } from "./NewPlace/NewPlace";
import { NoPlaces } from "./NoPlaces/NoPlaces";
import { PlaceManagement } from './PlaceManagement/PlaceManagement';
import { NewBusinessChain } from './NewBusinessChain/NewBusinessChain'
import { CurrentPlaceContextProvider } from "../../../contexts/PanelContexts/CurrentPlaceContext";
import {useSelectedOptionSelector} from '../../../store/selectors/SelectedOptionSelector'
// interface Props {
//   chosenPlace: any
// }

export const MainContent: FC = () => {

  const selectedOption = useSelectedOptionSelector()



  return (
    <Grid container direction="row" style={{ height: '100%' }} item lg={10}>
      <Scrollbars autoHide>
        <Header />
        {selectedOption === ChosenOptions.DASHBOARD && <Dashboard />}
        {selectedOption === ChosenOptions.NEW_PLACE &&
          <CurrentPlaceContextProvider>
            <StepContextProvider>
              <NewPlace />
            </StepContextProvider>
          </CurrentPlaceContextProvider>
        }
        {selectedOption === ChosenOptions.NO_PLACES && <NoPlaces />}
        {selectedOption === ChosenOptions.PLACE_MANAGEMENT &&
          <CurrentPlaceContextProvider>
            <PlaceManagement/>
          </CurrentPlaceContextProvider>
        }
        {selectedOption === ChosenOptions.MY_ACCOUNT && <MyAccount />}
        {selectedOption === ChosenOptions.NEW_BUSINESS_CHAIN && <NewBusinessChain />}
      </Scrollbars>
    </Grid>

  )
}

