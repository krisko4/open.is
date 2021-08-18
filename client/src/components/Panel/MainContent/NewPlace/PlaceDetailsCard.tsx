import React, {FC, useContext} from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LanguageIcon from "@material-ui/icons/Language";
import { StepContext, useStepContext } from "../../../../contexts/StepContext";



export const PlaceDetailsCard : FC = () => {

    const {placeName, placeDetails, contactDetails} = useStepContext()

    const icons = [
        {
            icon: <PhoneIcon color="primary"/>,
            text: contactDetails.phoneNumber || 'Phone number'
        },
        {
            icon: <MailOutlineIcon color="primary"/>,
            text: contactDetails.email || 'Contact e-mail'
        },
        {
            icon: <LanguageIcon color="primary"/>,
           text: contactDetails.website || 'Website address'
        },
    ]

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Place card
                </Typography>
                <Typography variant="subtitle2">
                    Your place will look similar to this template in a browser
                </Typography>
                <Grid container style={{marginTop: 10}}>
                    <Grid item lg={5}>
                        <CardMedia
                            image="https://twojspozywczy.pl/wp-content/uploads/2020/04/lidl-sklep.jpg"
                            style={{height: 200}}
                        />
                    </Grid>
                    <Grid item lg={6} container justify="center" direction="column" style={{textAlign: 'center', marginLeft: 10, alignItems: 'center'}}>
                        <Typography variant="h3" style={{ fontWeight: 'bold'}}>
                           {placeName || 'Business name'} 
                        </Typography>
                        <Typography variant="h6" >
                            {placeDetails.subtitle || 'This is a short subtitle of my place'} 
                        </Typography>
                            <Rating
                                name="simple-controlled"
                                value={5}
                            />
                            <Typography variant="body1" style={{fontStyle: 'italic'}}>{placeDetails.type || 'Business type'}</Typography>
                            <Typography variant="body1" style={{marginTop: 10}}>
                                {placeDetails.description || 'This is a brief description of my business. In this section I can make my visitors interested in my company.'}
                                </Typography>
                    </Grid>
                    <Grid item container lg={12} style={{marginTop: 10}} justify="center">
                        <Grid item lg={10}>
                            <Divider style={{width: '100%', background: '#2196f3'}}/>
                        </Grid>
                    </Grid>
                    <Grid item container lg={12} justify="space-around" style={{marginTop: 20, marginBottom: 10}}>
                        {icons.map((item, index) => {
                            return (
                                <Grid item lg={3} key={index}>
                                    <Card elevation={10} style={{borderRadius: 10}}>
                                        <CardContent>
                                            <Grid container justify="center">
                                                <Grid item lg={12} style={{textAlign: 'center'}}>
                                                    {item.icon}
                                                </Grid>
                                                <Grid item >
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
            </CardContent>
        </Card>
    )
}