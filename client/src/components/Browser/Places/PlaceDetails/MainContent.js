import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import PhoneIcon from '@material-ui/icons/Phone';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LanguageIcon from '@material-ui/icons/Language';
import Divider from "@material-ui/core/Divider";




const MainContent = ({place}) => {


    const icons = [
        {
            icon: <PhoneIcon color="primary"/>,
            text: place.phone
        },
        {
            icon: <MailOutlineIcon color="primary"/>,
            text: place.email
        },
        {
            icon: <LanguageIcon color="primary"/>,
            text: place.website
        },
    ]

    const currentColor = place.status === 'open' ? 'green' : 'red'
    const [value, setValue] = useState(3)

    return (
        <Grid container style={{marginTop: 10}}>
            <Grid item lg={5} align="center">
                <img style={{width: '100%', marginTop: 10, marginLeft: 15}}
                     src={`${process.env.REACT_APP_BASE_URL}/images/${place.img}`}/>
                <Typography variant="h6" style={{color: 'white'}}>
                    This place is now <span style={{color: currentColor, fontWeight: 'bold'}}>{place.status.toUpperCase()}</span>
                </Typography>
            </Grid>
            <Grid item lg={6} align="center">
                <Typography variant="h2" style={{color: 'white', fontWeight: 'bold'}}>
                    {place.name}
                </Typography>
                <Typography variant="h6" style={{color: 'white'}}>
                    {place.subtitle}
                </Typography>
                <Grid item lg={9}>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body1" style={{color: 'white'}}>{place.type}</Typography>
                </Grid>
                <Grid item lg={8} style={{marginTop: 10}}>
                    <Typography variant="body1" style={{color: 'lightgrey'}}>{place.description}</Typography>
                </Grid>
            </Grid>
            <Grid item container lg={12} style={{marginTop: 10}} justify="center">
                <Grid item lg={10}>
                    <Divider style={{width: '100%', background: 'red'}}></Divider>
                </Grid>
            </Grid>
            <Grid item container lg={12} justify="space-around" style={{marginTop: 20, marginBottom: 10}}>
                {icons.map((item, index) => {
                    return (
                        <Grid item lg={3} key={index}>
                            <Card elevation={10} style={{background: '#2C2C2C', borderRadius: 10}}>
                                <CardContent>
                                    <Grid container justify="center">
                                        <Grid item lg={12} align="center">
                                            {item.icon}
                                        </Grid>
                                        <Grid item style={{color: 'white'}}>
                                            {item.text}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    );
}

export default MainContent;