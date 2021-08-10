import React, {FC} from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LanguageIcon from "@material-ui/icons/Language";


export const PlaceDetailsCard : FC = () => {

    const icons = [
        {
            icon: <PhoneIcon color="primary"/>,
            text: '1212313312'
        },
        {
            icon: <MailOutlineIcon color="primary"/>,
            text: 'dodo@odod.com'
        },
        {
            icon: <LanguageIcon color="primary"/>,
            text: 'www.dodo.com'
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
                    <Grid item lg={6} container justify="center" direction="column" style={{textAlign: 'center', alignItems: 'center'}}>
                        <Typography variant="h3" style={{ fontWeight: 'bold'}}>
                            McDonald's Polska
                        </Typography>
                        <Typography variant="h6" >
                            Najlepsza jadłodajlnia w Polszy
                        </Typography>
                            <Rating
                                name="simple-controlled"
                                value={5}
                            />
                            <Typography variant="body1" style={{fontStyle: 'italic'}}>Restauracja</Typography>
                            <Typography variant="body1" style={{marginTop: 10}}>Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica</Typography>
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