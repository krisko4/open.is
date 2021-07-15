
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import FirstHeader from "./FirstHeader";
import SecondHeader from "./SecondHeader";
import PlacesBox from "./Places/PlacesBox";
import MapBox from "./MapBox";
import myAxios from "../../axios/axios";
import SelectedPlacesContext from "../../contexts/SelectedPlacesContext";









const Browser = () => {



    const [mapCenter, setMapCenter] = useState([53.13333, 23.16433])



    return (
       <SelectedPlacesContext>
           <Grid container direction="column" style={{height: '100vh'}}>
               <FirstHeader/>
               <SecondHeader />
               <Grid container direction="row" style={{flex: '1 1 auto'}}>
                   <PlacesBox setMapCenter={setMapCenter} />
                   <MapBox mapCenter={mapCenter} />
               </Grid>

           </Grid>
       </SelectedPlacesContext>


    )

}

export default Browser