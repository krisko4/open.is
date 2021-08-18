import { Grid, Typography, TextField, Button } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { Field, Form, Formik } from "formik"
import { useEffect } from "react"
import { FC, useContext } from "react"
import { StepContext, useStepContext } from "../../../../../../contexts/StepContext"
import { StepProps } from "../StepProps"



const places: string[] = [
    'restaurant',
    'grocery store'
]

export const PlaceDetailsForm: FC<StepProps> = ({ setActiveStep }) => {

    const { placeDetails, setPlaceDetails } = useStepContext()

    const submitForm = (values: typeof placeDetails) => {
        console.log('hello')
        console.log(values)
        setActiveStep(2)
    }

    const updateValues = (values: typeof placeDetails) => {
        console.log(values)
        setPlaceDetails(values)

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
                                options={places}
                                fullWidth={true}
                                onChange={(e, value) => { setFieldValue('type', value); updateValues(values) }}
                                // getOptionSelected={(option, value) => option === value}
                                //    value={values.type}
                                renderInput={(params) => <TextField {...params} label="Business type" />}
                            />
                        </Grid>
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                Please enter a short subtitle
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Field as={TextField} name="subtitle" onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('subtitle', e.target.value); updateValues(values) }} fullWidth={true} label='Subtitle' />
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
                                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('description', e.target.value); updateValues(values)}}
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