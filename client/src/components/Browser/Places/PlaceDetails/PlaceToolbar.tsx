import { KeyboardReturn } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import SettingsIcon from '@mui/icons-material/Settings';
import { Toolbar, IconButton, Grid, Button, Tooltip } from "@mui/material"
import { FC, useState } from "react"
import { useCurrentPlaceSelector, setSubscription } from "redux-toolkit/slices/currentPlaceSlice"
import { removeSubscription } from "requests/SubscriptionRequests"
import { useMapContext } from "contexts/MapContext/MapContext";
import { useAppDispatch } from "redux-toolkit/hooks";
import { useCustomSnackbar } from "utils/snackbars";
import { SubscribeDialog } from "./SubscribeDialog";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "contexts/LoginContext";

export const PlaceToolbar: FC = () => {

    // const { setPopupOpen, setPlaceCoords, setPopupIndex } = useMapContext()
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [value, setValue] = useState(0)
    const { userData } = useLoginContext()
    const [loading, setLoading] = useState(false)
    const { enqueueInfoSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const dispatch = useAppDispatch()
    const currentPlace = useCurrentPlaceSelector()
    const navigate = useNavigate()

    // const closePlaceDetails = () => {
    //     navigate(`/search`)
    //     setPopupOpen(false)
    //     setPlaceCoords(currentCoords => {
    //         return { ...currentCoords, mapZoom: 5 }
    //     })
    // }

    const unsubscribe = async () => {
        setLoading(true)
        try {
            await removeSubscription(currentPlace._id as string)
            enqueueInfoSnackbar('You have cancelled your subscription')
            dispatch(setSubscription(false))
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }

    }


    return (
        <Toolbar style={{ flexGrow: 1 }} disableGutters>
            {/* <IconButton onClick={() => closePlaceDetails()} color="error" size="large">
                <KeyboardReturn />
            </IconButton> */}
            <Grid container justifyContent="flex-end" style={{ paddingRight: 20 }} item>
                {
                    currentPlace.isUserOwner &&
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        startIcon={<SettingsIcon />}
                        onClick={() => navigate(`/panel/management/${currentPlace._id}/home`)}
                    >
                        Manage
                    </Button>
                }
                {currentPlace.isUserSubscriber ?
                    <Tooltip title={'Unsubscribe'} arrow >
                        <span>
                            <LoadingButton
                                loading={loading}
                                color="primary"
                                onClick={() => unsubscribe()}
                            >
                                Subscribed
                            </LoadingButton>
                        </span>
                    </Tooltip>
                    :
                    <Tooltip title={!userData.isLoggedIn ? 'Sign in to subscribe' : currentPlace.isUserOwner ? 'You cannot subscribe to your own place' : 'Subscribe'}>
                        <span>
                            <Button
                                disabled={!userData.isLoggedIn || currentPlace.isUserOwner}
                                variant="contained"
                                color="error"
                                onClick={() => setDialogOpen(true)}
                            >
                                Subscribe
                            </Button>
                        </span>
                    </Tooltip>
                }
            </Grid>
            <SubscribeDialog currentPlace={currentPlace} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
        </Toolbar>
    )
}