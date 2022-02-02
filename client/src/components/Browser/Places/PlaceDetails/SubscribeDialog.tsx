import { DialogTitle, DialogContent, DialogActions, Dialog, SlideProps, Slide, Grid, Typography, CardMedia, Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles"
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react"
import { authAxios } from "../../../../axios/axios";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { LoadingButton } from "../../../reusable/LoadingButton";

interface Props {
    isDialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentPlace: CurrentPlaceProps
}

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);
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

export const SubscribeDialog: FC<Props> = ({ currentPlace, isDialogOpen, setDialogOpen }) => {
    const classes = useStyles()
    const {setCurrentPlace} = useMapContext()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)


    const setSubscription = async () => {
        setLoading(true)
        try {
            const res = await authAxios.patch(`/users/${localStorage.getItem('uid')}/subscriptions`, {
                locationId: currentPlace._id
            })
            enqueueSnackbar('You have subscribed to a new place', {
                variant: 'success'
            })
            const newCurrentPlace = {...currentPlace}
            newCurrentPlace.isUserSubscriber = true
            setCurrentPlace(newCurrentPlace)
            setDialogOpen(false)

        } catch (err) {
            enqueueSnackbar('Oops, something went wrong', {
                variant: 'error'
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <Dialog
            TransitionComponent={Transition}
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
            <Grid container justify="center">
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
                <Grid container justify="center" >
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
                <LoadingButton loading={loading} disabled={loading} onClick={() => setSubscription()} color="primary">
                    Subscribe
                </LoadingButton>

            </DialogActions>
        </Dialog>
    )
}