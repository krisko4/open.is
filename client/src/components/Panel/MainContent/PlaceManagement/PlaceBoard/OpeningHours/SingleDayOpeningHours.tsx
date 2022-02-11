import { OpeningHoursCard } from "../../../../../reusable/OpeningHours/OpeningHoursCard"
import { OpeningHoursForm } from "../../../../../reusable/OpeningHours/OpeningHoursForm"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';

import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { Alert, FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import { FC, useState, useEffect, useRef } from "react";
import { getHours, isAfter } from "date-fns";

interface Props {
    // day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    day: string,
    openingHours: any,
    setOpeningHours: any

}

export const SingleDayOpeningHours: FC<Props> = ({ day, openingHours, setOpeningHours }) => {

    const { currentPlace } = useCurrentPlaceContext()
    const [startHour, setStartHour] = useState<any>()
    const [endHour, setEndHour] = useState<any>()
    const [areHoursValid, setHoursValid] = useState(true)
    const isNextDay = useRef(false)



    useEffect(() => {
        console.log(startHour)
        let valid
        if (!isAfter(new Date(endHour), new Date(startHour)) && getHours(new Date(endHour)) > 6) {
            valid = false
        } else {
            valid = true
        }
        setHoursValid(valid)
        const newOpeningHours = { ...openingHours }
        newOpeningHours[day].start = startHour
        newOpeningHours[day].valid = valid
        newOpeningHours[day].end = endHour
        setOpeningHours(newOpeningHours)
    }, [startHour, endHour])

    useEffect(() => {
        setStartHour(openingHours[day].start)
        setEndHour(openingHours[day].end)
    }, [day])


    return (
        <Grid container sx={{ flexGrow: 1 }} alignItems="center" justifyContent="space-evenly">
            {
                areHoursValid ||
                <Grid container lg={10}>
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
        </Grid>
    )
}