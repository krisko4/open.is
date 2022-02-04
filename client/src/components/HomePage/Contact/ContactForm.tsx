import { Grid, TextField } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import myAxios from "../../../axios/axios";
import { LoadingButton } from "../../reusable/LoadingButton";
import * as Yup from 'yup'
import { sendContactMessage } from "../../../requests/ContactRequests";


const ContactSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().required().max(40),
    content: Yup.string().required().max(400)
})

export const initialValues = {
    name: '',
    email: '',
    content: ''
}
const isLetter = (e: React.KeyboardEvent) => {
    // let char = String.fromCharCode(e.keyCode);
    const char = e.key
    if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\b]+$/.test(char)) return true;
    else e.preventDefault();
}

export const ContactForm: FC = () => {

    const [loading, setLoading] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const handleSubmit = (values: typeof initialValues) => {
        setLoading(true)
            sendContactMessage(values).then(res => {
                enqueueSnackbar('Thank you. We have received your message.', {
                    variant: 'success'
                })
            })
            .catch(err => {
                console.log(err)
                enqueueSnackbar('Oops, something went wrong', {
                    variant: 'error'
                })
            })
            .finally(() => setLoading(false))
    
    }

    return (
        <Grid container item>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={ContactSchema}
                validateOnMount
            >
                {({ dirty, isValid, values }) => (
                    <Form>
                        <FastField as={TextField} onKeyDown={isLetter} name="name" fullWidth={true}
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
                            <LoadingButton loading={loading} disabled={loading || !dirty || !isValid} color="primary" type="submit" variant="contained">Submit</LoadingButton>
                        </Grid>
                    </Form>
                )}

            </Formik>
        </Grid>
    )
}