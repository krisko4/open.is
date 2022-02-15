import { Button, Grid, InputAdornment, TextField, Theme, Tooltip, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'
import LanguageIcon from '@mui/icons-material/Language'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useLocationContext } from "../../../../../../contexts/PanelContexts/LocationContext";
import { LocationDetails } from "../LocationDetails";
import ReactPhoneInput from 'react-phone-input-material-ui'
import { makeStyles } from "@mui/styles";
import PhoneField from "../PhoneField";

const useStyles = makeStyles((theme: Theme) => (
    {
        container: {
            '& .special-label': {
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))!important',
                background: `${theme.palette.background.default}!important`,
                color: `${theme.palette.text.secondary}`,
                padding: '0 3px!important',
                left: '10px!important',
            },
            '& :hover': {
                border: `1px solid ${theme.palette.text.primary}!important`
            },
            border: `1px solid grey!important`,
            borderRadius: '2px!important',
            '& :focus': {
                border: `2px ${theme.palette.primary.main}!important`
            },
        },
        input: {
            '& :hover': {
                border: `1px solid ${theme.palette.text.primary}!important`
            },
            border: `1px solid grey!important`,
            borderRadius: '2px!important',
            // '& :hover': {
            //     borderColor: `${theme.palette.text.primary}!important`
            // },
            '& :focus': {
                border: `2px ${theme.palette.primary.main}!important`
            },
            // borderColor: `${theme.palette.divider}!important`,
            width: 'inherit!important',
            background: 'inherit!important',
        }
    }

)
)

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

export const TestForm: FC<Props> = ({ location }) => {
    const classes = useStyles()
    const theme = useTheme()
    const { setSelectedLocations, saveButtonClicked, fieldForAll, setFieldForAll } = useLocationContext()
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    }

    useEffect(() => {
        //@ts-ignore
        fieldForAll.field && setValue(fieldForAll.field, fieldForAll.value)
    }, [fieldForAll])

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
                            onClick={() => setFieldForAll({ field: 'phone', value: getValues('phone') })}

                        >Phone number
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item lg={5} >
                    <ReactPhoneInput
                        component={TextField}
                        {...register('phone')}
                        value={getValues('phone')}
                        onChange={(phone: any) => setValue('phone', phone)}

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
                <Grid item lg={5}>
                    <TextField
                        label="example@mail.com"
                        {...register('email')}
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
                <Grid item lg={5}>
                    <TextField
                        label="https://example.com"
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
                <Grid item lg={5}>
                    <TextField
                        label="https://facebook.com/my-profile"
                        {...register('facebook')}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><FacebookIcon color="primary" /></InputAdornment>
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
                <Grid item lg={5}>
                    <TextField
                        label="https://instagram.com/my-profile"
                        {...register('instagram')}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><InstagramIcon color="primary" /></InputAdornment>
                        }}
                    />
                </Grid>
            </Grid>
        </form>
    );
}