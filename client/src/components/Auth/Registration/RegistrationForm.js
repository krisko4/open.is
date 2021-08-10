import {Field, Form, Formik} from "formik";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {GoogleLoginButton} from "../GoogleLoginButton";
import {FacebookLoginButton} from "../FacebookLoginButton";
import Link from "@material-ui/core/Link";
import * as React from "react";
import * as Yup from "yup";
import myAxios from "../../../axios/axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {LoadingButton} from "../../LoadingButton/LoadingButton";

const registrationFields = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    confirmPassword: '',
    password: '',

}

const isLetter = (e) => {
    let char = String.fromCharCode(e.keyCode);
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

    const {setLoginOpen, setRegistrationOpen, setConfirmationOpen, setEmail} = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const signUp = async (values) => {
        setLoading(true)
        setErrorMessage('')
        console.log(values)
        try {
            await myAxios.get('/users', {
                params: {
                    email: values['email']
                }
            })
            await myAxios.post('/registration', {...values})
            setEmail(values['email'])
            setRegistrationOpen(false)
            setConfirmationOpen(true)

        } catch (err) {
            console.error(err)
           // setErrorMessage(err.response.data.error)
        } finally{
            setLoading(false)
        }

    }

    return (
        <Formik
            initialValues={{...registrationFields}}
            onSubmit={(values) => signUp(values)}
            validationSchema={SignupSchema}
        >
            {({isValid, dirty, errors, touched}) => (
                <Form>
                    <DialogContent>
                        <Card elevation={6} style={{marginBottom: 10}}>
                            <CardContent>
                                <Grid container justify="center" style={{marginBottom: 10}}>
                                    <Grid item lg={10} style={{marginBottom: 10}}>
                                        <Typography variant="h6" style={{fontWeight: 'bold'}}>Hello!</Typography>
                                        <Typography variant="body2" style={{color: 'grey'}}>Please sign up to
                                            continue</Typography>
                                    </Grid>
                                    {errorMessage && <Typography variant="caption" color="secondary">{errorMessage}</Typography>}
                                    <Grid item container justify="space-between" lg={10} align="center">
                                        <Grid item lg={5} style={{marginBottom: 10}}>
                                            <Field as={TextField} onKeyDown={isLetter} fullWidth={true}
                                                   label="First name *"
                                                   name="firstName"/>
                                            {errors.firstName && touched.firstName ? (
                                                <Typography variant="caption"
                                                            color="secondary">{errors.firstName}</Typography>
                                            ) : null}
                                        </Grid>
                                        <Grid item lg={5} style={{marginBottom: 10}}>
                                            <Field as={TextField} onKeyDown={isLetter} fullWidth={true} name="lastName"
                                                   label="Last name *"/>
                                            {errors.lastName && touched.lastName ? (
                                                <Typography variant="caption"
                                                            color="secondary">{errors.lastName}</Typography>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                    <Grid item lg={10} style={{marginBottom: 10}} align="center">
                                        <Field as={TextField} fullWidth={true} label="E-mail *"
                                               type="email" name="email"/>
                                        {errors.email && touched.email ? (
                                            <Typography variant="caption"
                                                        color="secondary">{errors.email}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10} style={{marginBottom: 10}} align="center">
                                        <Field as={TextField} fullWidth={true}
                                               label="Confirm E-mail *"
                                               type="email" name="confirmEmail"/>
                                        {errors.confirmEmail && touched.confirmEmail ? (
                                            <Typography variant="caption"
                                                        color="secondary">{errors.confirmEmail}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10} style={{marginBottom: 10}} align="center">
                                        <Field as={TextField} fullWidth={true} label="Password *"
                                               type="password" name="password"/>
                                        {errors.password && touched.password ? (
                                            <Typography variant="caption"
                                                        color="secondary">{errors.password}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10} style={{marginBottom: 10}} align="center">
                                        <Field as={TextField} fullWidth={true}
                                               label="Confirm password *"
                                               type="password" name="confirmPassword"/>
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <Typography variant="caption"
                                                        color="secondary">{errors.confirmPassword}</Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item lg={10}>
                                        <LoadingButton
                                            disabled={(!(isValid && dirty) || loading)}
                                            fullWidth={true}
                                            style={{minHeight: 50}}
                                            type="submit"
                                            size="large"
                                            loading={loading}
                                            color="secondary"
                                            variant="contained"
                                        >
                                            Sign up
                                        </LoadingButton>
                                    </Grid>
                                    <Grid item lg={10} align="center">
                                        <h4>OR</h4>
                                    </Grid>
                                    {/*<Grid item lg={10} style={{marginBottom: 10}}>*/}
                                    {/*    <GoogleLoginButton/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item lg={10}>*/}
                                    {/*    <FacebookLoginButton/>*/}
                                    {/*</Grid>*/}
                                    <Grid item lg={10} align="center">
                                        <Typography variant="caption">
                                            Already have an account?
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
            )}
        </Formik>
    )
}

