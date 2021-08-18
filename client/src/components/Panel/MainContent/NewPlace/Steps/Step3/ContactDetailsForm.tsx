import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { FC, useContext } from "react";
import { StepContext, useStepContext } from "../../../../../../contexts/StepContext";
import { StepProps } from "../StepProps";


export const ContactDetailsForm: FC<StepProps> = ({ setActiveStep }) => {

    const { contactDetails, setContactDetails } = useStepContext()
    const handleSubmit = (values: typeof contactDetails) => {
        console.log('hello')
        console.log(values)
        setActiveStep(3)
    }
    return (
        <Formik
            initialValues={contactDetails}
            onSubmit={(values) => { handleSubmit(values) }}
        >
            {({ dirty, isValid, setFieldValue, values }) => (
                <Form>
                    <Grid item container lg={12} justify="space-evenly">
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                Please provide a contact phone number
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Field
                                fullWidth={true}
                                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('phoneNumber', e.target.value); setContactDetails(values) }}
                                as={TextField}
                                name="phoneNumber"
                                label="Phone number"
                            />
                        </Grid>
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                Please provide a contact e-mail address
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Field
                                as={TextField}
                                label="example@mail.com"
                                name="email"
                                fullWidth={true}
                                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('email', e.target.value); setContactDetails(values) }}
                            >

                            </Field>
                        </Grid>
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                Please provide your personal website address
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Field
                                as={TextField}
                                label="http://example.com"
                                name="website"
                                fullWidth={true}
                                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => { setFieldValue('website', e.target.value); setContactDetails(values) }}
                            >

                            </Field>
                        </Grid>
                        <Grid item lg={10} style={{ marginTop: 10 }}>
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