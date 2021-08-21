import { Button, Grid, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { FastField, Form, Formik } from "formik"
import { FC } from "react"
import * as Yup from "yup"
import { useStepContext } from "../../../../../../contexts/StepContext"


const places: string[] = [
    'restaurant',
    'grocery store'
]
const PlaceDetailsSchema = Yup.object().shape({
    type: Yup.string().required(),
    subtitle: Yup.string().required().max(50),
    description: Yup.string().required().max(250)
})

export const PlaceDetailsForm: FC = () => {

    
    let {setActiveStep, placeDetails, setPlaceDetails } = useStepContext()

    const submitForm = (values: typeof placeDetails) => {
        console.log('hello')
        console.log(values)
        setActiveStep(2)
    }

    const submitAutocomplete = (value: string | null, setFieldValue: any) => {
        let values = { ...placeDetails }
        values['type'] = value
        setPlaceDetails(values)
        setFieldValue('type', value)
    }



    return (
        <Formik
            initialValues={placeDetails}
            onSubmit={values => submitForm(values)}
            validationSchema={PlaceDetailsSchema}
        >
            {({ dirty, isValid, values, setFieldValue }) => {
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
                                    options={places}
                                    fullWidth={true}
                                    onChange={(e, value) => submitAutocomplete(value, setFieldValue)}

                                    renderInput={(params) => <TextField {...params} label="Business type" />}
                                />
                            </Grid>
                            <Grid item lg={5} style={{ marginTop: 20 }}>
                                <Typography>
                                    Please enter a short subtitle
                                </Typography>
                            </Grid>
                            <Grid item lg={5}>
                                <FastField
                                    as={TextField}
                                    onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('subtitle', e.target.value); console.log(values); setPlaceDetails(values) }}
                                    name="subtitle"
                                    fullWidth={true}
                                    label='Subtitle'
                                    helperText={`${values.subtitle.length}/50`}
                                    inputProps={{
                                        maxLength: 50

                                    }} />


                            </Grid>
                            <Grid item lg={10} style={{ marginTop: 20 }}>
                                <Typography style={{ textAlign: 'center' }}>
                                    How would you describe your business in few words?
                                </Typography>
                            </Grid>
                            <Grid item lg={10} style={{marginTop: 10}}>
                                <FastField as={TextField}
                                    onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('description', e.target.value); setPlaceDetails(values) }}
                                    fullWidth={true}
                                    label="This is a description of my place!"
                                    multiline
                                    name="description"
                                    rows={10}
                                    variant="outlined"
                                    rowsMax={10}
                                    helperText={`${values.description.length}/250`}
                                    inputProps={{
                                        maxLength: 250
                                    }}
                                />
                            </Grid>
                            <Grid item lg={10}>
                                <Button
                                    fullWidth={true}
                                    variant="contained"
                                    style={{ marginTop: 10 }}
                                    color="primary"
                                    type="submit"
                                    disabled={!(isValid && dirty)}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>


                )
            }}

        </Formik>
    )
}