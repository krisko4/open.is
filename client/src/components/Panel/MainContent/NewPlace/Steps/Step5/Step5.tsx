import { Button, Card, CardMedia, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import React, { FC, useEffect, useRef, useState } from "react";
import { usePanelContext } from "../../../../../../contexts/PanelContext";
import UploadIcon from "@material-ui/icons/CloudUpload"
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

    const uploadRef = useRef<HTMLInputElement>(null)
    const [elevation, setElevation] = useState(3)
    const { currentPlace, setCurrentPlace } = usePanelContext()
    const { imageFile, setImageFile } = useStepContext()
    const [img, setImg] = useState<any>(null)


    useEffect(() => {
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.img = img
        setCurrentPlace(newCurrentPlace)
    }, [imageFile])


    // const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const image = event.target.files[0]
    //         setImageFile(image)
    //         const fileReader = new FileReader()
    //         fileReader.readAsDataURL(image)
    //         fileReader.onload = e => {
    //             if (e.target) {
    //                 const newCurrentPlace = { ...currentPlace }
    //                 newCurrentPlace.img = e.target.result
    //                 setCurrentPlace(newCurrentPlace)
    //             }
    //         }
    //     }

    // }


    return (
        <Grid item lg={12} container justify="center" >
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
            <Grid item container justify="center" style={{ marginTop: 20 }} lg={12}>
                <Grid item lg={7}>
                    <ImageUpload img={img} setImg={setImg} setImageFile={setImageFile} />

                    <Grid item container direction="column" style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>
                        <Typography style={{ marginTop: 10 }} variant="caption"><span style={{ color: 'red' }}>*</span>At least one representative image is required.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}