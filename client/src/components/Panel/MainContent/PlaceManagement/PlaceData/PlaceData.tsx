import { Button, Card, CardContent, Dialog, Fade, Grid, makeStyles, Slide, SlideProps, Typography } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';
import SettingsIcon from "@material-ui/icons/Settings";
import { Rating } from "@material-ui/lab";
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import myAxios from "../../../../../axios/axios";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { Status } from "../../../../../contexts/PanelContexts/PanelContext";
import { setPlaces } from "../../../../../store/actions/setPlaces";
import { usePlacesSelector } from "../../../../../store/selectors/PlacesSelector";
import { LoadingButton } from "../../../../reusable/LoadingButton";
import { PlaceDetailsCard } from "../../NewPlace/PlaceDetailsCard";
import { ActivityChart } from '../Charts/ActivityChart';
import { RatingChart } from '../Charts/RatingChart';
import { PlaceSettings } from "../PlaceSettings";
import { TotalOpinions } from './TotalOpinions';
import { TotalVisits } from './TotalVisits';
import { VisitsToday } from './VisitsToday';


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles({
    shadowCard: {
        // boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
        //    boxShadow:  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        borderRadius: 15,
        flexGrow: 1
    }
})

export const PlaceData: FC = () => {

    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const places = usePlacesSelector()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [totalVisits, setTotalVisits] = useState(0)
    const dispatch = useDispatch()


    const setPlaceStatus = async (status: Status) => {
        setLoading(true)
        try {
            await myAxios.patch(`/places/${currentPlace._id}/status`, {
                status: status
            })
            if (currentPlace) {
                const oldPlace = places.find(place => place._id === currentPlace._id)
                console.log(oldPlace)
                const updatedPlace = { ...currentPlace }
                updatedPlace.status = status
                if(oldPlace) places[places.indexOf(oldPlace)] = updatedPlace
                dispatch(setPlaces([...places]))
                setCurrentPlace(updatedPlace)
            }
            if (status === Status.OPEN) {
                enqueueSnackbar('Your place is now open', {
                    variant: 'success'
                })
                return
            }
            enqueueSnackbar('Your place is now closed', {
                variant: 'success'
            })
        } catch (err) {
            enqueueSnackbar('Oops, something went wrong', {
                variant: 'error'
            })
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Grid container style={{ height: '100%', paddingTop: 40, paddingLeft: 40, paddingRight: 40 }} justify="center">
                <Grid container justify="space-around" spacing={2}>
                    <Grid item lg={4}>
                        <Fade in={true} timeout={2000}>
                            <TotalVisits totalVisits={totalVisits} setTotalVisits={setTotalVisits} shadowCard={classes.shadowCard} />
                        </Fade>
                    </Grid>
                    <Grid item lg={4}>
                        <Fade in={true} timeout={2000}>
                            <VisitsToday totalVisits={totalVisits} shadowCard={classes.shadowCard} />
                        </Fade>
                    </Grid>
                    <Grid item lg={4}>
                        <TotalOpinions shadowCard={classes.shadowCard} />
                    </Grid>
                    <Grid item lg={12}>
                        {currentPlace.status === Status.CLOSED && <Alert variant="filled" severity="error">Your place is now closed.</Alert>}
                        {!currentPlace.openingHours ?
                            <Alert severity="warning" variant="filled" style={{ marginTop: 10 }}>Your place is not visible in the browser. Please set opening hours of your business first.</Alert>
                            :
                            <Alert severity="success" variant="filled" style={{ marginTop: 10 }}>Your place is visible in the browser.</Alert>
                        }
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: 20 }}>
                    <Grid item container direction="column" lg={5} style={{ paddingRight: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <Card className={classes.shadowCard} style={{ background: '#2196f3' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" style={{ color: 'white' }}>
                                            Press the button below to <span>{currentPlace.status === Status.OPEN ? 'close' : 'open'}</span> your business
                                        </Typography>
                                        <Grid container style={{ marginTop: 20 }} justify="space-between" alignItems="center">
                                            {currentPlace.status === Status.OPEN ? <>
                                                <LoadingButton disabled={loading} loading={loading} variant="outlined" onClick={() => setPlaceStatus(Status.CLOSED)} style={{ color: 'white', borderColor: 'white' }}>Close</LoadingButton>
                                                <NoMeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                                            </>
                                                : <>
                                                    <LoadingButton disabled={loading} loading={loading} variant="outlined" onClick={() => setPlaceStatus(Status.OPEN)} style={{ color: 'white', borderColor: 'white' }}>Open</LoadingButton>
                                                    <MeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                                                </>
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={6}>
                                <Card className={classes.shadowCard} style={{ background: '#2196f3' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" style={{ color: 'white' }}>
                                            Press the button below to manage your business
                                        </Typography>
                                        <Grid container style={{ marginTop: 20 }} justify="space-between" alignItems="center">
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
                                <Card className={classes.shadowCard} elevation={3}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Rating
                                        </Typography>
                                        <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                            The following chart represents the rating of your place
                                        </Typography>
                                        <Grid container justify="center" alignItems="center">
                                            <Rating
                                                size="large"
                                                name="simple-controlled"
                                                readOnly
                                                value={currentPlace.averageNote.average}
                                                style={{ marginTop: 10 }}
                                            />
                                            <RatingChart />
                                        </Grid>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item container>
                                <Card className={classes.shadowCard} elevation={3}>
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
                    <Grid style={{ marginBottom: 20 }} item lg={7}>
                        <PlaceDetailsCard />
                    </Grid>
                </Grid>

            </Grid>

        </>
    )
}