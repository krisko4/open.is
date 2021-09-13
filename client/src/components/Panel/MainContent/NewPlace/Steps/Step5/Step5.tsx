import { Card, CardMedia, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import React, { FC, useRef, useState } from "react";
import { usePanelContext } from "../../../../../../contexts/PanelContext";
import { useStepContext } from "../../../../../../contexts/StepContext";

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
    const { setImageFile, currentPlace, setCurrentPlace } = usePanelContext()

    const clearImage = () => {
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.img = null 
        setCurrentPlace(newCurrentPlace)
    }

    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            setImageFile(image)
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)
            fileReader.onload = e => {
                if (e.target) {
                    const newCurrentPlace = { ...currentPlace }
                    newCurrentPlace.img = e.target.result
                    setCurrentPlace(newCurrentPlace)
                }
            }
        }

    }


    const startUploading = () => {
        if (uploadRef.current) uploadRef.current.click()
    }

    return (
        <Grid item lg={12} container >
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="h3">Step 5</Typography>
            </Grid>
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Representative image</Typography>
            </Grid>
            <Grid item container justify="center" style={{ marginTop: 20 }} lg={12}>
                <Grid item lg={7}>
                    <Card onMouseEnter={() => setElevation(12)} onMouseLeave={() => setElevation(3)} onClick={startUploading} elevation={elevation} style={{ height: 300 }}>
                        <CardMedia className={classes.imageContainer} image={currentPlace.img ? `${currentPlace.img}` : `https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png`} >
                            {currentPlace.img && <Grid container justify="flex-end">
                                <IconButton onClick={() => clearImage()} className="uploader" >
                                    <ClearIcon color="secondary" />
                                </IconButton>
                            </Grid>}
                            <input
                                type="file"
                                accept="image/*"
                                ref={uploadRef}
                                style={{ display: 'none' }}
                                onChange={e => uploadImage(e)}
                            >
                            </input>
                        </CardMedia>
                    </Card>
                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                        <Typography variant="caption"><span style={{ color: 'red' }}>*</span>At least one representative image is required.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}