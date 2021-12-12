import { Button, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { ErrorMessage, FastField, Form, Formik } from "formik";
import React, { FC, useState } from "react";
import * as Yup from 'yup';
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
const facebookRegExp = /(?:https?:\/\/)(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig
const instagramRegExp = /^\s*(https?:\/\/)instagram\.com\/[a-z\d-_]{1,255}\s*$/i


const ContactDetailsSchema = Yup.object().shape({
    phone: Yup.string().required().matches(phoneRegExp, 'Phone number is invalid'),
    email: Yup.string().email(),
    website: Yup.string().url(),
    facebook: Yup.string().matches(facebookRegExp, 'This is not a valid facebook URL'),
    instagram: Yup.string().matches(instagramRegExp, 'This is not a valid instagram URL')
})



export const ContactDetailsForm: FC = () => {

    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const { setActiveStep } = useStepContext()

    const [contactDetails, setContactDetails] = useState({
        phone: currentPlace.phone,
        email: currentPlace.email,
        website: currentPlace.website,
        facebook: currentPlace.facebook,
        instagram: currentPlace.instagram
    })


    const handleSubmit = (values: typeof contactDetails) => {
        console.log(currentPlace)
        const newCurrentPlace = { ...currentPlace, ...values }
        setCurrentPlace(newCurrentPlace)
        setActiveStep(3)
    }
    return (
        <Formik
            initialValues={contactDetails}
            validationSchema={ContactDetailsSchema}
            onSubmit={handleSubmit}
            validateOnMount
        >
            {({ isValid, values }) => {
                return (
                    <Form>
                        <Grid item container style={{ marginTop: 10 }} lg={12} justify="space-evenly">
                            <Grid item lg={5} style={{ marginTop: 20 }}>
                                <Typography variant="overline">
                                    Contact phone number <span style={{ color: 'red' }}>*</span>
                                </Typography>
                            </Grid>
                            <Grid item lg={5}>
                                <FastField
                                    fullWidth={true}
                                    as={TextField}
                                    name="phone"
                                    type="number"
                                    label="Phone number"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PhoneAndroidIcon color="primary" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage name="phone">{msg => <Typography variant="caption" style={{ color: 'red' }}>{msg}</Typography>}</ErrorMessage>
                            </Grid>
                            <Grid item lg={5} style={{ marginTop: 20 }}>
                                <Typography variant="overline">
                                    E-mail address (optional)
                                </Typography>
                            </Grid>
                            <Grid item lg={5}>
                                <FastField
                                    as={TextField}
                                    label="example@mail.com"
                                    name="email"
                                    type="email"
                                    fullWidth={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <MailIcon color="primary" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage name="email">{msg => <Typography variant="caption" style={{ color: 'red' }}>{msg}</Typography>}</ErrorMessage>
                            </Grid>
                            <Grid item lg={5} style={{ marginTop: 20 }}>
                                <Typography variant="overline">
                                    Personal website address (optional)
                                </Typography>
                            </Grid>
                            <Grid item lg={5}>
                                <FastField
                                    as={TextField}

                                    label="http://example.com"
                                    name="website"
                                    fullWidth={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <LanguageIcon color="primary" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage name="website">{msg => <Typography variant="caption" style={{ color: 'red' }}>{msg}</Typography>}</ErrorMessage>
                            </Grid>
                            <Grid item lg={5}>
                                <FastField
                                    as={TextField}

                                    label="http://facebook.com/my-profile"
                                    name="facebook"
                                    fullWidth={true}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FacebookIcon color="primary" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage name="facebook">{msg => <Typography variant="caption" style={{ color: 'red' }}>{msg}</Typography>}</ErrorMessage>
                            </Grid>
                            <Grid item lg={5} style={{ marginTop: 20, textAlign: 'end' }}>
                                <Typography variant="overline">
                                    Facebook profile address (optional)
                                </Typography>
                            </Grid>
                            <Grid item lg={5}>
                                <FastField
                                    as={TextField}
                                    label="http://instagram.com/my-profile"
                                    name="instagram"
                                    fullWidth={true}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InstagramIcon color="primary" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage name="instagram">{msg => <Typography variant="caption" style={{ color: 'red' }}>{msg}</Typography>}</ErrorMessage>
                            </Grid>
                            <Grid item lg={5} style={{ marginTop: 20, textAlign: 'end' }}>
                                <Typography variant="overline">
                                    Instagram profile address (optional)
                                </Typography>
                            </Grid>
                            <Grid item lg={10} style={{ marginTop: 10 }}>
                                <Button
                                    fullWidth={true}
                                    variant="contained"
                                    style={{ marginTop: 10 }}
                                    color="primary"
                                    type="submit"
                                    disabled={!isValid}
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