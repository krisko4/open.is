import { Button, Grid, InputAdornment, TextField, Theme, Tooltip, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'
import LanguageIcon from '@mui/icons-material/Language'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useLocationContext } from "../../../../../../contexts/PanelContexts/LocationContext";
import { LocationDetails } from "../LocationDetails";
import ReactPhoneInput from 'react-phone-input-material-ui'
import { makeStyles } from "@mui/styles";
import { yupToFormErrors } from "formik";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const phoneRegExp = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/
const facebookRegExp = /^$|(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/
const instagramRegExp = /^$|^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
const urlRegExp = /^$|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/


type Inputs = {
    example: string,
    exampleRequired: string,
    website: string,
    phone: string,
    email: string,
    facebook: string,
    instagram: string
};

interface Props {
    location: LocationDetails
}

const schema = yup.object({
    phone: yup.string().required('Phone number is required'),
    email: yup.string().email('This is not a valid e-mail address'),
    website: yup.string().matches(urlRegExp, 'This is not a valid URL'),
    facebook: yup.string().matches(facebookRegExp, 'This is not a valid facebook URL'),
    instagram: yup.string().matches(instagramRegExp, 'This is not a valid instagram URL. Please provide just your profile name'),

})

export const TestForm: FC<Props> = ({ location }) => {
    const { setSelectedLocations, saveButtonClicked, fieldForAll, setErrorsDetected, setFieldForAll } = useLocationContext()
    const { control, register, handleSubmit, watch, setValue, getValues, formState: { errors, isValid } } = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    }

    useEffect(() => {
        //@ts-ignore
        setValue(fieldForAll.field, fieldForAll.value)
    }, [fieldForAll])

    useEffect(() => {
        setErrorsDetected(!isValid)
        console.log(isValid)
        console.log(errors)

    }, [isValid])

    useEffect(() => {
        setSelectedLocations(locations => {
            let foundLocation = locations.find(loc => loc === location)
            foundLocation = Object.assign(location, getValues())
            return [...locations]
        })
    }, [saveButtonClicked])





    return (
        <form style={{ flexGrow: 1 }} onSubmit={handleSubmit(onSubmit)} >
            <Grid container justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                <Grid item lg={5}>
                    <Tooltip title="Set value for all locations">
                        <Button
                            size="small"
                            style={{ marginTop: 15 }}
                            variant="outlined"
                            onClick={() => { setFieldForAll({ field: 'phone', value: getValues('phone') }) }}
                        >Phone number
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item lg={6} >
                    <Controller
                        name="phone"
                        control={control}
                        render={
                            ({ field}) =>
                                <ReactPhoneInput
                                    defaultCountry={'pl'}
                                    {...field}
                                    component={TextField}

                                    label={<span>Phone number <span style={{ color: 'red' }}>*</span></span>}
                                />
                        }
                    />



                    {/* <TextField
                        type="number"
                        label="Phone number"
                        {...register('phone')}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PhoneIcon color="primary" /></InputAdornment>
                        }}
                    /> */}
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mb: 1 }} alignItems="center">
                <Grid item lg={5}>
                    <Tooltip title="Set value for all locations">
                        <Button
                            size="small"
                            style={{ marginTop: 15 }}
                            variant="outlined"
                            onClick={() => setFieldForAll({ field: 'email', value: getValues('email') })}>
                            E-mail address</Button>
                    </Tooltip>
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        helperText={errors.email?.message}
                        error={errors.email?.message ? true : false}
                        label="example@mail.com"
                        {...register('email')}
                        placeholder="E-mail address"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><MailIcon color="primary" /></InputAdornment>
                        }}
                        fullWidth
                    />

                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mb: 1 }} alignItems="center">
                <Grid item lg={5}>
                    <Tooltip title="Set value for all locations">
                        <Button
                            size="small"
                            style={{ marginTop: 15 }}
                            variant="outlined"
                            onClick={() => setFieldForAll({ field: 'website', value: getValues('website') })}
                        >Website</Button>
                    </Tooltip>
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        helperText={errors.website?.message}
                        error={errors.website?.message ? true : false}
                        label="https://example.com"
                        placeholder="Personal website"
                        {...register('website')}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><LanguageIcon color="primary" /></InputAdornment>
                        }}

                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mb: 1 }} alignItems="center">
                <Grid item lg={5}>
                    <Tooltip title="Set value for all locations">
                        <Button
                            size="small"
                            style={{ marginTop: 15 }}
                            variant="outlined"
                            onClick={() => setFieldForAll({ field: 'facebook', value: getValues('facebook') })}
                        >Facebook</Button>
                    </Tooltip>
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        label="https://facebook.com/my-profile"
                        helperText={errors.facebook?.message}
                        error={errors.facebook?.message ? true : false}
                        {...register('facebook')}
                        placeholder="my-profile"
                        fullWidth
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
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={5}>
                    <Tooltip title="Set value for all locations">
                        <Button
                            size="small"
                            style={{ marginTop: 15 }}
                            variant="outlined"
                            onClick={() => setFieldForAll({ field: 'instagram', value: getValues('instagram') })}
                        >Instagram</Button>
                    </Tooltip>
                </Grid>
                <Grid item lg={6}>
                    <TextField
                        label="https://instagram.com/my-profile"
                        {...register('instagram')}
                        helperText={errors.instagram?.message}
                        error={errors.instagram?.message ? true : false}
                        fullWidth
                        placeholder="my-profile"
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
                </Grid>
            </Grid>
        </form>
    );
}