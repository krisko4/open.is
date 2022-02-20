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
import { circle } from "leaflet";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { SocialIcon } from "react-social-icons";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../contexts/PlaceProps";
import { ImagesCarousel, ImagesCarouselMemo } from "../../../Browser/Places/PlaceDetails/ImageCarousel/ImagesCarousel";
import { ImageUpload } from "../../../reusable/ImageUpload";
import { News } from "../../../reusable/News";
import { OpeningHours } from "../../../reusable/OpeningHours/OpeningHours";
import { Opinions } from "../../../reusable/Opinions/Opinions";
import { MemoizedContactIcons } from "./PlaceDetailsCard/ContactIcons";
import { MemoizedPlaceDescription } from "./PlaceDetailsCard/PlaceDescription";
import { MemoizedPlaceLogo, PlaceLogo } from "./PlaceDetailsCard/PlaceLogo";
import { MemoizedPlaceName, PlaceName } from "./PlaceDetailsCard/PlaceName";
import { PlaceStatus } from "./PlaceDetailsCard/PlaceStatus";
import { MemoizedPlaceSubtitle, PlaceSubtitle } from "./PlaceDetailsCard/PlaceSubtitle";
import { MemoizedPlaceType } from "./PlaceDetailsCard/PlaceType";



const MyTab = (props: any) => {
    const { label, ...rest } = props
    return <Tab {...rest} label={label} disableRipple />
}

interface Props {
    isEditable?: boolean,
}


export const PlaceDetailsCard: FC<Props> = ({ isEditable }) => {


    const { currentPlace, setImageFile, setCurrentPlace } = useCurrentPlaceContext()
    const [isHover, setHover] = useState(true)
    const [logo, setLogo] = useState(currentPlace.logo)
    const isFirstRender = useRef(true)
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

    const tabs = useMemo(() => {

        return [
            <News currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} />,
            <OpeningHours
                setCurrentPlace={setCurrentPlace}
                currentPlace={currentPlace}

            />,
            <Opinions
                currentPlace={currentPlace}
                setCurrentPlace={setCurrentPlace}

            />
        ]
    }, [currentPlace])

    const icons = useMemo(() => {
        return [
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
            }
        ]
    }, [currentPlace])


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
                        <ImagesCarouselMemo
                            address={currentPlace.address}
                            isEditable={isEditable}
                            images={currentPlace.images}
                            setCurrentPlace={setCurrentPlace}
                        />
                    </Grid>
                    <Grid container >
                        <Grid container item>
                            <Card elevation={10}
                                sx={{ flexGrow: 1, paddingBottom: '12px', paddingTop: '12px', paddingRight: '20px', backgroundColor: 'panelCard.main' }}>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <PlaceStatus />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container item sx={{ mt: '20px' }}>
                        <Grid item lg={3} style={{ textAlign: 'center', marginLeft: 20 }}>
                            <MemoizedPlaceLogo
                                isEditable={isEditable}
                                logo={currentPlace.logo}
                                setImageFile={setImageFile}
                            />
                            <Rating
                                style={{ marginTop: 20 }}
                                name="simple-controlled"
                                value={currentPlace.averageNote?.average || 5}
                                readOnly
                            />
                        </Grid>
                        <Grid item container direction="column" lg={8} sx={{ ml: '30px' }}>
                            <MemoizedPlaceName name={currentPlace.name} />
                            <MemoizedPlaceSubtitle subtitle={currentPlace.subtitle} />
                            <MemoizedPlaceType type={currentPlace.type} />
                            <MemoizedContactIcons facebook={currentPlace.facebook} instagram={currentPlace.instagram} />
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
                        <Grid item lg={10}>
                            <MemoizedPlaceDescription description={currentPlace.description} />
                        </Grid>
                        <Grid item lg={10} style={{ marginTop: 20 }}>
                            <Divider sx={{ width: '100%' }}></Divider>
                        </Grid>
                    </Grid>
                    {/* <Grid item container lg={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
                        {icons.map((item, index) => {
                            return (
                                <Grid item lg={3} key={index}>
                                    <Card elevation={10}>
                                        <CardContent>
                                            <Grid container justifyContent="center">
                                                <Grid item lg={12} style={{ textAlign: 'center' }}>
                                                    {item.icon}
                                                </Grid>
                                                <Grid item>
                                                    {item.text}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
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
                                {tabs[value]}
                            </Scrollbars>
                        </Grid>
                    </Grid> */}

                </Card>
            </div>

        </Slide >
    );
}

export const MemoizedPlaceDetailsCard = React.memo(PlaceDetailsCard)