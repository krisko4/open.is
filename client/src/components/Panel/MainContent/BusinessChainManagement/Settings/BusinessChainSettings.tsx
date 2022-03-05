import { Paper, Grid, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { useBusinessChainContext } from "../../../../../contexts/PanelContexts/BusinessChainContext"
import { clearPlace, useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { Image } from "../../../../../contexts/PlaceProps"
import { ImagesCarousel } from "../../../../Browser/Places/PlaceDetails/ImageCarousel/ImagesCarousel"

export const BusinessChainSettings: FC = () => {
    const { businessChain } = useBusinessChainContext()
    const {currentPlace, setCurrentPlace} = useCurrentPlaceContext()
    
    useEffect(() => {
        currentPlace.images = businessChain.images.map(img => {
            return {
                img: img as string,
                file: null
            }
        })
        console.log(businessChain)
        console.log(currentPlace)

    }, [businessChain])


    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item lg={6}>
            </Grid>
            <Grid item sx={{height: '100%'}} lg={6}>
                <Paper sx={{height: '100%'}}>
                        <ImagesCarousel
                            isEditable={true}
                            images={currentPlace.images}
                            setCurrentPlace={setCurrentPlace}
                            address={currentPlace.address}
                        />
                </Paper>
            </Grid>
        </Grid>
    )
}