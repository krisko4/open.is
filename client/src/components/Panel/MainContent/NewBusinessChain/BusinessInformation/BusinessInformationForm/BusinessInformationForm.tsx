import { Button, Grid, Typography } from "@material-ui/core"
import { Form, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { ImageUpload } from "../../../../../reusable/ImageUpload"
import { Description } from './Fields/Description'
import { Subtitle } from './Fields/Subtitle'
import { BusinessType } from '../BusinessType'
import { BusinessName } from "./Fields/BusinessName"




export const BusinessInformationForm: FC = () => {

    const [imageFile, setImageFile] = useState<File | null>(null)
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [img, setImg] = useState<any>(currentPlace.img)
    const { isValid, values } = useFormikContext<any>()

    useEffect(() => {
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.img = img
        setCurrentPlace(newCurrentPlace)
    }, [img])

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setCurrentPlace(currentPlace => {
    //             currentPlace.description = values.description
    //             currentPlace.subtitle = values.subtitle
    //             currentPlace.name = values.name
    //             return { ...currentPlace }
    //         })
    //     }, 100)
    //     return () => clearTimeout(timeout)
    // }, [values])


    return (
        <Form>
            <Grid container style={{ marginTop: 20 }} alignItems="center" justify="center">
                <Grid item lg={5} >
                    <Typography variant="subtitle2">What is the name of your business chain?</Typography>
                </Grid>
                <Grid item lg={5}>
                    <BusinessName />
                </Grid>
                <Grid item lg={5} style={{ marginTop: 20 }}>
                    <Typography variant="subtitle2">
                        Please enter a short subtitle
                    </Typography>
                </Grid>
                <Grid item lg={5}>
                    <Subtitle />
                </Grid>
                <Grid item lg={5} style={{ marginTop: 20 }}>
                    <Typography variant="subtitle2">
                        What is the type of your business?
                    </Typography>
                </Grid>
                <Grid item lg={5}>
                    <BusinessType />
                </Grid>
                <Grid item lg={10} style={{ marginTop: 20 }}>
                    <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                        How would you describe your business in few words?
                    </Typography>
                </Grid>
                <Grid item lg={10} style={{ marginTop: 10 }}>
                    <Description />
                </Grid>
                <Grid item lg={5} >
                    <Typography variant="subtitle2">
                        In order for your place to stand out, please upload an image related to your business.
                        Uploading a logo of your brand might be the best idea.
                    </Typography>
                </Grid>
                <Grid item lg={5}>
                    <ImageUpload img={img} setImg={setImg} setImageFile={setImageFile} />
                </Grid>
                <Grid item container lg={11} style={{ marginTop: 40, marginBottom: 20 }} justify="flex-end">
                    <Button color="primary" type="submit" disabled={!isValid || !img}>Continue</Button>
                </Grid>
            </Grid>

        </Form>
    )
}