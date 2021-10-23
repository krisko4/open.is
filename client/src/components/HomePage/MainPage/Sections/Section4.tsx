import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import React, { FC } from "react";
import { Fade, Grow, Slide, Zoom } from "@material-ui/core";

interface Props {
    isVisible4: boolean
}

const Section4: FC<Props> = ({ isVisible4 }) => {
    return (

        <Grid
            container
            style={{ background: '#F8F8F8', height: 700,  paddingTop: 50 }}
            justify="center"

        >
            <Zoom
                in={true}
                timeout={500}
            >
                <Grid item container lg={5}>
                    <img
                        src={`https://cdn.dribbble.com/users/149434/screenshots/4648999/media/5c3f4d529f815548b49997f967a6d65d.gif`}
                        style={{ width: '100%', objectFit: 'contain' }}
                    
                    />
                </Grid>
            </Zoom >
            <Grow
                in={true}
            >
                <Grid item container lg={5} xs={10} alignItems="center" >
                    <Fade in={isVisible4} timeout={1000}>
                        <div>
                            <Typography variant="h5" style={{ color: '#3c4858' }} >Rate places and share your opinion with community</Typography>
                            <Typography variant="subtitle1" style={{ color: 'grey', marginTop: 10 }}>
                                Your feedback is extremely important. By sharing your insights, you can encourage
                                other people to visit a place or constructively criticise place owners
                                and their staff for their services.
                            </Typography>
                        </div>
                    </Fade>
                </Grid>
            </Grow>


            {/* <Grid item lg={5}  style = {{marginTop: 100, color: 'white'}}>
                <Slide direction="left" in={true}>
                <Typography variant="h3" style={{fontWeight: 'bold'}}>
                    Our goal is your <br/> <span style={{color: '#2196f3', textDecoration: 'underline'}}>satisfaction.</span>
                </Typography>
                </Slide>
                <Grid item lg={7} xs={10} style={{marginTop: 20}}>
                    <Typography variant="h6" style={{color: 'lightgrey'}}>
                        We are proud of having such ability to assume that our clients are satisfied with our services.
                        Open.is has received several prestigious awards for providing a technology which makes everyday life easier.
                    </Typography>
                </Grid>

            </Grid>
            <Grid item lg={5} style={{marginTop:50, marginBottom: 50}}>
                <CardMedia
                    style={{width: 400, height: 400}}
                    image="https://paryskie-perfumy.pl/wp-content/uploads/2020/01/satisfaction.png"
                />
            </Grid> */}
        </Grid >
    )
}

export default Section4