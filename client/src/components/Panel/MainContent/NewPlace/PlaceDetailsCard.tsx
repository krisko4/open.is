import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { LoadingButton } from "@mui/lab";
import {
    Card, Slide, Tab, Toolbar,
    Tooltip
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { ImagesCarousel } from "../../../Browser/Places/PlaceDetails/ImageCarousel/ImagesCarousel";
import { News } from "../../../reusable/News";
import { OpeningHours } from "../../../reusable/OpeningHours/OpeningHours";
import { Opinions } from "../../../reusable/Opinions/Opinions";
import { ContactDetailsContainer } from "./PlaceDetailsCard/ContactDetails";
import { MemoizedPlaceDescription } from "./PlaceDetailsCard/PlaceDescription";
import { PlaceLogo } from "./PlaceDetailsCard/PlaceLogo";
import { MemoizedPlaceName } from "./PlaceDetailsCard/PlaceName";
import { PlaceStatus } from "./PlaceDetailsCard/PlaceStatus";
import { MemoizedPlaceSubtitle } from "./PlaceDetailsCard/PlaceSubtitle";
import { MemoizedPlaceTabs } from "./PlaceDetailsCard/PlaceTabs";
import { MemoizedPlaceType } from "./PlaceDetailsCard/PlaceType";
import { MemoizedSocialIcons } from "./PlaceDetailsCard/SocialIcons";




interface Props {
    isEditable?: boolean,
}


export const PlaceDetailsCard: FC<Props> = ({ isEditable }) => {


    const { currentPlace, setImageFile, setCurrentPlace } = useCurrentPlaceContext()

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
                        <ImagesCarousel
                            isEditable={isEditable}
                            images={currentPlace.images}
                            setCurrentPlace={setCurrentPlace}
                            address={currentPlace.address}
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
                            <PlaceLogo
                                isEditable={isEditable}
                                setImageFile={setImageFile}
                            />
                            <Rating
                                style={{ marginTop: 20 }}
                                name="simple-controlled"
                                value={currentPlace.averageNote?.average || 0}
                                readOnly
                            />
                    </Grid>
                    <Grid item container direction="column" lg={8} sx={{ ml: '30px' }}>
                        <MemoizedPlaceName name={currentPlace.name} />
                        <MemoizedPlaceSubtitle subtitle={currentPlace.subtitle} />
                        <MemoizedPlaceType type={currentPlace.type} />
                        <MemoizedSocialIcons facebook={currentPlace.facebook} instagram={currentPlace.instagram} />
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
                <Grid item container lg={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
                    <ContactDetailsContainer />
                </Grid>
                <MemoizedPlaceTabs currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} />
            </Card>
        </div>

        </Slide >
    );
}

export const MemoizedPlaceDetailsCard = React.memo(PlaceDetailsCard)