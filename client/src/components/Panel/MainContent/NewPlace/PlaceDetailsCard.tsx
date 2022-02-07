import { Card, CardContent, CardMedia, IconButton, makeStyles, Paper, Slide, Tab, Tabs, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import { Alert } from "@material-ui/lab";
import Rating from "@material-ui/lab/Rating";
import React, { FC, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { SocialIcon } from "react-social-icons";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { Status } from "../../../../contexts/PanelContexts/PanelContext";
import { News } from "../../../reusable/News";
import { OpeningHours } from "../../../reusable/OpeningHours/OpeningHours";
import { Opinions } from "../../../reusable/Opinions/Opinions";
import { PanelCard } from "../../../reusable/PanelCard";



const useNewsStyles = makeStyles({
    date: {},
    paper: {
        padding: '6px 16px',
        borderRadius: 15,
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',

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
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',

    },
    // hourPicker: {
    //     color: 'green'
    // },
    calendarIcon: {
        // '& .MuiIconButton-root' : {
        //     color: 'red'
        // }
    },
    title: {
        textAlign: 'center',
    },
    content: {
        color: 'grey'
    },
    divider: {
        marginTop: 10,
        background: '#2196f3',
        marginBottom: 10
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
    },
    days: {},
    hours: {}
})


const useOpinionsStyles = makeStyles({
    opinionCard: {
        background: 'inherit',
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',

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

    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()

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
        <News currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} classes={newsClasses} />,
        <OpeningHours classes={openingHoursClasses} setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} />,
        <Opinions
            currentPlace={currentPlace}
            setCurrentPlace={setCurrentPlace}
            classes={opinionClasses}
        />

    ]

    const MyTab = (props: any) => {
        const { label, ...rest } = props
        return <Tab {...rest} label={label} disableRipple />
    }
    return (
        <Slide in={true} timeout={1000}>
            <div>
                <PanelCard elevation={3}>
                    <CardContent>
                        <Typography variant="h5">
                            Place card
                        </Typography>
                        <Typography variant="subtitle2">
                            Your place profile will look similar to this template in a browser
                        </Typography>
                        <Grid container style={{ marginTop: 10 }} alignItems="center" justify="space-evenly">
                            <Grid item lg={5} style={{ textAlign: 'center' }}>
                                <CardMedia style={{ height: 345, marginTop: 10 }} image={currentPlace.img ? `${currentPlace.img}` : `https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg`} />
                            </Grid>
                            <Grid item lg={5} container direction="column" alignItems="center" style={{ textAlign: 'center', marginLeft: 10 }}>
                                <Typography variant="h3" style={{ fontWeight: 'bold' }}>
                                    {currentPlace.name || 'Business name'}
                                </Typography>
                                <Typography variant="h6" >
                                    {currentPlace.subtitle || 'This is a short subtitle of my place'}
                                </Typography>
                                {currentPlace.status === Status.OPEN ? <Alert severity="success" variant="filled" style={{ marginTop: 10 }}>
                                    This place is now {currentPlace.status.toUpperCase()}
                                </Alert>
                                    : <Alert severity="error" variant="filled" style={{ marginTop: 10 }}>
                                        This place is now {currentPlace.status?.toUpperCase()}
                                    </Alert>

                                }
                                <Rating
                                    name="simple-controlled"
                                    readOnly
                                    value={currentPlace.averageNote?.average}
                                    style={{ marginTop: 10 }}
                                />
                                <Typography variant="body1" style={{ fontStyle: 'italic' }}>{currentPlace.type || 'Business type'}</Typography>
                                <div>
                                    <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url={currentPlace.facebook ? currentPlace.facebook : "http://facebook.com"} /></IconButton>
                                    <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url={currentPlace.instagram ? currentPlace.instagram : "http://instagram.com"} /></IconButton>
                                </div>
                            </Grid>
                            <Grid item container lg={12} style={{ marginTop: 20 }} justify="center">
                                <Grid item lg={10} style={{ textAlign: 'center' }}>
                                    <Typography variant="body1">
                                        {currentPlace.description || 'This is a brief description of my business. In this section I can make my visitors interested in my company.'}
                                    </Typography>
                                </Grid>
                                <Grid item lg={10} style={{ marginTop: 10 }}>
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

                    <Grid container item lg={12} style={{ marginTop: 10, }}>
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
                        <Grid container style={{ height: 495 }}>
                            <Scrollbars>
                                {tabContents[value]}
                            </Scrollbars>
                        </Grid>
                    </Grid>

                </PanelCard>
                </div>

                </Slide >
                )
}