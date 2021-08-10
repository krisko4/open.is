
import React from "react";
import Grid from "@material-ui/core/Grid";
import FirstHeader from "./FirstHeader";
import SecondHeader from "./SecondHeader";
import PlacesBox from "./Places/PlacesBox";
import MapBox from "./MapBox";
import SelectedPlacesContext from "../../contexts/SelectedPlacesContext";
import MapContextProvider from "../../contexts/MapContext";
import {AuthContextProvider} from "../../contexts/AuthContext";









const Browser = () => {


    return (
       <SelectedPlacesContext>
           <Grid container direction="column" style={{height: '100vh'}}>
               <AuthContextProvider>
               <FirstHeader/>
               </AuthContextProvider>
               <SecondHeader />
               <Grid container direction="row" style={{flex: '1 1 auto'}}>
                   <MapContextProvider>
                   <PlacesBox/>
                   <MapBox/>
                   </MapContextProvider>
               </Grid>
           </Grid>
       </SelectedPlacesContext>


    )

}

export default Browser