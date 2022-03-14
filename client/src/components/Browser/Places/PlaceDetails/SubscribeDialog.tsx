import { CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, Typography } from "@mui/material";
import { Alert } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import { useCurrentPlaceSelector, setSubscription } from "redux-toolkit/slices/currentPlaceSlice";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PlaceProps";
import { subscribeToPlace } from "../../../../requests/SubscriptionRequests";
import { useCustomSnackbar } from "../../../../utils/snackbars";
import DialogTransition from "../../../reusable/DialogTransition";
import { LoadingButton } from "../../../reusable/LoadingButton";

interface Props {
    isDialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentPlace?: CurrentPlaceProps
}

const useStyles = makeStyles({
    dialog: {
        background: '#2C2C2C'
    },
    title: {
        color: 'white'
    },
    content: {
        color: 'grey'
    },
    alert: {
        flexGrow: 1,
        marginTop: 10,
        '&& .MuiAlert-message': {
            color: 'white'
        }
    }
})

export const SubscribeDialog: FC<Props> = ({ isDialogOpen, setDialogOpen }) => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const currentPlace = useCurrentPlaceSelector()


    const addSubscription = async () => {
        setLoading(true)
        try {
            await subscribeToPlace(currentPlace?._id as string)
            enqueueSuccessSnackbar('You have subscribed to a new place')
            dispatch(setSubscription(true))
            setDialogOpen(false)
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }
    }


    return (
        <Dialog
            TransitionComponent={DialogTransition}
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            PaperProps={
                {
                    classes: { root: classes.dialog }
                }
            }
        >
            <DialogTitle>
                <Grid container direction="column">
                    <Typography variant="h6" className={classes.title}>
                        Subscribe to a new place
                    </Typography>
                    <Typography variant="caption" className={classes.content}>
                        Set a subscription and benefit from regular visits
                    </Typography>
                </Grid>
            </DialogTitle>
            <Grid container justifyContent="center">
                <Typography variant="h6" className={classes.title}>
                    Why should I subscribe?
                </Typography>
                <CardMedia style={{ height: 300, marginTop: 20 }} component="img" src="https://cdn.dribbble.com/users/7709373/screenshots/15601987/media/2866e963d360e43b8ceb08eedbc3b673.gif">

                </CardMedia>
            </Grid>
            <DialogContent>
                <Typography variant="h6" className={classes.title}>
                    You will:
                </Typography>
                <Grid container justifyContent="center" >
                    <Alert variant="outlined" className={classes.alert}>
                        receive notifications whenever a new event or important information is added
                    </Alert>
                    <Alert variant="outlined" className={classes.alert}>
                        always be informed about bargains and special offers
                    </Alert>
                    <Alert variant="outlined" className={classes.alert}>
                        receive personal coupons and promo codes
                    </Alert>
                </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton loading={loading} disabled={loading} onClick={() => addSubscription()} color="primary">
                    Subscribe
                </LoadingButton>

            </DialogActions>
        </Dialog>
    );
}