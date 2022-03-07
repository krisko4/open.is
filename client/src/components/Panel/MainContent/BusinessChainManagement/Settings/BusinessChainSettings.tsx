import { Paper, Grid, Typography, Divider, Rating } from "@mui/material"
import { FC, useEffect, useState } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useBusinessChainContext } from "../../../../../contexts/PanelContexts/BusinessChainContext"
import { clearPlace, useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { Image } from "../../../../../contexts/PlaceProps"
import { convertToCurrentPlace } from "../../../../../utils/place_data_utils"
import { ImagesCarousel } from "../../../../Browser/Places/PlaceDetails/ImageCarousel/ImagesCarousel"
import { ContactDetailsContainer } from "../../NewPlace/PlaceDetailsCard/ContactDetails"
import { MemoizedPlaceDescription } from "../../NewPlace/PlaceDetailsCard/PlaceDescription"
import { PlaceLogo } from "../../NewPlace/PlaceDetailsCard/PlaceLogo"
import { MemoizedPlaceName } from "../../NewPlace/PlaceDetailsCard/PlaceName"
import { MemoizedPlaceSubtitle } from "../../NewPlace/PlaceDetailsCard/PlaceSubtitle"
import { MemoizedPlaceType } from "../../NewPlace/PlaceDetailsCard/PlaceType"
import { MemoizedSocialIcons } from "../../NewPlace/PlaceDetailsCard/SocialIcons"

export const BusinessChainSettings: FC = () => {
    const { businessChain } = useBusinessChainContext()
    const { imageFile, setImageFile, currentPlace, setCurrentPlace } = useCurrentPlaceContext()


    console.log(currentPlace)


    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item lg={6}>
            </Grid>
            <Grid item sx={{ height: '100%' }} lg={6}>
                <Scrollbars>
                    <Paper sx={{ height: '100%' }}>
                        <ImagesCarousel
                            isEditable={true}
                            images={businessChain.images as Image[]}
                            setCurrentPlace={setCurrentPlace}
                            address={currentPlace.address}
                        />
                        <Grid container item sx={{ mt: '20px' }}>
                            <Grid item lg={3} style={{ textAlign: 'center', marginLeft: 20 }}>
                                <PlaceLogo
                                    isEditable={true}
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
                    </Paper>
                </Scrollbars>
            </Grid>

        </Grid >
    )
}