import { Button, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import myAxios, { authAxios } from "../../../axios/axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import { setEmail } from "../../../store/actions/setEmail";
import { LoadingButton } from "../../reusable/LoadingButton";
import { FacebookLoginButton } from "../FacebookLoginButton";
import { GoogleLoginButton } from "../GoogleLoginButton";

const registrationFields = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    confirmPassword: '',
    password: '',

}

const isLetter = (e: React.KeyboardEvent) => {
    // let char = String.fromCharCode(e.keyCode);
    const char = e.key
    if (/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\b]+$/.test(char)) return true;
    else e.preventDefault();
}

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('This field is required'),
    lastName: Yup.string()
        .required('This field is required'),
    email: Yup.string()
        .email()
        .required('This field is required'),
    confirmEmail: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('email'), null], 'E-mails must match'),
    password: Yup.string()
        .required('This field is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Password should contain  at least 8 characters, one Uppercase, one lowercase, one number and one special case character"
        ),
    confirmPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

})


export const RegistrationForm = () => {

    const { setLoginOpen, setRegistrationOpen, setConfirmationOpen} = useAuthContext()
    const [errorMessage, setErrorMessage] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const signInWithFacebook = () => {
        console.log('witam')
        authAxios.get('/auth/facebook')
    }

    const signUp = async (userData: typeof registrationFields) => {
        setLoading(true)
        setErrorMessage('')
        console.log(userData)
        try {
            await myAxios.post('/registration', { ...userData })
            // setEmail(userData['email'])
            dispatch(setEmail(userData['email']))
            setRegistrationOpen(false)
            setConfirmationOpen(true)
            enqueueSnackbar('You have successfully registered', {
                variant: 'success'
            })
        } catch (err : any) {
            console.error(err)
            enqueueSnackbar('Registration failed', {
                variant: 'error'
            })
            setErrorMessage(err.response.data)
        } finally {
            setLoading(false)
        }

    }

    return (
        <Formik
            initialValues={{ ...registrationFields }}
            onSubmit={(values) => signUp(values)}
            validationSchema={SignupSchema}
        >
            {({ isValid, dirty, errors, touched }) => (
                <Form>
                    <DialogContent>
                        <Card elevation={6} style={{ marginBottom: 10 }}>
                            <CardContent>
                                <Grid container justify="center" style={{ marginBottom: 10 }}>
                                    <Grid item lg={10} style={{ marginBottom: 10 }}>
                                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Hello!</Typography>
                                        <Typography variant="body2" style={{ color: 'grey' }}>Please sign up to
                                            continue</Typography>
                                    </Grid>
                                    {errorMessage && <Typography variant="caption" style={{textAlign: 'center'}} color="secondary">{errorMessage}</Typography>}
                                    <Grid item container justify="space-between" lg={10} style={{ textAlign: 'center' }}>
                                        <Grid item lg={5} style={{ marginBottom: 10 }}>
                                            <Field as={TextField} onKeyDown={isLetter} fullWidth={true}
                                                label="First name *"
                                                name="firstName" />
                                            {errors.firstName && touched.firstName ? (
                                                <Typography variant="caption"
                                                    color="secondary">{errors.firstName}</Typography>
                                            ) : null}
                                        </Grid>
                                        <Grid item lg={5} style={{ marginBottom: 10 }}>
                                            <Field as={TextField} onKeyDown={isLetter} fullWidth={true} name="lastName"
                                                label="Last name *" />
                                            {errors.lastName && touched.lastName ? (
                                                <Typography variant="caption"
                                                    color="secondary">{errors.lastName}</Typography>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={10} style={{ marginBottom: 10, textAlign: 'center' }}>
                                        <Field as={TextField} fullWidth={true} label="E-mail *"
                                            type="email" name="email" />
                                        {errors.email && touched.email ? (
                                            <Typography variant="caption"
                                                color="secondary">{errors.email}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10} style={{ marginBottom: 10, textAlign: 'center' }}>
                                        <Field as={TextField} fullWidth={true}
                                            label="Confirm E-mail *"
                                            type="email" name="confirmEmail" />
                                        {errors.confirmEmail && touched.confirmEmail ? (
                                            <Typography variant="caption"
                                                color="secondary">{errors.confirmEmail}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10} style={{ marginBottom: 10, textAlign: 'center' }} >
                                        <Field as={TextField} fullWidth={true} label="Password *"
                                            type="password" name="password" />
                                        {errors.password && touched.password ? (
                                            <Typography variant="caption"
                                                color="secondary">{errors.password}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10} style={{ marginBottom: 10, textAlign: 'center' }}>
                                        <Field as={TextField} fullWidth={true}
                                            label="Confirm password *"
                                            type="password" name="confirmPassword" />
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <Typography variant="caption"
                                                color="secondary">{errors.confirmPassword}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10}>
                                        <LoadingButton
                                            disabled={(!(isValid && dirty) || loading)}
                                            fullWidth={true}
                                            type="submit"
                                            size="large"
                                            loading={loading}
                                            color="secondary"
                                            variant="contained"
                                        >
                                            Sign up
                                        </LoadingButton>
                                    </Grid>
                                    {/* <Grid item lg={10} style={{ textAlign: 'center' }}>
                                        <h4>OR</h4>
                                    </Grid>
                                    <Grid item lg={10} style={{ marginBottom: 10 }}>
                                        <GoogleLoginButton />
                                    </Grid>
                                    <Grid item lg={10}>
                                        <FacebookLoginButton />
                                         <Button color="primary" onClick={() => signInWithFacebook()}>Sign in with facebook</Button>
                                    </Grid> */}
                                    <Grid item lg={10} style={{ textAlign: 'center' }}>
                                        <Typography variant="caption">
                                            Already have an account?&nbsp;
                                            <Link
                                                onClick={() => {
                                                    setLoginOpen(true);
                                                    setRegistrationOpen(false)
                                                }}
                                            >
                                                Click here to sign in
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </DialogContent>
                </Form>
            )
            }
        </Formik >
    )
}

