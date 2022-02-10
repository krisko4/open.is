import { OpeningHoursCard } from "../../../../../reusable/OpeningHours/OpeningHoursCard"
import { OpeningHoursForm } from "../../../../../reusable/OpeningHours/OpeningHoursForm"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';

import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { Grid } from "@mui/material";
import { FC, useState , useEffect} from "react";

export const SingleDayOpeningHours: FC<any> = ({startHour, endHour, setStartHour, setEndHour}) => {

    const { currentPlace } = useCurrentPlaceContext()

    useEffect(() => {
        console.log(startHour)

    }, [startHour])

    return (
        <Grid container sx={{ flexGrow: 1 }} alignItems="center" justifyContent="space-evenly">
            <LocalizationProvider locale={frLocale} dateAdapter={AdapterDateFns}>
                <StaticTimePicker
                    toolbarTitle="Opening hour"
                    displayStaticWrapperAs="mobile"
                    value={startHour}
                    onChange={(newValue) => {
                        console.log(newValue)
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