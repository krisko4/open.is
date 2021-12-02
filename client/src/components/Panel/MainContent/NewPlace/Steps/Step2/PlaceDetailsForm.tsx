import { Grid, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { FastField, Form, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import myAxios from "../../../../../../axios/axios"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { LoadingButton } from "../../../../../reusable/LoadingButton"


export const PlaceDetailsForm: FC = () => {

    console.log('dupsko')
    const { values, isValid } = useFormikContext<any>()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [loading, setLoading] = useState(false)
    const [businessTypes, setBusinessTypes] = useState<any>([])

    useEffect(() => {
        myAxios.get('/business_types')
            .then(res => setBusinessTypes(res.data))
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


    const submitAutocomplete = (value: string | null) => {
        const newCurrentPlace = { ...currentPlace }
        if (value) newCurrentPlace.type = value
        setCurrentPlace(newCurrentPlace)
    }


    return (
        <Form>
            <Grid item container lg={12} justify="space-evenly">
                <Grid item lg={5} style={{ marginTop: 20 }}>
                    <Typography>
                        What is the type of your business?
                    </Typography>
                </Grid>
                <Grid item lg={5}>
                    <Autocomplete
                        freeSolo
                        options={businessTypes}
                        fullWidth={true}
                        value={currentPlace.type}
                        onChange={(e, value) => submitAutocomplete(value)}
                        renderInput={(params) => <TextField  {...params} label="Business type" />}
                    />
                </Grid>
                <Grid item lg={5} style={{ marginTop: 20 }}>
                    <Typography>
                        Please enter a short subtitle
                    </Typography>
                </Grid>
                <Grid item lg={5}>
                    <FastField as={TextField}
                        name="subtitle"
                        fullWidth={true}
                        label='Subtitle'
                        helperText={`${values.subtitle.length}/100`}
                        inputProps={{
                            maxLength: 100
                        }} />
                </Grid>
                <Grid item lg={10} style={{ marginTop: 20 }}>
                    <Typography style={{ textAlign: 'center' }}>
                        How would you describe your business in few words?
                    </Typography>
                </Grid>
                <Grid item lg={10} style={{ marginTop: 10 }}>
                    <FastField as={TextField}
                        fullWidth={true}
                        label="This is a description of my place!"
                        multiline
                        name="description"
                        rows={10}
                        variant="outlined"
                        rowsMax={10}
                        helperText={`${values.description.length}/600`}
                        inputProps={{
                            maxLength: 600
                        }}
                    />
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