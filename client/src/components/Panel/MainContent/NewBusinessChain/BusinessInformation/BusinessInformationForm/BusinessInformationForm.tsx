import { Button, Grid, Typography } from "@mui/material"
import { Form, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { ImageUpload } from "../../../../../reusable/ImageUpload"
import { Description } from './Fields/Description'
import { Subtitle } from './Fields/Subtitle'
import { BusinessType } from './Fields/BusinessType'
import { BusinessName } from "./Fields/BusinessName"
import { useBusinessChainContext } from "../../../../../../contexts/PanelContexts/BusinessChainContext"


interface Props {
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>
}

export const BusinessInformationForm: FC<Props> = ({setImageFile}) => {

    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [img, setImg] = useState<any>(currentPlace.img)
    const { isValid, values } = useFormikContext<any>()

    useEffect(() => {
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.img = img
        setCurrentPlace(newCurrentPlace)
    }, [img])



    return (
        <Form>
            <Grid container style={{ marginTop: 20 }} alignItems="center" justifyContent="center">
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
                    <ImageUpload name="business-info" img={img} setImg={setImg} setImageFile={setImageFile} />
                </Grid>
                <Grid item container lg={11} style={{ marginTop: 40, marginBottom: 20 }} justifyContent="flex-end">
                    <Button color="primary" type="submit" disabled={!isValid || !img}>Continue</Button>
                </Grid>
            </Grid>

        </Form>
    );
}