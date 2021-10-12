import { Grid, TextField } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import React, { FC } from "react";
import { LoadingButton } from "../../reusable/LoadingButton";


const initialValues = {
    name: '',
    email: '',
    content: ''
}

export const ContactForm: FC = () => {


    const handleSubmit = () => {
        console.log('dododo')
    }

    return (
        <Grid container item>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ dirty, isValid, values }) => (
                    <Form>
                        <FastField as={TextField} name="name" fullWidth={true}
                            label="Please enter your name" />
                        <FastField style={{ marginTop: 10 }} as={TextField} name="email" fullWidth={true}
                            label="Please enter your e-mail address" />

                        <FastField
                            style={{ marginTop: 20 }}
                            as={TextField}
                            fullWidth={true}
                            label="This is my message!"
                            multiline
                            name="content"
                            rows={15}
                            variant="outlined"
                            rowsMax={15}
                            helperText={`${values.content.length}/400`}
                            inputProps={{
                                maxLength: 400
                            }}
                        />
                        <Grid item container justify="flex-end">
                            <LoadingButton loading={false} color="primary" variant="contained">Submit</LoadingButton>
                        </Grid>
                    </Form>
                )}

            </Formik>
        </Grid>
    )
}