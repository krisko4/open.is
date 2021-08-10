import {Field, Form, Formik} from "formik";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import {GoogleLoginButton} from "../GoogleLoginButton";
import {FacebookLoginButton} from "../FacebookLoginButton";
import * as React from "react";
import * as Yup from "yup";
import {useContext, useState} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {LoadingButton} from "../../LoadingButton/LoadingButton";
import {authAxios} from "../../../axios/axios";
import {useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import {setEmail} from "../../../store/actions/setEmail";
import {login} from "../../../store/actions/login";




const loginFields = {
    email: '',
    password: ''
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string()
        .required()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
})
export const LoginForm = () => {


    const {setLoginOpen, setRegistrationOpen} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useDispatch()

    const signIn = async (userData) => {
        setLoading(true)
        try{
            await authAxios.post('/login', {...userData}, {withCredentials: true})
            setLoginOpen(false)
            dispatch(setEmail(userData.email))
            dispatch(login())
            enqueueSnackbar('You have signed in.', {
                variant: 'success'
            })
        } catch(err){
            console.log(err)
        }finally {
            setLoading(false)
        }
    }

    return (
        <Formik
            initialValues={loginFields}
            validationSchema={LoginSchema}
            onSubmit={(values => signIn(values))}
        >
            {({dirty, isValid}) => (
                <Form>
                    <DialogContent>
                        <Card elevation={6} style={{marginBottom: 10}}>
                            <CardContent>
                                <Grid container justify="center" style={{marginBottom: 10}}>
                                    <Grid item lg={10} style={{marginBottom: 10}}>
                                        <Typography variant="h6" style={{fontWeight: 'bold'}}>Hello!</Typography>
                                        <Typography variant="body2" style={{color: 'grey'}}>Please sign in to continue</Typography>
                                    </Grid>
                                    <Grid item lg={10} align="center">
                                        <Field as={TextField} name="email" type="email" fullWidth={true}  style={{marginBottom: 10}}
                                               label="E-mail"/>
                                    </Grid>
                                    <Grid item lg={10} align="center" style={{marginBottom: 10}}>
                                        <Field as={TextField} name="password" type="password" fullWidth={true}
                                               label="Password"/>
                                        <Link variant="caption">I forgot my password</Link>
                                    </Grid>
                                    <Grid item lg={10} align="center">
                                        <LoadingButton
                                            loading={loading}
                                            fullWidth={true}
                                            style={{minHeight: 50}}
                                            type="submit"
                                            color="secondary"
                                            variant="contained"
                                            disabled={(!(isValid && dirty) || loading) }
                                        >
                                            Sign in
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