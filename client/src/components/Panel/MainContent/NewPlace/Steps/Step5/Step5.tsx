import { Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { ImageList, ImageListItem } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { ImageUpload } from "../../../../../reusable/ImageUpload";

const useStyles = makeStyles({
    imageContainer: {
        height: '100%',
        '&:hover .uploader': {
            display: 'flex'
        },
        '& .uploader': {
            display: 'none',
            height: '100%'
        }
    },
})


export const Step5: FC = () => {


    const classes = useStyles()

    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const { imageFile, setImageFile } = useStepContext()
    const [img, setImg] = useState<any>(currentPlace.logo)


    useEffect(() => {
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.logo = img
        setCurrentPlace(newCurrentPlace)
    }, [img])




    return (
        <Grid style={{marginTop: 20}} container justifyContent="center" >
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="h3">Step 5</Typography>
            </Grid>
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Representative image</Typography>

            </Grid>
            <Grid item lg={9}>
                <Typography style={{ marginTop: 20, textAlign: 'center' }} variant="subtitle1">
                    In order for your place to stand out, please upload an image related to your business.
                    Uploading a logo of your brand might be the best idea.
                </Typography>
            </Grid>
            <Grid item container justifyContent="center" style={{ marginTop: 20 }} lg={12}>
                <Grid item lg={7}>
                    <ImageUpload name="test" img={img} setImg={setImg} setImageFile={setImageFile} />
                    <Grid item container direction="column" style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>
                        <Typography style={{ marginTop: 10 }} variant="caption"><span style={{ color: 'red' }}>*</span>At least one representative image is required.</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={9}>
                <Typography style={{ marginTop: 20, textAlign: 'center' }} variant="subtitle1">
                    You can also upload some pictures presenting your place indoors or outdoors. 
                    If you don't want to do it now, you will be able to share your pictures later.
                </Typography>
            </Grid>
            <ImageList style={{height: 200}}>
                <ImageListItem>
                    <img src="https://d-art.ppstatic.pl/kadry/k/r/a0/5e/618a4faca96dc_o_full.jpg" />
                </ImageListItem>
                <ImageListItem>
                    <img src="https://d-art.ppstatic.pl/kadry/k/r/a0/5e/618a4faca96dc_o_full.jpg" />
                </ImageListItem>
                <ImageListItem>
                    <img src="https://d-art.ppstatic.pl/kadry/k/r/a0/5e/618a4faca96dc_o_full.jpg" />
                </ImageListItem>
                <ImageListItem>
                    <img src="https://d-art.ppstatic.pl/kadry/k/r/a0/5e/618a4faca96dc_o_full.jpg" />
                </ImageListItem>
            </ImageList>
        </Grid>
    );
}