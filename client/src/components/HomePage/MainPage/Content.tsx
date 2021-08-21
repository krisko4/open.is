import { CardMedia, Fade, Grow, Slide, Zoom } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { Parallax } from 'react-parallax';
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";
import './styles.css';


const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            marginTop: -50,
            borderRadius: 10
        },
        container: {
            marginLeft: 30,
            marginRight: 30,
            position: 'relative',

        },
        text: {
            fontFamily: 'sans-serif',
            color: 'grey'
        },
        media: {
            height: 400,
            width: 600,
            [theme.breakpoints.only('xs')]: {
                height: 200,
                width: 200
            }
        },
        image: {
            height: 100,
            width: 100,
            objectFit: 'cover'
        },
        banner: {
            height: 600,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            marginTop: 70,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.5)),  url(${process.env.REACT_APP_BASE_URL}/images/img.jpg)`
        }

    }),
);


const Content = () => {

    const classes = useStyles()
    const [isVisible1, setVisible1] = useState(false)
    const [isVisible2, setVisible2] = useState(false)
    const [isVisible3, setVisible3] = useState(false)
    const [isVisible4, setVisible4] = useState(false)

    const sections = [
        {
            in: isVisible1,
            section: <Section1 image={classes.media} />
        },
        {
            in: isVisible2,
            section: <Section2 image={classes.media} />
        },
        {
            in: isVisible3,
            section: <Section3 image={classes.media} />
        },
        {
            in: isVisible4,
            section: <Section4 />
        }
    ]

    const handleScroll = () => {
        window.scrollY > 300 ? setVisible1(true) : setVisible1(false)
        window.scrollY > 500 ? setVisible2(true) : setVisible2(false)
        window.scrollY > 1900 ? setVisible3(true) : setVisible3(false)
        window.scrollY > 3000 ? setVisible4(true) : setVisible4(false)

    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <Grid container justify="center" style={{ background: '#480000' }}>

            <Grid item style={{ textAlign: 'center', marginTop: 40 }} xs={12}>
                <Fade in={isVisible1} timeout={1000}>
                    <Typography variant="h5" style={{ color: 'white' }}>Find open places in your neighbourhood easily using our software</Typography>
                </Fade>
            </Grid>
            <Grid item style={{ textAlign: 'center', marginTop: 20 }} xs={6}>
                <Grow in={isVisible2} timeout={1000}>
                    <Typography variant="subtitle1" style={{ color: 'lightgrey' }}>
                        Open.is is a platform designed to provide reliable data about the opening state of local businesses.
                        What differs us from other services such as Google Maps, we rely on direct relations with our users.
                        Our mission is to encourage business owners to manage their places using our software and benefit
                        from all the features provided by our platform in order to develop and expand their customer basis.
                    </Typography>
                </Grow>
                <Grow in={isVisible2}>

                    <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/growth.jpg`}
                        style={{ height: 600, marginTop: 40 }}
                    >
                    </CardMedia>
                </Grow>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 70 }}>
                <Parallax

                    bgImage={`${process.env.REACT_APP_BASE_URL}/images/img.jpg`}
                    strength={-400}
                    renderLayer={() => (
                        <div
                            style={{
                                position: 'absolute',
                                background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3))`,
                                width: '100%',
                                height: '100%'

                            }}
                        />
                    )}
                >
                    <Grid container style={{ height: 800 }} alignItems="center" direction="column" justify="center">
                        <Typography variant="h2" style={{ color: 'white' }}>Spread your wings.</Typography>
                        <Typography variant="h6" style={{ color: 'white' }}>Let us take care of your development</Typography>
                        <Button variant="outlined" size="large" style={{ color: 'white', borderColor: 'white', marginTop: 10 }}>Join us</Button>
                    </Grid>
                </Parallax>
            </Grid>

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
                    <Zoom in={isVisible4} timeout={1000}>

                        <CardMedia
                            image={`https://i.pinimg.com/originals/a0/0d/f3/a00df38393640dd4827cedec1dbad1ae.jpg`}
                            style={{ height: 600, marginTop: 40 }}
                        >
                        </CardMedia>
                    </Zoom>
                </Grid>
            </Grid>
            <Section4 />
            <Section5 image={classes.image} />

            {/* {sections.map((section, index) => {
                return (
                    <Grid container key={index} style={{ height: 600 }}>
                        <CSSTransition
                            in={section.in}
                            timeout={300}
                            classNames='alert'
                            unmountOnExit
                        >
                            {section.section}
                        </CSSTransition>
                    </Grid>
                )
            })}
            <Section5 text={classes.text} image={classes.image} /> */}
        </Grid >
    )
}

export default Content