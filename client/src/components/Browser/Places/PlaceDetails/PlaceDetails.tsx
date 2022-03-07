import { KeyboardReturn } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Divider, Toolbar, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setCurrentPlace, setSubscription, useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { useLoginContext } from "../../../../contexts/LoginContext";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PlaceProps";
import { removeSubscription } from "../../../../requests/SubscriptionRequests";
import { addNewVisit } from "../../../../requests/VisitRequests";
import { useCustomSnackbar } from "../../../../utils/snackbars";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { ImagesCarousel } from './ImageCarousel/ImagesCarouselMemo';
import MainContent from "./MainContent";
import { SubscribeDialog } from './SubscribeDialog';



const addVisit = async (place: CurrentPlaceProps) => {
    try {
        const response = await addNewVisit(place._id as string)
        return response.data
    } catch (err) {
        console.log(err)
    }

}

interface Props {
    popupIndex: number,
    place : CurrentPlaceProps
}



export const PlaceDetails: FC<Props> = ({ popupIndex, place }) => {

    const { setPopupOpen, setPlaceCoords, setPlaceCardClicked, setPopupIndex } = useMapContext()
    const { userData } = useLoginContext()
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false)
    const { enqueueInfoSnackbar, enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const dispatch = useAppDispatch()
    const currentPlace = useCurrentPlaceSelector()


    useEffect(() => {
        setPlaceCardClicked(true)
        dispatch(setCurrentPlace(place))
        addVisit(currentPlace)
        setPopupOpen(true)
        setPopupIndex(popupIndex)
        setPlaceCoords({
            lat: currentPlace.lat,
            lng: currentPlace.lng,
            mapZoom: 18
        })
    }, [])


    const navigate = useNavigate()
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const MyTab = (props: any) => {
        const { label, ...rest } = props
        return <Tab {...rest} label={label} disableRipple />
    }
    const tabContents = [
        // <News />,
        // <OpeningHours />,
        // <Opinions
        // />
    ]

    const closePlaceDetails = () => {
        navigate(`/search`)
        setPlaceCardClicked(false)
        setPopupOpen(false)
        setPlaceCoords(currentCoords => {
            return { ...currentCoords, mapZoom: 5 }
        })
    }


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
        <Grid container>
            <Paper sx={{ flexGrow: 1 }}>
                <SubscribeDialog currentPlace={currentPlace} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
                <Grid container item>
                    <Paper sx={{ flexGrow: 1 }}>
                        <Toolbar style={{ flexGrow: 1 }} disableGutters>
                            <IconButton onClick={() => closePlaceDetails()} color="error" size="large">
                                <KeyboardReturn />
                            </IconButton>
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
                        </Toolbar>

                    </Paper>
                </Grid>
                <Grid container>
                    <ImagesCarousel images={currentPlace.images} address={currentPlace.address} />
                </Grid>
                <MainContent place={currentPlace} />
                <Grid container style={{ marginTop: 10 }}>
                    <Divider style={{ width: '100%' }} />
                    <Paper square style={{ width: '100%', background: 'inherit' }}>
                        <Tabs
                            value={value}
                            variant="fullWidth"
                            onChange={handleChange}
                        >
                            <MyTab label="News" />
                            <MyTab label="Opening hours" />
                            <MyTab label="Opinions" />
                        </Tabs>
                    </Paper>
                    <Grid container item>
                        <Grid container style={{ height: 500 }}>
                            {/* {tabContents[value]} */}
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>

        </Grid>
    );
}
