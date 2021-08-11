import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { StepProps } from "../StepProps";

interface ContactTypes {
    phoneNumber: string,
    website: string,
    email: string
}
const contactDetails = {
    phoneNumber: '',
    website: '',
    email: ''
}

export const ContactDetailsForm: FC<StepProps> = ({setActiveStep}) => {

    const handleSubmit = (values : ContactTypes) => {
        console.log('hello')
        setActiveStep(3)
    }
    return (
        <Formik
            initialValues={contactDetails}
            onSubmit={(values) => { handleSubmit(values) }}
        >
            {({ dirty, isValid }) => (
                <Form>
                    <Grid item container lg={12} justify="space-evenly"> 
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                Please provide a contact phone number
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                        <Field fullWidth={true} as={TextField} name="phoneNumber" label="Phone number" />
                        </Grid>
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                                Please provide a contact e-mail address
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Field as={TextField} label="example@mail.com" name="email" fullWidth={true}></Field>
                        </Grid>
                        <Grid item lg={5} style={{ marginTop: 20 }}>
                            <Typography>
                            Please provide your personal website
                            </Typography>
                        </Grid>
                        <Grid item lg={5}>
                            <Field as={TextField} label="http://example.com" name="website" fullWidth={true}></Field>
                        </Grid>
                        <Grid item lg={10} style={{marginTop: 10}}>
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