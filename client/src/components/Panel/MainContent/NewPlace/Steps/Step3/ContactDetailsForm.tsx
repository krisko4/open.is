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
import { PanelForm } from "../../../../../reusable/PanelForm";
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
const facebookRegExp = /(?:https?:\/\/)(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/ig
const instagramRegExp = /^\s*(https?:\/\/)instagram\.com\/[a-z\d-_]{1,255}\s*$/i


const ContactDetailsSchema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is invalid'),
    email: Yup.string().email('This is not a valid e-mail address'),
    website: Yup.string().url('This is not a valid URL'),
    facebook: Yup.string().matches(facebookRegExp, 'This is not a valid facebook URL'),
    instagram: Yup.string().matches(instagramRegExp, 'This is not a valid instagram URL')
})



const isNumber = (e: React.KeyboardEvent) => {
    //  let char = String.fromCharCode(e);
    const char = e.key
    if (/^[0-9]+$/.test(char) || char === 'Backspace') return true;
    else e.preventDefault();
}
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
                    <PanelForm style={{ flexGrow: 1 }}>
                        <Grid container direction="column" style={{ marginTop: 10 }} justify="space-evenly">
                            <Grid container style={{ marginBottom: 15 }}>
                                <FastField
                                    fullWidth={true}
                                    as={TextField}
                                    onKeyDown={isNumber}
                                    name="phone"

                                    label="Phone number"
                                    placeholder="Phone number"
                                    maxLength={7}
                                    variant="outlined"
                                    focused
                                    inputProps={{
                                        maxLength: 15
                                    }}
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
                            <Grid item style={{ marginBottom: 15 }}>
                                <FastField
                                    as={TextField}
                                    variant="outlined"
                                    focused
                                    label="example@mail.com"
                                    placeholder="E-mail address"
                                    name="email"
                                    type="email"
                                    fullWidth={true}
                                    inputProps={{
                                        maxLength: 30
                                    }}
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
                            <Grid item style={{ marginBottom: 15 }}>
                                <FastField
                                    as={TextField}
                                    variant="outlined"
                                    focused
                                    label="http://example.com"
                                    placeholder="Personal website"
                                    name="website"
                                    fullWidth={true}
                                    inputProps={{
                                        maxLength: 50
                                    }}
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
                            <Grid item style={{ marginBottom: 15 }}>
                                <FastField
                                    as={TextField}

                                    label="http://facebook.com/my-profile"
                                    name="facebook"
                                    fullWidth={true}
                                    variant="outlined"
                                    focused
                                    placeholder="my-profile"
                                    inputProps={{
                                        maxLength: 50
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <p style={{ color: 'lightgrey' }}>https://facebook.com/</p>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <FacebookIcon color="primary" />
                                            </InputAdornment>

                                        )
                                    }}
                                />
                                <ErrorMessage name="facebook">{msg => <Typography variant="caption" style={{ color: 'red' }}>{msg}</Typography>}</ErrorMessage>
                            </Grid>
                            <Grid item style={{ marginBottom: 15 }}>
                                <FastField
                                    as={TextField}
                                    label="http://instagram.com/my-profile"
                                    name="instagram"
                                    fullWidth={true}
                                    variant="outlined"
                                    placeholder="my-profile"
                                    inputProps={{
                                        maxLength: 50
                                    }}
                                    focused
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <p style={{ color: 'lightgrey' }}>https://instagram.com/</p>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <InstagramIcon color="primary" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <ErrorMessage name="instagram">{msg => <Typography variant="caption" style={{ color: 'red' }}>{msg}</Typography>}</ErrorMessage>
                            </Grid>
                            <Button
                                fullWidth={true}
                                variant="contained"
                                style={{ marginTop: 10 }}
                                color="primary"
                                type="submit"
                                size="large"
                                disabled={!isValid}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </PanelForm>
                )
            }}

        </Formik >
    )

}