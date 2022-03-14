import { KeyboardReturn } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import SettingsIcon from '@mui/icons-material/Settings';
import { Toolbar, IconButton, Grid, Button, Tooltip } from "@mui/material"
import { FC, useEffect, useState } from "react"
import {  setSubscription } from "redux-toolkit/slices/currentPlaceSlice"
import { removeSubscription } from "requests/SubscriptionRequests"
import { useAppDispatch } from "redux-toolkit/hooks";
import { useCustomSnackbar } from "utils/snackbars";
import { SubscribeDialog } from "./SubscribeDialog";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginContext } from "contexts/LoginContext";
import { CurrentPlaceProps } from "contexts/PlaceProps";
import {  setMapCoords, closePopup } from "redux-toolkit/slices/mapSlice";

interface Props {
    place: CurrentPlaceProps
}

export const PlaceToolbar: FC<Props> = ({ place }) => {

    const [isDialogOpen, setDialogOpen] = useState(false)
    const { userData } = useLoginContext()
    const [loading, setLoading] = useState(false)
    const { enqueueInfoSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { placeId, locationId } = useParams()

    useEffect(() => {
        dispatch(setMapCoords({
            lat: place.lat,
            lng: place.lng,
            zoom: 15
        }))
    }, [place])

    const closePlaceDetails = () => {
        dispatch(closePopup())
        navigate(`/search`)
    }

    const unsubscribe = async () => {
        setLoading(true)
        try {
            await removeSubscription(placeId as string)
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
            <IconButton onClick={() => closePlaceDetails()} color="error" size="large">
                <KeyboardReturn />
            </IconButton>
            <Grid container justifyContent="flex-end" style={{ paddingRight: 20 }} item>
                {
                    place.isUserOwner &&
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                        startIcon={<SettingsIcon />}
                        onClick={() => navigate(`/panel/management/${placeId}/${locationId}/home`)}
                    >
                        Manage
                    </Button>
                }
                {place.isUserSubscriber ?
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
                    <Tooltip title={!userData.isLoggedIn ? 'Sign in to subscribe' : place.isUserOwner ? 'You cannot subscribe to your own place' : 'Subscribe'}>
                        <span>
                            <Button
                                disabled={!userData.isLoggedIn || place.isUserOwner}
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
            <SubscribeDialog currentPlace={place} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
        </Toolbar>
    )
}