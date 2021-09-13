import { Card, CardContent, makeStyles, Paper, Slide, Tab, Tabs, Typography } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from "react";
import { Status, usePanelContext } from "../../../../contexts/PanelContext";
import { News } from "../../../reusable/News";
import OpeningHours from "../../../reusable/OpeningHours";
import { Opinions } from "../../../reusable/Opinions";


const useNewsStyles = makeStyles({
    paper: {
        padding: '6px 16px',
        borderRadius: 10,
    },
    title: {
        color: 'black'
    },
    content: {
        color: 'grey'
    },
    dialog: {
        background: 'white',
        '& .dialogTitle': {
            color: '#2196f3'
        },
        '& .dialogContentText': {
            color: 'black'
        },
        '& .opinionArea': {
            background: 'white',
            borderRadius: 5
        },
        '& .input': {
            color: 'black'
        }
    }
});



const useOpeningHoursStyles = makeStyles({
    container: {
        background: 'inherit',
        borderRadius: 10,
    },
    title: {
        textAlign: 'center',

    },
    divider: {
        marginTop: 10,
        background: '#2196f3',
        marginBottom: 10
    },
    days: {},
    hours: {}
})


const useOpinionsStyles = makeStyles({
    opinionCard: {
        background: 'inherit',
    },
    author: {
        color: '#2196f3'
    },
    date: {
        color: 'grey'
    },
    content: {
        color: 'black'
    },
    dialog: {
        background: 'white',
        '& .dialogTitle': {
            color: '#2196f3'
        },
        '& .dialogContentText': {
            color: 'black'
        },
        '& .opinionArea': {
            background: 'white',
            borderRadius: 5
        },
        '& .input': {
            color: 'black'
        }
    }
})

export const PlaceDetailsCard: FC = () => {

    const { currentPlace, setCurrentPlace, news, setNews, opinions, setOpinions, opinionCount, setOpinionCount } = usePanelContext()

    const newsClasses = useNewsStyles()
    const openingHoursClasses = useOpeningHoursStyles()
    const opinionClasses = useOpinionsStyles()
    const [value, setValue] = useState(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const icons = [
        {
            icon: <PhoneIcon color="primary" />,
            text: currentPlace.phone || 'Phone number'
        },
        {
            icon: <MailOutlineIcon color="primary" />,
            text: currentPlace.email || 'Contact e-mail'
        },
        {
            icon: <LanguageIcon color="primary" />,
            text: currentPlace.website || 'Website address'
        },
    ]

    const tabContents = [
        <News news={news} setNews={setNews} currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} classes={newsClasses} />,
        <OpeningHours classes={openingHoursClasses} />,
        <Opinions
            currentPlace={currentPlace}
            setCurrentPlace={setCurrentPlace}
            classes={opinionClasses}
            opinions={opinions}
            setOpinions={setOpinions}
            opinionCount={opinionCount}
            setOpinionCount={setOpinionCount}
        />
    ]

    const MyTab = (props: any) => {
        const { label, ...rest } = props
        return <Tab {...rest} label={label} disableRipple />
    }
    return (
        <Slide in={true}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h5">
                        Place card
                    </Typography>
                    <Typography variant="subtitle2">
                        Your place profile will look similar to this template in a browser
                    </Typography>
                    <Grid container style={{ marginTop: 10 }} justify="space-evenly">
                        <Grid item lg={5} style={{ textAlign: 'center' }}>
                            <img style={{ width: '100%', marginTop: 10 }} alt="place img"
                                src={currentPlace.img ? `${currentPlace.img}` : `https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg`}/>
                            <Typography variant="h5" style={{ marginTop: 20 }}>This place is now
                                {currentPlace.status === Status.OPEN ?
                                    <span style={{ color: 'green', fontWeight: 'bold' }}> {currentPlace.status.toUpperCase()}</span>
                                    : <span style={{ color: 'red', fontWeight: 'bold' }}> {currentPlace.status.toUpperCase()}</span>
                                }
                            </Typography>
                        </Grid>
                        <Grid item lg={5} container direction="column" alignItems="center" style={{ textAlign: 'center', marginLeft: 10 }}>
                            <Typography variant="h3" style={{ fontWeight: 'bold' }}>
                                {currentPlace.name || 'Business name'}
                            </Typography>
                            <Typography variant="h6" >
                                {currentPlace.subtitle || 'This is a short subtitle of my place'}
                            </Typography>
                            <Rating
                                name="simple-controlled"
                                readOnly
                                value={currentPlace.averageNote.average}
                            />
                            <Typography variant="body1" style={{ fontStyle: 'italic' }}>{currentPlace.type || 'Business type'}</Typography>
                            <Typography variant="body1" style={{ marginTop: 10 }}>
                                {currentPlace.description || 'This is a brief description of my business. In this section I can make my visitors interested in my company.'}
                            </Typography>
                        </Grid>
                        <Grid item container lg={12} style={{ marginTop: 20 }} justify="center">
                            <Grid item lg={10}>
                                <Divider style={{ width: '100%', background: '#2196f3' }} />
                            </Grid>
                        </Grid>
                        <Grid item container lg={12} justify="space-around" style={{ marginTop: 20, marginBottom: 10 }}>
                            {icons.map((item, index) => {
                                return (
                                    <Grid item lg={3} key={index}>
                                        <Card elevation={10} style={{ borderRadius: 10 }}>
                                            <CardContent>
                                                <Grid container justify="center">
                                                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                                                        {item.icon}
                                                    </Grid>
                                                    <Grid item >
                                                        <Typography variant="caption">{item.text}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </CardContent>
                <Grid container item lg={12} style={{ marginTop: 10 }}>
                    <Divider style={{ width: '100%', backgroundColor: '#2196f3' }} />
                    <Paper square style={{ width: '100%', background: 'inherit' }}>
                        <Tabs
                            value={value}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                        >
                            <MyTab label="News" />
                            <MyTab label="Opening hours" />
                            <MyTab label="Opinions" />
                        </Tabs>
                    </Paper>
                    {tabContents[value]}
                </Grid>
            </Card>
        </Slide>
    )
}