import { Button, Grid, InputAdornment, TextField, Tooltip } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'
import LanguageIcon from '@mui/icons-material/Language'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useLocationContext } from "../../../../../../contexts/PanelContexts/LocationContext";
import { LocationDetails } from "../LocationDetails";

type Inputs = {
    example: string,
    exampleRequired: string,
    website: string,
    phone: string,
    email: string,
    facebook: string,
    instagram: string
};

interface Props{
    location: LocationDetails
}

export const TestForm: FC<Props> = ({location}) => {
    const {setSelectedLocations, saveButtonClicked, fieldForAll, setFieldForAll} = useLocationContext()
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
            foundLocation = Object.assign(location , getValues())
            return [...locations]
        }) 
    }, [saveButtonClicked])





    return (
        <form style={{ flexGrow: 1 }} onSubmit={handleSubmit(onSubmit)} >
            <Grid container justifyContent="center" alignItems="center">
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
                <Grid item lg={5}>
                    <TextField
                        type="number"
                        label="Phone number"
                        {...register('phone')}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PhoneIcon color="primary" /></InputAdornment>
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
            <Grid container justifyContent="center" alignItems="center">
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
            <Grid container justifyContent="center" alignItems="center">
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