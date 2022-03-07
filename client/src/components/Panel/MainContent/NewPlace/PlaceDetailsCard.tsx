import { LoadingButton } from "@mui/lab";
import {
    Card, Slide, Toolbar,
    Tooltip
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';
import { ImageCarousel } from "components/Browser/Places/PlaceDetails/ImageCarousel/ImageCarousel";
import React, { FC } from "react";
import { ContactDetails } from "./PlaceDetailsCard/ContactDetails";
import { ContactDetailsContainer } from "./PlaceDetailsCard/MemoizedContactDetails";
import { PlaceDescription } from "./PlaceDetailsCard/PlaceDescription";
import { PlaceLogo } from "./PlaceDetailsCard/PlaceLogo";
import { PlaceName } from "./PlaceDetailsCard/PlaceName";
import { PlaceRating } from "./PlaceDetailsCard/PlaceRating";
import { PlaceStatus } from "./PlaceDetailsCard/PlaceStatus";
import { PlaceSubtitle } from "./PlaceDetailsCard/PlaceSubtitle";
import { PlaceTabs } from "./PlaceDetailsCard/PlaceTabs";
import { PlaceType } from "./PlaceDetailsCard/PlaceType";
import { SocialIcons } from "./PlaceDetailsCard/SocialIcons";




interface Props {
    isEditable?: boolean,
    logoFile? : File | null,
    setLogoFile? : React.Dispatch<React.SetStateAction<File | null>>
}


export const PlaceDetailsCard: FC<Props> = ({ isEditable, logoFile, setLogoFile }) => {



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
                        <ImageCarousel
                            isEditable={isEditable}
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
                                logoFile={logoFile}
                                setLogoFile={setLogoFile}
                                isEditable={isEditable}
                            />
                            <PlaceRating />
                        </Grid>
                        <Grid item container direction="column" lg={8} sx={{ ml: '30px' }}>
                            <PlaceName />
                            <PlaceSubtitle />
                            <PlaceType />
                            <SocialIcons />
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
                        <Grid item lg={10}>
                            <PlaceDescription  />
                        </Grid>
                        <Grid item lg={10} style={{ marginTop: 20 }}>
                            <Divider sx={{ width: '100%' }}></Divider>
                        </Grid>
                    </Grid>
                    <Grid item container lg={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
                        <ContactDetails />
                    </Grid>
                    <PlaceTabs />
                </Card>
            </div>

        </Slide >
    );
}
