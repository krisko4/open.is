import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { authAxios } from "../../../axios/axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import { login } from "../../../store/actions/login";
import { LoadingButton } from "../../reusable/LoadingButton";
import {setEmail} from "../../../store/actions/setEmail"

interface UserData {
    email: string,
    password: string
}

const loginFields = {
    email: '',
    password: ''
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
        .required()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
})
export const LoginForm = () => {


    const { setLoginOpen, setConfirmationOpen, setRegistrationOpen } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    const signIn = async (userData: UserData) => {
        setErrorMessage('')
        setLoading(true)
        dispatch(setEmail(userData.email))
        try {
            const response = await authAxios.post('/login', { ...userData }, { withCredentials: true })
            localStorage.setItem('uid', response.data.uid)
            localStorage.setItem('fullName', response.data.fullName)
            setLoginOpen(false)
            dispatch(login())
            enqueueSnackbar('You have signed in.', {
                variant: 'success'
            })
        } catch (err: any) {
            console.log(err)
            console.log(err.response.data)
            if (err.response.data === `User is inactive`) {
                setLoginOpen(false)
                setConfirmationOpen(true)
                return
            }
            setErrorMessage('Invalid credentials')

        } finally {
            setLoading(false)
        }
    }

    return (
        <Formik
            initialValues={loginFields}
            validationSchema={LoginSchema}
            onSubmit={(values => signIn(values))}
        >
            {({ dirty, isValid }) => (
                <Form>
                    <DialogContent>
                        <Card elevation={6} style={{ marginBottom: 10 }}>
                            <CardContent>
                                <Grid container justify="center" style={{ marginBottom: 10 }}>
                                    <Grid item lg={10} style={{ marginBottom: 10 }}>
                                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Hello!</Typography>
                                        <Typography variant="body2" style={{ color: 'grey' }}>Please sign in to continue</Typography>
                                        {errorMessage && <Typography variant="body2" style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>{errorMessage}</Typography>}
                                    </Grid>
                                    <Grid item lg={10} style={{ textAlign: 'center' }}>
                                        <Field as={TextField} name="email" type="email" fullWidth={true} style={{ marginBottom: 10 }}
                                            label="E-mail" />
                                    </Grid>
                                    <Grid item lg={10} style={{ marginBottom: 10, textAlign: 'center' }}>
                                        <Field as={TextField} name="password" type="password" fullWidth={true}
                                            label="Password" />
                                        <Link variant="caption">I forgot my password</Link>
                                    </Grid>
                                    <Grid item lg={10} style={{ textAlign: 'center' }}>
                                        <LoadingButton
                                            loading={loading}
                                            fullWidth={true}

                                            type="submit"
                                            color="secondary"
                                            variant="contained"
                                            disabled={(!(isValid && dirty) || loading)}
                                        >
                                            Sign in
                                        </LoadingButton>
                                    </Grid>
                                    {/* <Grid item lg={10} style={{ textAlign: 'center' }}>
                                        <h4>OR</h4>
                                    </Grid> */}
                                    {/*<Grid item lg={10} style={{marginBottom: 10}}>*/}
                                    {/*    <GoogleLoginButton/>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item lg={10}>*/}
                                    {/*    <FacebookLoginButton/>*/}
                                    {/*</Grid>*/}
                                    <Grid item lg={10} style={{ textAlign: 'center' }}>
                                        <Typography variant="caption">Don't have an account? <Link onClick={() => {
                                            setRegistrationOpen(true);
                                            setLoginOpen(false)
                                        }}>Click here to sign up</Link></Typography>
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