
import { Card, CardContent, CardMedia, Divider, Grid, IconButton, Slide, Paper, Typography } from "@mui/material";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined"
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { FC, useEffect } from "react";
import {animateScroll as scroll} from 'react-scroll'
import { Team } from "./Team";

const items = [
    {
        name: 'Krzysztof Wyszyński',
        role: 'CEO',
        image: `${process.env.REACT_APP_BASE_URL}/images/ja.jpg`
    },
    {
        name: 'Christopher Cononovitz',
        role: 'Development manager',
        image: `https://ocdn.eu/pulscms-transforms/1/zMSktkqTURBXy9kMzBjNzkyOWJjZTgxMGNiZTNkYzViZGJmZjZmYmMxMS5qcGVnkpUDAA3NAVjMwpMFzQGkzQEs`
    },
    {
        name: 'George Suchodolsky',
        role: 'Promotion manager',
        image: `https://yt3.ggpht.com/a/AGF-l78NQAy60mopFW0l90704VozNKFKp5_Z37IrMg=s400-c-k-c0xffffffff-no-rj-mo`
    },
]


export const Section3: FC<any> = ({ classes}) => {



    return (
        <Grid container alignItems="center" className={classes.background}>
            <Grid container justifyContent="center">
                <Grid item container justifyContent="center" xs={11} lg={5} style={{ textAlign: 'center', marginBottom: 100 }}>
                    <Typography variant="h2" style={{ color: 'white', fontWeight: 'bold' }}>Who are <span style={{ color: 'red' }}>we</span>?</Typography>
                    <Grid item xs={10} style={{ marginTop: 20 }}>
                        <Typography variant="h6" style={{ color: 'white' }}>
                            We are a group of young, creative people. Programming and constant development is our passion.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center">
                    <Slide in={true} timeout={1500}>
                        <Grid item xs={11} lg={7} md={9} sm={10}>
                            <Card>
                                <CardContent>
                                    <Grid container alignItems="center" direction="column">
                                        <Typography variant="h3" style={{ textAlign: 'center' }}>Meet our team</Typography>
                                        <Divider style={{ width: '80%', marginBottom: 20, marginTop: 10, background: 'darkgrey' }} />
                                    </Grid>
                                    <Grid container>
                                        {items.map((item, index) => <Grid item xs={4} container alignItems="center" style={{ marginBottom: 20 }} direction="column" key={index}>
                                            <CardMedia style={{  height: 200, width: '100%', backgroundPosition: 'center', backgroundSize: 'contain' }} image={item.image} />
                                            <div style={{ marginTop: 10, textAlign: 'center' }}>
                                                <b>{item.name}</b><br /><span style={{ fontStyle: 'italic' }}>{item.role}</span>
                                            </div>
                                        </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Grid container justifyContent="center">
                                <IconButton
                                    onClick={() => scroll.scrollTo(800, {duration: 500})}
                                    style={{ marginTop: -40 }}
                                    size="large">
                                    <KeyboardArrowDown className={classes.button} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Slide>
                </Grid>
            </Grid>
        </Grid>
    );
}