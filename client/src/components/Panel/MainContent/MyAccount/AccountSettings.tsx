import { LoadingButton } from "@mui/lab"
import SettingsIcon from '@mui/icons-material/Settings';
import { Fade, Slide, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Formik, Form, FastField } from "formik"
import { FC, useState } from "react"
import { useLoginContext } from "../../../../contexts/LoginContext"
import { updateUserData } from "../../../../requests/UserRequests"
import { useCustomSnackbar } from "../../../../utils/snackbars"
import { initialValues } from "../../../HomePage/Contact/ContactForm"
import { PasswordChange } from "./PasswordChange"
import * as Yup from 'yup'
import { match } from "react-router-dom"

const AccountDetailsSchema = Yup.object().shape({
    email: Yup.string().email('This is not a valid e-mail address').required('E-mail address is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Password should contain  at least 8 characters, one Uppercase, one lowercase, one number and one special case character"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

})

const isLetter = (e: React.KeyboardEvent) => {
    const char = e.key
    if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\b]+$/.test(char)) return true;
    else e.preventDefault();
}
export const AccountSettings: FC = () => {

    const [loading, setLoading] = useState(false)
    const [passwordChangeOpen, setPasswordChangeOpen] = useState(false)
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const { fullName, setFullName, img, setImg, email } = useLoginContext()
    // const [img, setImg] = useState<any>(localStorage.getItem('img'))
    const [imageFile, setImageFile] = useState<any>(null)



    const initialValues = {
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ')[1],
        email: email,
        password: '',
        confirmPassword: ''
    }


    const handleSubmit = async (values: typeof initialValues) => {
        console.log(values)
        setLoading(true)
        try {
            const userData = {
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password,
                img: imageFile,
                email: values.email
            }
            const formData = new FormData()
            let key: keyof typeof userData
            for (key in userData) formData.append(key, userData[key])
            const uid = localStorage.getItem('uid') as string
            const res = await updateUserData(uid, formData)
            const { user } = res.data
            if (user.img) {
                localStorage.setItem('img', user.img)
                setImg(user.img)
            }
            const firstName = fullName.split(' ')[0]
            const lastName = fullName.split(' ')[1]
            if (user.firstName !== firstName || user.lastName !== lastName) {
                const fullName = `${user.firstName} ${user.lastName}`
                localStorage.setItem('fullName', fullName)
                setFullName(fullName)
            }
            enqueueSuccessSnackbar('You have successfully changed your personal data')
        } catch (err) {
            console.error(err)
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid container sx={{ overflow: 'hidden' }}>
            <Fade in={true} timeout={1500}>
                <Grid container item lg={7} direction="column" justifyContent="space-evenly" alignItems="center">
                    <Grid item sx={{ textAlign: 'center' }}>
                        <Typography variant="h2">Account credentials</Typography>
                        <Typography variant="h6">Manage your personal data</Typography>
                    </Grid>
                    <Formik initialValues={initialValues} validationSchema={AccountDetailsSchema} validateOnMount onSubmit={handleSubmit}>
                        {({ dirty, errors, isValid, values, setFieldValue }) => (
                            <Form >
                                <Grid container justifyContent="center">
                                    <Grid container item rowSpacing={2} lg={8}>
                                        <Grid item container>
                                            <FastField fullWidth as={TextField} error={errors.firstName} helperText={errors.firstName} variant="outlined" name="firstName" onKeyDown={isLetter} label="First name" />
                                        </Grid>
                                        <Grid container item>
                                            <FastField fullWidth as={TextField} error={errors.lastName} helperText={errors.lastName} variant="outlined" name="lastName" onKeyDown={isLetter} label="Last name" />
                                        </Grid>
                                        <Grid container item>
                                            <FastField fullWidth as={TextField} error={errors.email} helperText={errors.email} variant="outlined" name="email" label="E-mail address" />
                                        </Grid>
                                        <Grid container item>
                                            <Button color="primary" onClick={() => setPasswordChangeOpen(true)} variant="outlined" >Change password</Button>
                                            <PasswordChange errors={errors} setPasswordChangeOpen={setPasswordChangeOpen} passwordChangeOpen={passwordChangeOpen} />
                                        </Grid>

                                        <Grid item container>
                                            <LoadingButton size="large" fullWidth variant="contained" type="submit" loading={loading} disabled={(loading || !isValid || !dirty) && img === localStorage.getItem('img')} color="primary">Submit changes</LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>

            </Fade>

            <Slide direction="left" timeout={1500} in={true}>
                <Grid container
                    lg={5}
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={
                        {
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'

                        }
                    }>
                    <Grid item container direction="column" alignItems="center">
                        <Avatar
                            src={img}
                            alt={fullName}
                            sx={{ width: 200, height: 200 }}
                        />
                        <Typography variant="h2" sx={{ textAlign: 'center', mt: 3 }}>
                            {fullName}
                        </Typography>
                        <Typography variant="h6">
                            {email}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item lg={8}>
                            <List style={{ flexGrow: 1 }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <SettingsIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Account credentials" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <SettingsIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="My subscriptions" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <SettingsIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="My places" />
                                </ListItem>
                            </List>


                        </Grid>
                    </Grid>
                </Grid>

            </Slide>

        </Grid >
    )
}