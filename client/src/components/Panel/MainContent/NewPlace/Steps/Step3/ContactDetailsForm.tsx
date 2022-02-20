import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import * as Yup from 'yup';
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";

const phoneRegExp = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/
const facebookRegExp = /(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/
const instagramRegExp = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/ 
const urlRegExp = /^$|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/ 


const ContactDetailsSchema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is invalid'),
    email: Yup.string().email('This is not a valid e-mail address'),
    website: Yup.string().matches(urlRegExp, 'This is not a valid URL'),
    facebook: Yup.string().matches(facebookRegExp, 'This is not a valid facebook URL'),
    instagram: Yup.string().matches(instagramRegExp, 'This is not a valid instagram URL'),
})


const isNumber = (e: React.KeyboardEvent) => {
    //  let char = String.fromCharCode(e);
    const char = e.key
    if (/^[0-9]+$/.test(char) || char === 'Backspace') return true;
    else e.preventDefault();
}
export const ContactDetailsForm: FC = () => {

    let { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const { setActiveStep } = useStepContext()

    const [contactDetails, setContactDetails] = useState({
        phone: currentPlace.phone,
        email: currentPlace.email,
        website: currentPlace.website,
        facebook: currentPlace.facebook,
        instagram: currentPlace.instagram,
    })

    useEffect(() => {
        console.log(currentPlace)
    },[])

    const handleSubmit = (values: typeof contactDetails) => {
        currentPlace = Object.assign(currentPlace, values)
        setActiveStep(3)
    }
    return (
        <Formik
            initialValues={contactDetails}
            validationSchema={ContactDetailsSchema}
            onSubmit={handleSubmit}
            validateOnMount
        >
            {({ isValid, errors, touched, handleChange, handleBlur, values }) => {
                return (
                    <Form style={{ flexGrow: 1 }}>
                        <Grid container direction="column" style={{ marginTop: 10 }} justifyContent="space-evenly">
                            <Grid container style={{ marginBottom: 15 }}>
                                <FastField
                                    fullWidth={true}
                                    as={TextField}
                                    onKeyDown={isNumber}
                                    name="phone"
                                    error={errors.phone && touched.phone}
                                    label={<span>Phone number <span style={{ color: 'red' }}>*</span></span>}
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
                                    // focused
                                    label="example@mail.com"
                                    placeholder="E-mail address"
                                    error={errors.email && touched.email}
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
                                    // focused
                                    label="http://example.com"
                                    placeholder="Personal website"
                                    name="website"
                                    error={errors.website}
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
                                    label="http://facebook.com/my_profile"
                                    name="facebook"
                                    fullWidth={true}
                                    variant="outlined"
                                    // focused
                                    error={errors.facebook}
                                    placeholder="my_profile"
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
                                    label="http://instagram.com/my_profile"
                                    name="instagram"
                                    error={errors.instagram}
                                    fullWidth={true}
                                    variant="outlined"
                                    placeholder="my_profile"
                                    inputProps={{
                                        maxLength: 50
                                    }}
                                    // focused
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
                            {/* <Field
                                name="test"
                            >
                                {({ field } : any) => (
                                    <InputMask
                                        mask="http://f/a/cebook.com/"
                                        {...field}
                                    >
                                        {(innerProps : any) => <TextField {...innerProps}  />}
                                    </InputMask>

                                )}
                            </Field> */}
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
                    </Form>
                );
            }}

        </Formik >
    );

}