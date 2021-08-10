import React, {useContext, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import {AuthContext} from "../../../contexts/AuthContext";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {LoadingButton} from "../../LoadingButton/LoadingButton";
import Button from "@material-ui/core/Button";
import myAxios from "../../../axios/axios";
import {useSnackbar} from "notistack";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export const EmailConfirmation = () => {

    const {confirmationOpen, setConfirmationOpen, setLoginOpen, email} = useContext(AuthContext)
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)

    const resendEmail = async (email) => {
        setLoading(true)
        try{
            await myAxios.post('/registration/resend-email', {
                email: email
            })
            enqueueSnackbar('Confirmation e-mail sent successfully.', {
                variant: 'success'
            })
        }catch(err){
            console.error(err)
        }finally{
            setLoading(false)
        }

    }

    return (
        <Dialog
            open={confirmationOpen}
            keepMounted
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth={'xs'}
        >
            <Grid container style={{marginTop: 10}} justify="center">
                <Grid item lg={6} align="center">
                    <Typography variant="h4">
                        Thank you!
                    </Typography>

                </Grid>
            </Grid>
            <Grid container style={{marginTop: 20}} justify="center">
                <Grid item lg={10} align="center">
                    <Typography>
                        Your account has been created, but is inactive. Activation message has been sent to your e-mail:<br/> <b>{email}</b><br/>
                        To activate your account, please visit your e-mail. In case you've not received an e-mail, please press the button below.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: 20, marginBottom: 20}} justify="center">
                <LoadingButton
                variant="contained"
                color="primary"
                loading={loading}
                disabled={loading}
                onClick={() => resendEmail(email)}
                >
                    Resend confirmation e-mail
                </LoadingButton>
            </Grid>
            <Grid container justify="center">
                <Typography>
                    Once confirmed, your account will be available to use.
                </Typography>
            </Grid>
            <Grid container style={{marginTop: 10}}>
                <Grid item style={{marginLeft: 5, marginBottom: 5}}>
                    <Button variant="text" color="primary" onClick={() => {setConfirmationOpen(false); setLoginOpen(true)}}>
                        Return
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};