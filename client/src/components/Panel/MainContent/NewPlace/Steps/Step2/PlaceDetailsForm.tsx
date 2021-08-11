import { Grid, Typography, TextField, Button } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { Field, Form, Formik } from "formik"
import { FC } from "react"
import { StepProps } from "../StepProps"

interface PlaceTypes{
    type: string,
    subtitle: string,
    description: string, phoneNumber: string, email: string,
    website: string
}
const placeDetails = {
    type: '',
    subtitle: '',
    description: '',
    phoneNumber: '',
    email: '',
    website: ''
}



const places: string[] = [
    'restaurant',
    'grocery store'
]

export const PlaceDetailsForm: FC<StepProps> = ({ setActiveStep }) => {

    const submitForm = (values : PlaceTypes) => {
        console.log('hello')
        console.log(values)
        setActiveStep(2)
    }

    return (
        <Formik
            initialValues={placeDetails}
            onSubmit={values => submitForm(values)}
        >
            {({ dirty, isValid, values, setFieldValue }) => (
                <Form>
                    <Grid item container lg={12} justify="space-evenly">
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                What is the type of your business?
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={places}
                                fullWidth={true}
                                onChange={(e, value) => setFieldValue("type", value)}
                                value={values.type}
                                renderInput={(params) => <TextField {...params} label="Business type" />}
                            />
                        </Grid>
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                Please enter a short subtitle
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Field as={TextField} name="subtitle" fullWidth={true} label='Subtitle' />
                        </Grid>
                        <Grid item lg={10} style={{ marginTop: 20 }}>
                            <Typography style={{ textAlign: 'center' }}>
                                How would you describe your business in few words?
                            </Typography>
                        </Grid>
                        <Grid item lg={10}>
                            <Field as={TextField}
                                fullWidth={true}
                                label="This is a description of my place!"
                                multiline
                                name="description"
                                rows={10}
                                rowsMax={10}
                            />
                        </Grid>
                        <Grid item lg={10}>
                            <Button
                                fullWidth={true}
                                variant="contained"
                                style={{ marginTop: 10 }}
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}