
import { CardMedia, Zoom } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";

interface Props{
    isVisible6 : boolean
}


const Section6: FC<Props> = ({isVisible6}) => {


    return (


        <Grid justify="center" item container xs={12}>
            <Grid item style={{ textAlign: 'center', marginTop: 40 }} xs={12}>
                <Typography variant="h5" style={{ color: 'white' }}>Watch your business grow using our dedicated panel</Typography>
            </Grid>
            <Grid item style={{ textAlign: 'center', marginTop: 20 }} xs={6}>
                <Typography variant="subtitle1" style={{ color: 'lightgrey' }}>
                    Your success is our goal. For this reason we have built a platform where our users are able
                    to manage their places and keep track of all the activity related to their businesses.
                    Using interactive charts, you can observe the amount of people visiting your profile
                    and leaving their opinions on daily basis.
                </Typography>
                <Zoom in={isVisible6} timeout={1000}>

                    <CardMedia
                        image={`https://i.pinimg.com/originals/a0/0d/f3/a00df38393640dd4827cedec1dbad1ae.jpg`}
                        style={{ height: 600, marginTop: 40 }}
                    >
                    </CardMedia>
                </Zoom>
            </Grid>
        </Grid>
    )
}

export default Section6