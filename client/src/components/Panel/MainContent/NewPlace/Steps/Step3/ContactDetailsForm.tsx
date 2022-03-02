import { yupResolver } from '@hookform/resolvers/yup';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import * as Yup from 'yup';
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { EmailContainer } from './Email';
import { SocialMediaFieldContainer } from './SocialMediaField';
import { PhoneNumberContainer } from './PhoneNumber';

const phoneRegExp = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/
const facebookRegExp = /^$|(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/
const instagramRegExp = /^$|^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
const urlRegExp = /^$|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/



const schema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required').min(8).max(15),
    email: Yup.string().email('This is not a valid e-mail address'),
    website: Yup.string().matches(urlRegExp, 'This is not a valid URL'),
    facebook: Yup.string().matches(facebookRegExp, 'This is not a valid facebook URL'),
    instagram: Yup.string().matches(instagramRegExp, 'This is not a valid instagram URL. Please provide just your profile name'),
})


interface Inputs {
    phone: string,
    email: string,
    website: string,
    facebook: string,
    instagram: string
}


const SubmitButton: FC = () => {
    const { getValues, formState: { errors, isValid } } = useFormContext()
    const { setCurrentPlace } = useCurrentPlaceContext()
    const { setActiveStep } = useStepContext()


    const handleClick = () => {
        setCurrentPlace(place => Object.assign(place, getValues()))
        setActiveStep(step => step + 1)
    }


    return (
        <Button
            fullWidth={true}
            variant="contained"
            style={{ marginTop: 10 }}
            color="primary"
            size="large"
            disabled={!isValid}
            onClick={handleClick}
        >
            Submit
        </Button>
    )
}

export const ContactDetailsForm: FC = () => {

    const {steps, activeStep} = useStepContext()

    const methods = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            phone: '',
            email: '',
            facebook: '',
            instagram: '',
            website: ''
        }
    });

    useEffect(() => {
        steps[activeStep].isValid = methods.formState.isValid
    }, [methods.formState.isValid])

    return (
        <FormProvider {...methods}>
            <form style={{ flexGrow: 1 }}>
                <Grid item container >
                    <PhoneNumberContainer />
                    <Grid container sx={{ mt: 1, mb: 1 }}>
                        <EmailContainer />
                    </Grid>
                    <Grid container sx={{ mt: 1, mb: 1 }}>
                        <SocialMediaFieldContainer
                            label="Website address"
                            shouldUpdateCurrentPlace={true}
                            socialMedia="website"
                            placeholder={"https://www.example.com"}
                            icon={
                                <LanguageIcon color="primary" />
                            }
                        />
                    </Grid>
                    <Grid container sx={{ mt: 1, mb: 1 }}>
                        <SocialMediaFieldContainer
                            label="https://facebook.com/my-profile"
                            prefix="https://facebook.com/"
                            socialMedia="facebook"
                            placeholder="my-profile"
                            icon={
                                <FacebookIcon color="primary" />
                            }
                        />
                    </Grid>
                    <Grid container sx={{ mt: 1, mb: 1 }}>
                        <SocialMediaFieldContainer
                            label="https://instagram.com/my-profile"
                            socialMedia="instagram"
                            placeholder="my-profile"
                            prefix="https://instagram.com/"
                            icon={
                                <InstagramIcon color="primary" />
                            }
                        />
                    </Grid>
                    <SubmitButton />
                </Grid>
            </form>
        </FormProvider>
    );

}