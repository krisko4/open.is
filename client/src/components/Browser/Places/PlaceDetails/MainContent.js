import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

const MainContent = ({place}) => {

    const currentColor = place.status === 'open' ? 'green' : 'red'

    return (
        <Grid container style={{marginTop: 10}}>
            <Grid item lg={5} align="center">
                <img style={{width: 400, marginTop: 10, marginLeft: 10}}
                     src='https://d-art.ppstatic.pl/kadry/k/r/1/53/86/5ca4afec59405_o_medium.jpg'/>
                <Typography variant="h6" style={{color: 'white'}}>
                    This place is now <span style={{color: currentColor}}>{place.status.toUpperCase()}</span>
                </Typography>
            </Grid>
            <Grid item lg={6} align="center">
                <Typography variant="h2" style={{color: 'white'}}>
                    {place.name}
                </Typography>
                <Typography variant="h6" style={{color: 'white'}}>
                    {place.description}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default MainContent;