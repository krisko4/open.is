import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import SettingsIcon from "@mui/icons-material/Settings";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    Fade,
    Grid, Rating, Slide,
    SlideProps, Typography
} from "@mui/material";
import Alert from '@mui/material/Alert';
import React, { FC, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { Status } from "../../../../../../contexts/PlaceProps";
import { setPlaceStatus } from "../../../../../../requests/PlaceRequests";
import { setPlaces } from "../../../../../../store/actions/setPlaces";
import { usePlacesSelector } from "../../../../../../store/selectors/PlacesSelector";
import { convertToRawPlaceData } from "../../../../../../utils/place_data_utils";
import { useCustomSnackbar } from "../../../../../../utils/snackbars";
import { LoadingButton } from "../../../../../reusable/LoadingButton";
import { PlaceDetailsCard } from "../../../NewPlace/PlaceDetailsCard";
import { ActivityChart } from '../../Charts/ActivityChart';
import { RatingChart } from '../../Charts/RatingChart';
import { PlaceSettings } from "../../PlaceSettings";
import { TotalOpinions } from './TotalOpinions';
import { TotalVisits } from './TotalVisits';
import { VisitsToday } from './VisitsToday';


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);



export const PlaceData: FC = () => {

    const [loading, setLoading] = useState(false)
    const { currentPlace, } = useCurrentPlaceContext()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [totalVisits, setTotalVisits] = useState(0)


    const setStatus = async (status: Status) => {
        // setLoading(true)
        // try {
        //     await setPlaceStatus(currentPlace._id as string, status)
        //     if (currentPlace) {
        //         let oldPlace = places.find(place => place.locations.find(location => location._id = currentPlace._id))
        //         let updatedPlace = { ...currentPlace }
        //         updatedPlace.status = status
        //         const rawPlaceData = convertToRawPlaceData(updatedPlace)
        //         if (oldPlace) places[places.indexOf(oldPlace)] = rawPlaceData
        //         dispatch(setPlaces([...places]))
        //         setCurrentPlace(updatedPlace)
        //     }
        //     if (status === Status.OPEN) {
        //         enqueueSuccessSnackbar('Your place is now open')
        //         return
        //     }
        //     enqueueSuccessSnackbar('Your place is now closed')
        // } catch (err) {
        //     enqueueErrorSnackbar()
        // } finally {
        //     setLoading(false)
        // }
    }

    // useEffect(() => {
    //     //@ts-ignore
    //     setCurrentPlace(location.state.place)
    // }, [])



    return <>
        <Scrollbars>
            <Grid container direction="column">
                <Grid container sx={{ pt: '30px', pb: '30px', pl: '30px', pr: '30px' }}>
                    <Grid container justifyContent="space-around" spacing={2}>
                        <Grid item lg={4}>
                            <TotalVisits totalVisits={totalVisits} setTotalVisits={setTotalVisits} />
                        </Grid>
                        <Grid item lg={4}>
                            <VisitsToday totalVisits={totalVisits} />
                        </Grid>
                        <Grid item lg={4}>
                            <TotalOpinions />
                        </Grid>
                        <Grid item lg={12} sx={{mb: 2}}>
                            {currentPlace.status === Status.CLOSED && <Alert variant="filled" severity="error">Your place is now closed.</Alert>}
                            {!currentPlace.openingHours ?
                                <Alert severity="warning" variant="filled" style={{ marginTop: 10 }}>Your place is not visible in the browser. Please set opening hours of your business first.</Alert>
                                :
                                <Alert severity="success" variant="filled" style={{ marginTop: 10 }}>Your place is visible in the browser.</Alert>
                            }
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" lg={5} style={{ paddingRight: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <Card style={{ background: '#2196f3' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" style={{ color: 'white' }}>
                                            Press the button below to <span>{currentPlace.status === Status.OPEN ? 'close' : 'open'}</span> your business
                                        </Typography>
                                        <Grid container style={{ marginTop: 20 }} justifyContent="space-between" alignItems="center">
                                            {currentPlace.status === Status.OPEN ? <>
                                                <LoadingButton color="primary" disabled={loading} loading={loading} variant="outlined" style={{ color: 'white', borderColor: 'white' }} onClick={() => setStatus(Status.CLOSED)} >Close</LoadingButton>
                                                <NoMeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                                            </>
                                                : <>
                                                    <LoadingButton color="primary" disabled={loading} loading={loading} variant="outlined" style={{ color: 'white', borderColor: 'white' }} onClick={() => setStatus(Status.OPEN)}>Open</LoadingButton>
                                                    <MeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                                                </>
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={6}>
                                <Card style={{ background: '#2196f3' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" style={{ color: 'white' }}>
                                            Press the button below to manage your business
                                        </Typography>
                                        <Grid container style={{ marginTop: 20 }} justifyContent="space-between" alignItems="center">
                                            <Button onClick={() => setSettingsOpen(true)} variant="outlined" style={{ color: 'white', borderColor: 'white' }}>Settings</Button>
                                            <SettingsIcon style={{ color: 'white', width: 60, height: 60 }} />
                                        </Grid>
                                        <Dialog
                                            open={settingsOpen}
                                            TransitionComponent={Transition}
                                            fullScreen
                                        >
                                            <PlaceSettings open={settingsOpen} setOpen={setSettingsOpen} />
                                        </Dialog>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item container>
                                <Fade in={true} timeout={2000}>
                                    <Card sx={{ flexGrow: 1 }} elevation={3}>
                                        <CardContent>
                                            <Typography variant="h5">
                                                Rating
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                                The following chart represents the rating of your place
                                            </Typography>
                                            <Grid container justifyContent="center" alignItems="center">
                                                <Rating
                                                    size="large"
                                                    name="simple-controlled"
                                                    readOnly
                                                    value={currentPlace.averageNote?.average || 0}
                                                    style={{ marginTop: 10 }}
                                                />
                                                <RatingChart />
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Fade>
                            </Grid>
                            <Grid item container>
                                <Card elevation={3} sx={{ flexGrow: 1 }}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Activity
                                        </Typography>
                                        <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                            The following chart represents historical data of user activity in your place
                                        </Typography>
                                        <ActivityChart visits={currentPlace.visits} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={7}>
                        <PlaceDetailsCard  />
                    </Grid>
                </Grid>
            </Grid>
        </Scrollbars>
    </>;
}