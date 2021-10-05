import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import myAxios from "../../../axios/axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import { RootState, useAuthSelector } from "../../../store/selectors/AuthSelector";
import { LoadingButton } from "../../reusable/LoadingButton";

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const EmailConfirmation : FC = () => {

    const {confirmationOpen, setConfirmationOpen, setLoginOpen} = useAuthContext()
    const email = useSelector((state : RootState) => state.email)
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)

    const resendEmail = async (email : string) => {
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
                <Grid item lg={6} style={{textAlign: 'center'}}>
                    <Typography variant="h4">
                        Thank you!
                    </Typography>

                </Grid>
            </Grid>
            <Grid container style={{marginTop: 20}} justify="center">
                <Grid item lg={10} style={{textAlign: 'center'}}>
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