import SettingsIcon from "@mui/icons-material/Settings";
import {
    Button,
    Card,
    CardContent,
    Dialog, Grid, Slide,
    SlideProps, Typography
} from "@mui/material";
import Alert from '@mui/material/Alert';
import React, { FC, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { useNavigate } from "react-router-dom";
import { useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { Status, VisitProps } from "../../../../../../contexts/PlaceProps";
import { PlaceDetailsCard } from "../../../NewPlace/PlaceDetailsCard";
import { ActivityChart } from '../../Charts/ActivityChart';
import { PlaceSettings } from "../../PlaceSettings";
import { Destinations } from "../PlaceBoard";
import { OpinionsCard } from "./OpinionsCard";
import { PlaceStatus } from "./PlaceStatus";
import { TotalOpinions } from './TotalOpinions';
import { TotalVisits } from './TotalVisits';
import { VisitsToday } from './VisitsToday';


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);



export const PlaceData: FC = () => {

    const [loading, setLoading] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const currentPlace = useCurrentPlaceSelector()
    const [totalVisits, setTotalVisits] = useState(0)
    const navigate = useNavigate()

    const handleSettingsButtonClick = () => {
        navigate(`/panel/management/${currentPlace?._id}/${Destinations.SETTINGS}`)

    }



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
                            <PlaceStatus />
                            </Grid>
                            <Grid item lg={6}>
                                <Card style={{ background: '#2196f3' }}>
                                    <CardContent>
                                        <Typography variant="subtitle2" style={{ color: 'white' }}>
                                            Press the button below to manage your business
                                        </Typography>
                                        <Grid container style={{ marginTop: 20 }} justifyContent="space-between" alignItems="center">
                                            <Button onClick={handleSettingsButtonClick} variant="outlined" style={{ color: 'white', borderColor: 'white' }}>Settings</Button>
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
                                <OpinionsCard />
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
                                        <ActivityChart visits={currentPlace.visits as VisitProps[]} />
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