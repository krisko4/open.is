import { Card, CardContent, makeStyles, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import { format } from 'date-fns';
import React, { FC, useState } from "react";
import { useStepContext } from "../../../../contexts/StepContext";
import { News } from "../../../reusable/News";
import OpeningHours from "../../../reusable/OpeningHours";

const news = [
    {
        title: 'This will be my first news!',
        date: format(new Date(),'dd.MM.yyyy hh:mm'),
        content: 'After your place is accepted, you will be able to add news to this section. This is just an example. '
    },
    {
        title: 'This will be my second news!',
        date: format(new Date(),'dd.MM.yyyy hh:mm'),
        content: 'It is going to be fun!'

    }
   
]

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
        background : 'inherit'
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


export const PlaceDetailsCard: FC = () => {

    const { placeName, placeDetails, contactDetails, uploadedImage } = useStepContext()
    const newsClasses = useNewsStyles()
    const openingHoursClasses = useOpeningHoursStyles()
    const [value, setValue] = useState(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const icons = [
        {
            icon: <PhoneIcon color="primary" />,
            text: contactDetails.phoneNumber || 'Phone number'
        },
        {
            icon: <MailOutlineIcon color="primary" />,
            text: contactDetails.email || 'Contact e-mail'
        },
        {
            icon: <LanguageIcon color="primary" />,
            text: contactDetails.website || 'Website address'
        },
    ]
    
    const tabContents = [
        <News news={news} classes={newsClasses} />,
        <OpeningHours classes={openingHoursClasses} />
    ]

    const MyTab = (props: any) => {
        const { label, ...rest } = props
        return <Tab {...rest} label={label} disableRipple />
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Place card
                </Typography>
                <Typography variant="subtitle2">
                    Your place profile will look similar to this template in a browser
                </Typography>
                <Grid container style={{ marginTop: 10 }}>
                    <Grid item lg={5}>
                        <CardMedia
                            image={uploadedImage ? `${uploadedImage}` : `https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg`}
                            style={{ height: 200 }}
                        />
                    </Grid>
                    <Grid item lg={6} container justify="center" direction="column" style={{ textAlign: 'center', marginLeft: 10, alignItems: 'center' }}>
                        <Typography variant="h3" style={{ fontWeight: 'bold' }}>
                            {placeName || 'Business name'}
                        </Typography>
                        <Typography variant="h6" >
                            {placeDetails.subtitle || 'This is a short subtitle of my place'}
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={5}
                        />
                        <Typography variant="body1" style={{ fontStyle: 'italic' }}>{placeDetails.type || 'Business type'}</Typography>
                        <Typography variant="body1" style={{ marginTop: 10 }}>
                            {placeDetails.description || 'This is a brief description of my business. In this section I can make my visitors interested in my company.'}
                        </Typography>
                    </Grid>
                    <Grid item container lg={12} style={{ marginTop: 10 }} justify="center">
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
    )
}