import { PhotoCamera } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { LoadingButton } from "@mui/lab";
import {
    Alert, Card,
    CardContent, CardMedia,
    IconButton, Paper,
    Slide, Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC, useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { SocialIcon } from "react-social-icons";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { ImagesCarousel } from "../../../Browser/Places/PlaceDetails/ImageCarousel/ImagesCarousel";
import { ImageUpload } from "../../../reusable/ImageUpload";
import { News } from "../../../reusable/News";
import { OpeningHours } from "../../../reusable/OpeningHours/OpeningHours";
import { Opinions } from "../../../reusable/Opinions/Opinions";



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

const MyTab = (props: any) => {
    const { label, ...rest } = props
    return <Tab {...rest} label={label} disableRipple />
}

interface Props {
    isEditable?: boolean
}

export const PlaceDetailsCard: FC<Props> = ({ isEditable }) => {

    const { currentPlace, setImageFile, setCurrentPlace } = useCurrentPlaceContext()
    const [isHover, setHover] = useState(true)
    const [logo, setLogo] = useState(currentPlace.logo)
    const isFirstRender = useRef(true)


    const newsClasses = useNewsStyles()
    const openingHoursClasses = useOpeningHoursStyles()
    const opinionClasses = useOpinionsStyles()
    const [value, setValue] = useState(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.logo = logo
        setCurrentPlace(newCurrentPlace)
    }, [logo])


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

    return (
        <Slide in={true} timeout={1000}>
            <div>
                <Card elevation={3} sx={{ minWidth: 800 }}>
                    <Grid container item >
                        <Toolbar style={{ flexGrow: 1 }} disableGutters>
                            <Grid container justifyContent="flex-end" style={{ paddingRight: 20 }} item>
                                <Tooltip title={'Your users will be able to subscribe to your business'} arrow >
                                    <span>
                                        <LoadingButton
                                            color="primary"
                                        >
                                            Subscribed
                                        </LoadingButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </Toolbar>
                    </Grid>
                    <Grid container>
                        <ImagesCarousel isEditable={isEditable} address={currentPlace.address || 'This is an address of your business'} />
                    </Grid>
                    <Grid container >
                        <Grid container item>
                            <Card elevation={10}
                                sx={{ flexGrow: 1, paddingBottom: '12px', paddingTop: '12px', paddingRight: '20px', backgroundColor: 'panelCard.main' }}>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Tooltip title={'This is a current status of your place'}>
                                            <Alert severity="error" variant="filled" >
                                                This place is now <b>{currentPlace.status?.toUpperCase() || 'CLOSED'}</b>
                                            </Alert>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container item sx={{ mt: '20px' }}>
                        <Grid item lg={3} style={{ textAlign: 'center', marginLeft: 20 }}>
                            <CardMedia onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ height: 200, overflow: 'hidden', marginTop: 10, borderRadius: 20 }} image={currentPlace.logo ? `${currentPlace.logo}` : `${process.env.REACT_APP_BASE_URL}/images/no-preview.jpg`} >
                                {isEditable &&
                                    <Slide direction="up" in={isHover} appear>
                                        <Grid justifyContent="center" alignItems="center" container sx={{ height: '100%', background: 'black', opacity: '50%' }}>
                                            <ImageUpload name="logo-upload" img={logo} setImg={setLogo} setImageFile={setImageFile}>
                                                <IconButton color="primary" component="span">
                                                    <PhotoCamera />
                                                </IconButton>
                                            </ImageUpload>
                                        </Grid>
                                    </Slide>

                                }
                            </CardMedia>
                            <Rating
                                style={{ marginTop: 20 }}
                                name="simple-controlled"
                                value={currentPlace.averageNote?.average || 5}
                                readOnly
                            />
                        </Grid>
                        <Grid item container direction="column" lg={8} sx={{ ml: '30px' }}>
                            <Typography variant="h2" style={{ color: 'white', fontWeight: 'bold' }}>
                                {currentPlace.name || 'This is the name of your business'}
                            </Typography>
                            <Typography variant="h6" style={{ color: 'lightgrey' }}>
                                {currentPlace.subtitle || 'This is a subtitle of your business'}
                            </Typography>
                            <Typography variant="body1">{currentPlace.type || 'Business type'}</Typography>
                            <div>
                                <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://facebook.com" /></IconButton>
                                <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://instagram.com" /></IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
                        <Grid item lg={10}>
                            <Card elevation={10} style={{ flexGrow: 1 }}>
                                <CardContent>
                                    <div style={{ display: 'inline-block', overflowWrap: 'break-word' }}>
                                        <Typography variant="body1" >
                                            {currentPlace.description || 'This is a brief description of your business. In this section you can make your visitors interested in your company.'}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item lg={10} style={{ marginTop: 20 }}>
                            <Divider sx={{ width: '100%' }}></Divider>
                        </Grid>
                    </Grid>
                    <Grid item container lg={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
                        {icons.map((item, index) => {
                            return (
                                <Grid item lg={3} key={index}>
                                    <Card elevation={10} sx={{ borderRadius: 10 }}>
                                        <CardContent>
                                            <Grid container justifyContent="center">
                                                <Grid item lg={12} style={{ textAlign: 'center' }}>
                                                    {item.icon}
                                                </Grid>
                                                <Grid item style={{ color: 'white' }}>
                                                    {item.text}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                    {/* <CardContent> */}
                    {/* <Typography variant="h5">
                            Place card
                        </Typography>
                        <Typography variant="subtitle2">
                            Your place profile will look similar to this template in a browser
                        </Typography> */}
                    {/* <Grid container style={{ marginTop: 10 }} alignItems="center" justifyContent="space-evenly">
                            <Grid item lg={5} style={{ textAlign: 'center' }}>
                                <CardMedia style={{ height: 345, marginTop: 10 }} image={currentPlace.logo ? `${currentPlace.logo}` : `https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg`} />
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
                                    <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url={currentPlace.facebook ? currentPlace.facebook : "http://facebook.com"} /></IconButton>
                                    <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url={currentPlace.instagram ? currentPlace.instagram : "http://instagram.com"} /></IconButton>
                                </div>
                            </Grid>
                            <Grid item container lg={12} style={{ marginTop: 20 }} justifyContent="center">
                                <Grid item lg={10} style={{ textAlign: 'center' }}>
                                    <Typography variant="body1">
                                        {currentPlace.description || 'This is a brief description of my business. In this section I can make my visitors interested in my company.'}
                                    </Typography>
                                </Grid>
                                <Grid item lg={10} style={{ marginTop: 10 }}>
                                    <Divider style={{ width: '100%', background: '#2196f3' }} />
                                </Grid>
                            </Grid>
                            <Grid item container lg={12} justifyContent="space-around" style={{ marginTop: 20, marginBottom: 10 }}>
                                {icons.map((item, index) => {
                                    return (
                                        <Grid item lg={3} key={index}>
                                            <Card elevation={10} style={{ borderRadius: 10 }}>
                                                <CardContent>
                                                    <Grid container justifyContent="center">
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
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </CardContent> */}

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

                </Card>
            </div>

        </Slide >
    );
}