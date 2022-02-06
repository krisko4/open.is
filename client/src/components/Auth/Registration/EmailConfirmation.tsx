import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import React, { FC, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { resendConfirmationEmail } from "../../../requests/AuthRequests";
import { useEmailSelector } from '../../../store/selectors/EmailSelector';
import { useCustomSnackbar } from "../../../utils/snackbars";
import { LoadingButton } from "../../reusable/LoadingButton";

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const EmailConfirmation: FC = () => {

    const { confirmationOpen, setConfirmationOpen, setLoginOpen } = useAuthContext()
    const email = useEmailSelector()
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const [loading, setLoading] = useState(false)

    const resendEmail = async (email: string) => {
        setLoading(true)
        try {
            await resendConfirmationEmail(email)
             enqueueSuccessSnackbar('Confirmation e-mail sent successfully.')
        } catch (err) {
            console.error(err)
        } finally {
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
            <Grid container style={{ marginTop: 10 }} justify="center">
                <Grid item lg={6} style={{ textAlign: 'center' }}>
                    <Typography variant="h4">
                        Thank you!
                    </Typography>

                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }} justify="center">
                <Grid item lg={10} style={{ textAlign: 'center' }}>
                    <Typography>
                        Your account has been created, but is inactive. Activation message has been sent to your e-mail:<br /> <b>{email}</b><br />
                        To activate your account, please visit your e-mail. In case you've not received an e-mail, please press the button below.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20, marginBottom: 20 }} justify="center">
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
            <Grid container style={{ marginTop: 10 }}>
                <Grid item style={{ marginLeft: 5, marginBottom: 5 }}>
                    <Button variant="text" color="primary" onClick={() => { setConfirmationOpen(false); setLoginOpen(true) }}>
                        Return
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};