import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Form, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { getBusinessTypes } from "../../../../../../requests/BusinessTypeRequests"
import { LoadingButton } from "../../../../../reusable/LoadingButton"
import { PanelForm } from "../../../../../reusable/PanelForm"
import { BusinessType } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/BusinessType"
import { Description } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/Description"
import { Subtitle } from "../../../NewBusinessChain/BusinessInformation/BusinessInformationForm/Fields/Subtitle"

const useStyles = makeStyles({
    form: {
        '& .MuiTypography-root': {
            color: 'white'
        },
        '& .MuiInputBase-root': {
            color: 'white'
        }
    }
})

export const PlaceDetailsForm: FC = () => {

    const classes = useStyles()
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
        <Form style={{ flexGrow: 1 }}>
            <Grid item container>
                {/* <Autocomplete
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={['first', 'second']}
                    renderInput={(params) => <TextField {...params} focused label="Movie" />}
                /> */}
                <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                    <BusinessType />
                </Grid>
                <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
                    <Subtitle />
                </Grid>
                <Description />
                <LoadingButton
                    size="large"
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
        </Form>
    );
}