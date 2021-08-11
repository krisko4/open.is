import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {CSSTransition} from "react-transition-group";
import './styles.css'
import Section1 from "./Sections/Section1";

import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";
import Fade from "@material-ui/core/Fade";


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
            section: <Section1 image={classes.media}/>
        },
        {
            in: isVisible2,
            section: <Section2 image={classes.media}/>
        },
        {
            in: isVisible3,
            section: <Section3 image={classes.media}/>
        },
        {
            in: isVisible4,
            section: <Section4 image={classes.media}/>
        }
    ]

    const handleScroll = () => {
        window.scrollY > 650 ? setVisible1(true) : setVisible1(false)
        window.scrollY > 1200 ? setVisible2(true) : setVisible2(false)
        window.scrollY > 1800 ? setVisible3(true) : setVisible3(false)
        window.scrollY > 2400 ? setVisible4(true) : setVisible4(false)

    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        // <Grid container className={classes.container} justify="center">
        //     <Grid item xs={12}>
        //         <Card elevation={20} className={classes.card}>
        //             <Grid container justify="center" style={{marginTop: 50}}>
        //                 <Grid item lg={6} xs={10} align="center">
        //                     <Typography variant="h5" className={classes.text}>
        //                         Have you ever wanted to visit a place, but were not sure whether it was open?
        //                     </Typography>
        //                     <Typography variant="h2" style={{fontWeight: 'bold'}}>
        //                         You have just found a right place.
        //                     </Typography>
        //                 </Grid>
        //             </Grid>

        //             {sections.map((section, index) => {
        //                 return (
        //                     <Grid container key={index} style={{height: 600}}>
        //                         <CSSTransition
        //                             in={section.in}
        //                             timeout={300}
        //                             classNames='alert'
        //                             unmountOnExit
        //                         >
        //                             {section.section}
        //                         </CSSTransition>
        //                     </Grid>
        //                 )
        //             })}
        //             <Section5 text={classes.text} image={classes.image}/>
        //         </Card>
        //     </Grid>
        //     <Grid container alignItems="center" direction="row" style={{marginTop: 50, marginBottom: 50}}>
        //         <Grid item xs={8} style={{marginLeft: 100}}>
        //             <h1>Ready to register your business?<br/>
        //                 <div style={{color: '#2196f3'}}>Join us today.</div>
        //             </h1>
        //         </Grid>
        //         <Grid item xs={3} align="center">
        //             <Button style={{minWidth: 150, minHeight: 50}} color="primary" variant="contained">Sign in</Button>
        //         </Grid>
        //     </Grid>
        // </Grid>
        <Grid container style={{background: '#480000'}}>

        <Grid item style={{textAlign: 'center', marginTop: 20}} xs={12}>
            Open.is is a 
        </Grid>
                 {sections.map((section, index) => {
                         return (
                           <Grid container key={index} style={{height: 600}}>
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
                 <Section5 text={classes.text} image={classes.image}/>
        </Grid>
    )
}

export default Content