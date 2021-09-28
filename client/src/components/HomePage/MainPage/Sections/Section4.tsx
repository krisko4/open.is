import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import React, { FC } from "react";
import { Grow, Slide, Zoom } from "@material-ui/core";

const Section4 : FC = () => {
    return (
        
        <Grid
            container
            style={{background: '#F8F8F8', height: 700}}
            justify="center"

        >
                <Grow
                    in={true}
                >
                    <Grid item container xs={5} alignItems="center" style={{marginTop: 100, marginBottom: 100}}>
                        <div>
                            <Typography variant="h5" style={{color: '#3c4858'}} >Rate places and share your opinion with community</Typography>
                            <Typography variant="subtitle1" style={{ color: 'grey', marginTop: 10 }}>
                                Your feedback is extremely important. By sharing your insights, you can encourage
                                other people to visit a place or constructively criticise place owners
                                and their staff for their services.
                            </Typography>
                        </div>
                    </Grid>
                </Grow>
                <Zoom
                    in={true}
                    timeout={500}
                >
                    <Grid item  xs={5} style={{ marginTop: 20 }}>
                        <CardMedia
                            image={`https://cdn.dribbble.com/users/149434/screenshots/4648999/media/5c3f4d529f815548b49997f967a6d65d.gif`}
                            style={{ height: 500 }}
                        >
                        </CardMedia>
                    </Grid>
                </Zoom>


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
        </Grid>
    )
}

export default Section4