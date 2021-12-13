import { Button, Card, CardActions, CardContent, Grid, Slide, TextField, Typography } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import myAxios from "../../../../axios/axios";
import { usePageContext } from "../../../../contexts/PageContext";
import { usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { ImageUpload } from '../../../reusable/ImageUpload';
import { LoadingButton } from "../../../reusable/LoadingButton";
import { PasswordChange } from './PasswordChange';

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



export const MyAccount: FC = () => {

    const [loading, setLoading] = useState(false)
    const [passwordChangeOpen, setPasswordChangeOpen] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const [img, setImg] = useState<any>(localStorage.getItem('img'))
    const [imageFile, setImageFile] = useState<any>(null)



    const initialValues = {
        firstName: localStorage.fullName.split(' ')[0],
        lastName: localStorage.fullName.split(' ')[1],
        email: localStorage.email,
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
            const res = await myAxios.patch(`/users/${localStorage.getItem('uid')}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            res.data.user.img && localStorage.setItem('img', res.data.user.img)
            console.log(res.data)
            enqueueSnackbar('You have successfully changed your personal data', {
                variant: 'success'
            })
        } catch (err) {
            console.error(err)
            enqueueSnackbar('Oops, something went wrong', {
                variant: 'error'
            })
        } finally {
            setLoading(false)
        }
    }



    return (
        <Slide in={true} timeout={1000}>
            <Grid container item lg={10} alignItems="center" justify="center">
                <Grid item lg={7}>
                    <Card style={{ boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px', borderRadius: 15 }}>
                        <Formik initialValues={initialValues} validationSchema={AccountDetailsSchema} validateOnMount onSubmit={handleSubmit}>
                            {({ dirty, errors, isValid, values, setFieldValue }) => (

                                <Form>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Account settings
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Manage your personal data
                                        </Typography>
                                        <Grid container justify="space-evenly" alignItems="center">
                                            <Grid item lg={5} container direction="column">
                                                <Grid container alignItems="center" justify="space-between">
                                                    <Typography variant="overline">First name: </Typography>
                                                    <FastField as={TextField} error={errors.firstName} helperText={errors.firstName} variant="outlined" name="firstName" onKeyDown={isLetter} label="First name" />
                                                </Grid>
                                                <Grid container alignItems="center" justify="space-between" style={{ marginTop: 10 }}>
                                                    <Typography variant="overline">Last name: </Typography>
                                                    <FastField as={TextField} error={errors.lastName} helperText={errors.lastName} variant="outlined" name="lastName" onKeyDown={isLetter} label="Last name" />
                                                </Grid>
                                                <Grid container alignItems="center" justify="space-between" style={{ marginTop: 10 }}>
                                                    <Typography variant="overline">E-mail: </Typography>
                                                    <FastField as={TextField} error={errors.email} helperText={errors.email} variant="outlined" name="email" label="E-mail address" />
                                                </Grid>
                                                <Grid container alignItems="center" style={{ marginTop: 10 }}>
                                                    <Typography variant="overline">Password: </Typography>
                                                    <Button color="primary" onClick={() => setPasswordChangeOpen(true)} variant="outlined" style={{ marginLeft: 38 }}>Change</Button>
                                                    <PasswordChange errors={errors} setPasswordChangeOpen={setPasswordChangeOpen} passwordChangeOpen={passwordChangeOpen} />
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={5}>
                                                <ImageUpload setImageFile={setImageFile} img={img} setImg={setImg} />
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container justify="flex-end">
                                            <LoadingButton type="submit" loading={loading} disabled={(loading || !isValid || !dirty) && img === localStorage.getItem('img')} color="primary">Submit changes</LoadingButton>
                                        </Grid>
                                    </CardActions>
                                </Form>

                            )}
                        </Formik>


                    </Card>

                </Grid>
            </Grid >
        </Slide >

    )
}