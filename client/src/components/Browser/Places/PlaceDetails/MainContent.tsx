import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LanguageIcon from '@material-ui/icons/Language';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import { Alert } from "@material-ui/lab";
import Rating from "@material-ui/lab/Rating";
import React, { FC } from 'react';


interface PlaceTypes {
    place: any,

}

const MainContent: FC<PlaceTypes> = ({ place }) => {


    const icons = [
        {
            icon: <PhoneIcon color="primary" />,
            text: place.phone
        },
        {
            icon: <MailOutlineIcon color="primary" />,
            text: place.email
        },
        {
            icon: <LanguageIcon color="primary" />,
            text: place.website
        },
    ]



    return (
        <Grid container style={{ marginTop: 10 }} justify="space-evenly">
            <Grid item lg={5} style={{ textAlign: 'center' }}>
                <img style={{ width: '100%', marginTop: 10 }} alt="place img"
                    src={`${process.env.REACT_APP_BASE_URL}/images/places/${place.img}`} />
            </Grid>
            <Grid item lg={5} container direction="column" style={{ textAlign: 'center', marginLeft: 10, alignItems: 'center' }}>
                <Typography variant="h2" style={{ color: 'white', fontWeight: 'bold' }}>
                    {place.name}
                </Typography>
                <Typography variant="h6" style={{ color: 'white' }}>
                    {place.subtitle}
                </Typography>
                {place.status === 'open' ? <Alert severity="success" variant="filled" style={{ marginTop: 10 }}>
                    This place is now {place.status.toUpperCase()}
                </Alert>
                    : <Alert severity="error" variant="filled" style={{ marginTop: 10 }}>
                        This place is now {place.status.toUpperCase()}
                    </Alert>

                }
                <Rating
                    style={{ marginTop: 20 }}
                    name="simple-controlled"
                    value={place.averageNote.average}
                    readOnly
                />
                <Typography variant="body1" style={{ color: 'white', fontStyle: 'italic' }}>{place.type}</Typography>
                <Typography variant="body1" style={{ color: 'lightgrey', marginTop: 30 }}>{place.description}</Typography>

            </Grid>
            <Grid item container lg={12} justify="center">
                <Grid item lg={10} style={{ marginTop: 20 }}>
                    <Divider style={{ width: '100%', background: 'red' }}></Divider>
                </Grid>
            </Grid>
            <Grid item container lg={12} justify="space-around" style={{ marginTop: 20, marginBottom: 10 }}>
                {icons.map((item, index) => {
                    return (
                        <Grid item lg={3} key={index}>
                            <Card elevation={10} style={{ background: '#2C2C2C', borderRadius: 10 }}>
                                <CardContent>
                                    <Grid container justify="center">
                                        <Grid item lg={12} style={{ textAlign: 'center' }}>
                                            {item.icon}
                                        </Grid>
                                        <Grid item style={{ color: 'white' }}>
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