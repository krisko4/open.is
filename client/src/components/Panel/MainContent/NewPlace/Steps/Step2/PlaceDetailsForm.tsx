import { Grid, Typography } from "@material-ui/core"
import { Form, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { getBusinessTypes } from "../../../../../../requests/BusinessTypeRequests"
import { LoadingButton } from "../../../../../reusable/LoadingButton"
import { BusinessType } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/BusinessType"
import { Description } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/Description"
import { Subtitle } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/Subtitle"


export const PlaceDetailsForm: FC = () => {

    const { values, isValid } = useFormikContext<any>()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [loading, setLoading] = useState(false)
    const [businessTypes, setBusinessTypes] = useState<any>([])

    useEffect(() => {
        getBusinessTypes().then(res => setBusinessTypes(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPlace(currentPlace => {
                currentPlace.description = values.description
                currentPlace.subtitle = values.subtitle
                currentPlace.type = values.businessType
                return { ...currentPlace }
            })
        }, 50)
        return () => clearTimeout(timeout)
    }, [values])




    return (
        <Form>
            <Grid item container lg={12} justify="space-evenly">
                <Grid item lg={5} style={{ marginTop: 20 }}>
                    <Typography>
                        What is the type of your business?
                    </Typography>
                </Grid>
                <Grid item lg={5}>
                    <BusinessType />
                </Grid>
                <Grid item lg={5} style={{ marginTop: 20 }}>
                    <Typography>
                        Please enter a short subtitle
                    </Typography>
                </Grid>
                <Grid item lg={5}>
                    <Subtitle />
                </Grid>
                <Grid item lg={10} style={{ marginTop: 20 }}>
                    <Typography style={{ textAlign: 'center' }}>
                        How would you describe your business in few words?
                    </Typography>
                </Grid>
                <Grid item lg={10} style={{ marginTop: 10 }}>
                    <Description />
                </Grid>
                <Grid item lg={10}>
                    <LoadingButton
                        loading={loading}
                        fullWidth={true}
                        variant="contained"
                        style={{ marginTop: 10 }}
                        color="primary"
                        type="submit"
                        disabled={loading || !isValid}
                    >
                        Submit
                    </LoadingButton>
                </Grid>
            </Grid>
        </Form>
    )
}