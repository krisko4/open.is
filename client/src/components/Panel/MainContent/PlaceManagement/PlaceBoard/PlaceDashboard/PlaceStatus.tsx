import { LoadingButton } from "@mui/lab"
import { Card, CardContent, Typography, Grid } from "@mui/material"
import { useState, FC } from "react"
import { Status } from "../../../../../../contexts/PlaceProps"
import { setPlaceStatus } from "../../../../../../requests/PlaceRequests"
import { setPlaces } from "../../../../../../store/actions/setPlaces"
import { convertToRawPlaceData } from "../../../../../../utils/place_data_utils"
import { useCustomSnackbar } from "../../../../../../utils/snackbars"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import { useAppDispatch } from "redux-toolkit/hooks"
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice"
import {setStatus, useCurrentPlaceSelector, useStatusSelector } from "redux-toolkit/slices/currentPlaceSlice"

export const PlaceStatus: FC = () => {

    const [loading, setLoading] = useState(false)
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const dispatch = useAppDispatch()
    const places = usePlacesSelector()
    const currentPlace = useCurrentPlaceSelector()


    const changeStatus = async (status: Status) => {
        setLoading(true)
        try {
            await setPlaceStatus(currentPlace._id as string, status)
            if (currentPlace) {
                let oldPlace = places.find(place => place.locations.find(location => location._id = currentPlace._id))
                if (oldPlace) {
                    const location = oldPlace.locations.find(loc => loc._id === currentPlace._id)
                    if (location) {
                        dispatch(setStatus(status))
                        if (status === Status.OPEN) {
                            enqueueSuccessSnackbar('Your place is now open')
                            return
                        }
                        enqueueSuccessSnackbar('Your place is now closed')
                    }
                }
            }
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }
    }
    return (

        <Card style={{ background: '#2196f3' }}>
            <CardContent>
                <Typography variant="subtitle2" style={{ color: 'white' }}>
                    Press the button below to <span>{currentPlace.status === Status.OPEN ? 'close' : 'open'}</span> your business
                </Typography>
                <Grid container style={{ marginTop: 20 }} justifyContent="space-between" alignItems="center">
                    {currentPlace.status === Status.OPEN ? <>
                        <LoadingButton
                            color="primary"
                            disabled={loading}
                            loading={loading}
                            variant="outlined"
                            style={{ color: 'white', borderColor: 'white' }}
                            onClick={() => changeStatus(Status.CLOSED)}
                        >Close</LoadingButton>
                        <NoMeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                    </>
                        : <>
                            <LoadingButton
                                color="primary"
                                disabled={loading}
                                loading={loading}
                                variant="outlined"
                                style={{ color: 'white', borderColor: 'white' }}
                                onClick={() => changeStatus(Status.OPEN)}>Open</LoadingButton>
                            <MeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                        </>
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}