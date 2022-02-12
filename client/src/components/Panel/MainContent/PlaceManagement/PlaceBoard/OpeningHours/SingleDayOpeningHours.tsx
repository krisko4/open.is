import { OpeningHoursCard } from "../../../../../reusable/OpeningHours/OpeningHoursCard"
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import { OpeningHoursForm } from "../../../../../reusable/OpeningHours/OpeningHoursForm"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';

import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { Alert, Button, CardActions, FormControlLabel, FormGroup, Grid, IconButton, Switch, Tooltip, Typography } from "@mui/material";
import { FC, useState, useEffect, useRef } from "react";
import { getHours, isAfter } from "date-fns";

interface Props {
    // day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    day: string,
    openingHours: any,
    setOpeningHours: any

}

export const SingleDayOpeningHours: FC<Props> = ({ day, openingHours, setOpeningHours }) => {

    const [startHour, setStartHour] = useState<any>(openingHours[day].start)
    const [endHour, setEndHour] = useState<any>(openingHours[day].end)
    const [areHoursValid, setHoursValid] = useState(true)
    const [doorColor, setDoorColor] = useState<any>('error')

    const openPlace = () => {
        const newOpeningHours = { ...openingHours }
        newOpeningHours[day].open = true
        setOpeningHours(newOpeningHours)
        setDoorColor('error')
    }

    const closePlace = () => {
        const newOpeningHours = { ...openingHours }
        newOpeningHours[day].open = false
        setOpeningHours(newOpeningHours)
        setDoorColor('error')
    }

    useEffect(() => {
        if (openingHours[day].start !== startHour || openingHours[day].end !== endHour) {
            const valid = isAfter(new Date(endHour), new Date(startHour)) || getHours(new Date(endHour)) < 6
            setHoursValid(valid)
            const newOpeningHours = { ...openingHours }
            newOpeningHours[day].start = startHour
            newOpeningHours[day].valid = valid
            newOpeningHours[day].end = endHour
            setOpeningHours(newOpeningHours)
        }
    }, [startHour, endHour])

    useEffect(() => {
        setStartHour(openingHours[day].start)
        setEndHour(openingHours[day].end)
    }, [day])


    return (
        <Grid container direction="column">
            {openingHours[day].open &&
                <Grid container justifyContent="center" sx={{ mt: 1 }}>
                    <Grid item container justifyContent="flex-end" lg={10}>
                        <Button onClick={closePlace} variant="outlined" color="error">Close</Button>
                    </Grid>
                </Grid>
            }
            <Grid container sx={{ flexGrow: 1, mt: 3, mb: '10px' }} alignItems="center" justifyContent="space-evenly">
                {
                    openingHours[day].open ? <>
                        {
                            areHoursValid ||
                            <Grid container lg={10} sx={{ mb: 1 }}>
                                <Alert severity="error" variant="outlined" sx={{ flexGrow: 1 }}>
                                    The difference between opening and closing hour is invalid
                                </Alert>
                            </Grid>
                        }
                        <LocalizationProvider locale={frLocale} dateAdapter={AdapterDateFns}>
                            <StaticTimePicker
                                toolbarTitle="Opening hour"
                                displayStaticWrapperAs="mobile"
                                value={startHour}
                                onChange={(newValue) => {
                                    setStartHour(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <StaticTimePicker
                                toolbarTitle="Closing hour"
                                displayStaticWrapperAs="mobile"
                                value={endHour}
                                onChange={(newValue) => {
                                    setEndHour(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </>
                        :
                        <Grid container alignItems="center" direction="column">
                            <Tooltip title="Open" arrow placement="top" >
                                <IconButton onClick={() => openPlace()} onMouseEnter={() => setDoorColor('success')} onMouseLeave={() => setDoorColor('error')}>
                                    {doorColor === 'error' ?
                                        <DoorFrontIcon color={doorColor} sx={{ width: '200px', height: '200px' }}></DoorFrontIcon>
                                        :
                                        <MeetingRoomIcon color={doorColor} sx={{ width: '200px', height: '200px' }} />

                                    }
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h1">
                                CLOSED
                            </Typography>
                        </Grid>
                }

            </Grid>

        </Grid>
    )
}