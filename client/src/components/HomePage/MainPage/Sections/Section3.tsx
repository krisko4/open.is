import { Grow, Zoom, Fade } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";

interface Props {
    isVisible3: boolean
}

const Section3: FC<Props> = ({ isVisible3 }) => {
    return (
        <Grid item xs={10} justify="center" container style={{ paddingBottom: 200 }}>
            <Grid item container justify="center">
                <Fade
                    in={isVisible3}
                    timeout={3000}
                >
                    <Grid item xs={6}>
                        <CardMedia
                            image={`https://cdn.dribbble.com/users/568/screenshots/2937224/browserpreview_tmp.gif`}
                            style={{ height: 600 }}
                        >
                        </CardMedia>
                    </Grid>
                </Fade>

                <Grid item container xs={5} alignItems="center" >
                    <Grow
                        in={isVisible3}
                        {...(isVisible3 ? { timeout: 3000 } : {})}
                    >
                        <div>
                            <Typography variant="h5" style={{ color: 'white' }}>Locate your desired place by address or name</Typography>
                            <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10 }}>
                                Access the information about most recent news from places you'd like to visit.
                                Find out about upcoming events, bargains or parties. Order food from your favourite
                                restaurant via UberEats or book a visit to a hairdresser.
                            </Typography>
                            <Grid container style={{ marginTop: 20 }} justify="space-evenly">
                                <CardMedia style={{ height: 150, width: 150 }} image="/images/ubereats.png" />
                                <CardMedia style={{ height: 150, width: 150 }} image="/images/bolt.jpg" />
                                <CardMedia style={{ height: 150, width: 150 }} image="/images/moment.png" />
                            </Grid>

                        </div>
                    </Grow>
                </Grid>
                {/* <Grow
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
                            image={`https://cdn.dribbble.com/users/149434/screenshots/4648999/media/5c3f4d529f815548b49997f967a6d65d.gif`}
                            style={{ height: 300 }}
                        >
                        </CardMedia>
                    </Grid>
                </Zoom> */}


            </Grid>
        </Grid>
    )
}

export default Section3