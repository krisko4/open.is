import { Grow, Zoom } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";

interface Props {
    isVisible3: boolean
}

const Section3 : FC<Props> = ({isVisible3}) => {
    return (
        <Grid item xs={12} justify="center" container style={{ background: '#300000', paddingBottom: 70 }}>
            <Grid item container xs={8} justify="space-evenly" style={{ marginTop: 70 }}>
                <Zoom
                    in={isVisible3}
                    timeout={500}
                >
                    <Grid item xs={5}>
                        <CardMedia
                            image={`${process.env.REACT_APP_BASE_URL}/images/bolcik.png`}
                            style={{ height: 300 }}
                        >
                        </CardMedia>
                    </Grid>
                </Zoom>

                <Grid item container xs={5} alignItems="center" >
                    <Grow
                        in={isVisible3}
                        {...(isVisible3 ? { timeout: 1500 } : {})}
                    >
                        <div>
                            <Typography variant="h5" style={{ color: 'white' }}>Find your desired place by address or name</Typography>
                            <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10 }}>
                                Access the information about most recent news from places you'd like to visit.
                                Find out about upcoming events, bargains or parties. Order food from your favourite
                                restaurant via UberEats or book a visit to a hairdresser.
                            </Typography>
                        </div>
                    </Grow>
                </Grid>

                <Grow
                    in={isVisible3}
                    {...(isVisible3 ? { timeout: 1500 } : {})}
                >

                    <Grid item container xs={5} alignItems="center">
                        <div>
                            <Typography variant="h5" style={{ color: 'white' }}>Rate places and share your opinion with community</Typography>
                            <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10 }}>
                                Your feedback is extremely important. By sharing your insights, you can encourage
                                other people to visit a place or constructively criticise place owners
                                and their staff for their services.
                            </Typography>
                        </div>
                    </Grid>
                </Grow>
                <Zoom
                    in={isVisible3}
                    timeout={500}
                >
                    <Grid item xs={5} style={{ marginTop: 20 }}>
                        <CardMedia
                            image={`${process.env.REACT_APP_BASE_URL}/images/bolcik.png`}
                            style={{ height: 300 }}
                        >
                        </CardMedia>
                    </Grid>
                </Zoom>


            </Grid>
        </Grid>
    )
}

export default Section3