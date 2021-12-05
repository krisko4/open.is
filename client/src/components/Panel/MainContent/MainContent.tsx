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
import { useSelectedOptionSelector } from '../../../store/selectors/SelectedOptionSelector'
import { Route, useHistory, useRouteMatch, useLocation, Redirect } from "react-router-dom";
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector";
// interface Props {
//   chosenPlace: any
// }

export const MainContent: FC = () => {

  const selectedOption = useSelectedOptionSelector()
  let match = useRouteMatch();
  const history = useHistory()
  const places = usePlacesSelector()
  const location = useLocation()
  console.log(location)



  return (
    <Grid container direction="row" style={{ height: '100%' }} item lg={10}>
      <Scrollbars autoHide>
        <Header />
        {places.length === 0 && location.pathname === '/panel' && <NoPlaces />}
        <CurrentPlaceContextProvider>
          <StepContextProvider>
            <Route
              path={`${match.url}/new-place`}
              component={NewPlace}
            />
          </StepContextProvider>
        </CurrentPlaceContextProvider>
        <CurrentPlaceContextProvider>
          <Route
            path={`${match.url}/management`}
            component={PlaceManagement}
          />
        </CurrentPlaceContextProvider>
        <Route
          path={`${match.url}/dashboard`}

        >
          <Dashboard />
        </Route>
        <Route
          path={`${match.url}/account`}
          component={MyAccount}
        />
        <Route
          path={`${match.url}/new-business-chain`}
          component={NewBusinessChain}
        />

        {/* {selectedOption === ChosenOptions.NO_PLACES && <NoPlaces />} */}
        {/* {selectedOption === ChosenOptions.PLACE_MANAGEMENT &&
          <CurrentPlaceContextProvider>
            <PlaceManagement />
          </CurrentPlaceContextProvider>
        } */}
        {/* {selectedOption === ChosenOptions.MY_ACCOUNT && <MyAccount />}
        {selectedOption === ChosenOptions.NEW_BUSINESS_CHAIN && <NewBusinessChain />} */}
      </Scrollbars>
    </Grid>

  )
}

