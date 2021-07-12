import Grid from "@material-ui/core/Grid";

import {Divider, Typography} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const PlaceDetails = ({place}) => {

    const currentColor = place.status === 'open' ? 'green' : 'red'


    return(
        <Grid container style={{marginTop: 30}}>
            <Grid container>
                <Grid item xl={5} align="center">
                    <img style={{width: 400, marginTop: 10, marginLeft: 10}} src='https://d-art.ppstatic.pl/kadry/k/r/1/53/86/5ca4afec59405_o_medium.jpg'/>
                    <Typography variant="h6" style={{color: 'white'}}>
                        This place is now <span style={{color: currentColor}}>{place.status.toUpperCase()}</span>
                    </Typography>
                </Grid>
                <Grid item xl={6} align="center">
                    <Typography variant="h2" style={{color: 'white'}}>
                        {place.name}
                    </Typography>
                    <Typography variant="h6" style={{color: 'white'}}>
                        {place.description}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <Divider style={{width:'100%',  backgroundColor: 'red'}} />
                <Tabs
                    variant="fullWidth"
                >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Grid>
        </Grid>
    )
}

export default PlaceDetails