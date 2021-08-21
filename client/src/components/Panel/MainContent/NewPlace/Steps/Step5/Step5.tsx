import { Button, Card, CardMedia, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import BackupIcon from '@material-ui/icons/Backup';
import React, { FC, useRef } from "react";
import { useStepContext } from "../../../../../../contexts/StepContext";


const useStyles = makeStyles({
    imageContainer: {
        height: '100%',
        '&:hover .uploader': {
            display: 'flex'
        },
        '& .uploader' : {
            display: 'none',
            height: '100%'
        }
    },
})

export const Step5: FC = () => {
    

    const classes = useStyles()

    const uploadRef = useRef<HTMLInputElement>(null)

    const {setActiveStep, uploadedImage, setUploadedImage} = useStepContext()

    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)
            fileReader.onload = e => {
                if (e.target) setUploadedImage(e.target.result)
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
                    {/* <CardMedia style={{height: 200}} image="https://twojspozywczy.pl/wp-content/uploads/2020/04/lidl-sklep.jpg" ></CardMedia> */}
                    <Card style={{ height: 300 }}>
                        <CardMedia className={classes.imageContainer} image={uploadedImage ? `${uploadedImage}` : `https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png`} >
                            <Grid container className="uploader" justify="center" alignItems="center">
                                <IconButton onClick={startUploading}>
                                    <BackupIcon fontSize="large" color="primary" />
                                </IconButton>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={uploadRef}
                                    style={{ display: 'none' }}
                                    onChange={e => uploadImage(e)}
                                >

                                </input>
                            </Grid>

                        </CardMedia>

                    </Card>
                    <Button variant="contained" onClick={() => setActiveStep(currentStep => currentStep + 1)} disabled={!uploadedImage} fullWidth={true} style={{ marginTop: 10 }} color="primary">Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}