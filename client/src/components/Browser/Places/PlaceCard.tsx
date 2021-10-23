import { Avatar, CardContent, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import createStyles from "@material-ui/styles/createStyles";
import React, { FC } from "react";


const useStyles = makeStyles(() =>
    createStyles({
        card: {
            //  backgroundColor: '#430075',
            backgroundColor: '#2C2C2C',
            borderRadius: 20,
            width: '100%',
            height: '100%'
        },
        image: {
            height: 80,
            width: 80
        }
    })
)

interface PlaceProps {
    place: any
}

export const PlaceCard: FC<PlaceProps> = ({ place }) => {
    const classes = useStyles()
    return (
        <Card
            className={classes.card}
        >
            <CardContent>
                <Grid container  justify="space-between">
                    <Grid item container alignItems="center" >
                        <Grid item>
                            {/* <CardMedia className={classes.image}
                                image={`${process.env.REACT_APP_BASE_URL}/images/places/${place.img}`} /> */}
                            <Avatar style={{ width: 80, height: 80 }} src={place.img} alt={place.name} />
                        </Grid>
                        <Grid item xs={9} lg={9} sm={9} md={9} style={{ marginLeft: 10 }}>
                            <Typography variant="h6" style={{ color: 'white' }}>
                                {place.name}
                            </Typography>
                            <Typography variant="body1" style={{ color: '#A0A0A0' }}>
                                {place.subtitle}
                            </Typography>
                            <Typography variant="overline" style={{ color: '#32de84' }}>
                                {place.type}
                            </Typography>
                            <Typography variant="body2" color="primary">
                                Address: {place.address}
                            </Typography>
                        </Grid>
                        <Grid item style={{ flexGrow: 1, color: 'white' }}>
                            <Grid container justify="center" style={{height: '100%'}} alignItems="center">
                                {place.status === 'open' ?
                                    <Button variant="contained" size="small" style={{ background: '#4caf50', color: 'white' }}>Open</Button>
                                    :
                                    <Button variant="contained" size="small" style={{ background: '#ff5252', color: 'white' }}>Closed</Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

