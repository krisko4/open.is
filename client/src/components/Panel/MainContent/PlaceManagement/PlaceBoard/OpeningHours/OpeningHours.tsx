import { Alert, AlertTitle, Card, CardContent, Grid, Slide, Tab, Tabs, Typography } from "@mui/material"
import { FC, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { OpeningHoursCard } from "../../../../../reusable/OpeningHours/OpeningHoursCard"
import { OpeningHoursForm } from "../../../../../reusable/OpeningHours/OpeningHoursForm"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';

import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { SingleDayOpeningHours } from "./SingleDayOpeningHours"
export const OpeningHours: FC = () => {

    const { currentPlace } = useCurrentPlaceContext()
    const [startHour, setStartHour] = useState<any>()
    const [endHour, setEndHour] = useState<any>()

    const [value, setValue] = useState(0);

    const { openingHours } = currentPlace

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
        setStartHour(schedule[newValue].start)
        setEndHour(schedule[newValue].end)
    }

    const schedule = openingHours ? [
        {
            start: openingHours.monday.startHour,
            end: openingHours.monday.endHour,
        },
        {
            start: openingHours.tuesday.startHour,
            end: openingHours.tuesday.endHour
        },
        {
            start: openingHours.wednesday.startHour,
            end: openingHours.wednesday.endHour
        },
        {
            start: openingHours.thursday.startHour,
            end: openingHours.thursday.endHour
        },
        {
            start: openingHours.friday.startHour,
            end: openingHours.friday.endHour
        },
        {
            start: openingHours.saturday.startHour,
            end: openingHours.saturday.endHour
        },
        {
            start: openingHours.sunday.startHour,
            end: openingHours.sunday.endHour
        },

    ] : [
        {
            start: '8:00',
            end: '16:00'
        },
        {
            start: '8:00',
            end: '16:00'
        },
        {
            start: '8:00',
            end: '16:00'
        },
        {
            start: '8:00',
            end: '16:00'
        },
        {
            start: '8:00',
            end: '16:00'
        },
        {
            start: '8:00',
            end: '16:00'
        },
        {
            start: '8:00',
            end: '16:00'
        },
    ]

    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'

    ]

    return (
        <Grid container sx={{ height: '100%' }} alignItems="center">
            <Grid container justifyContent="space-evenly">
                <Grid container item lg={11} sx={{mb: 5}}>
                    <Alert variant="filled" sx={{flexGrow: 1}} severity="error">
                        SIemanko
                    </Alert>
                </Grid>
                <Grid item lg={6}>
                    <Card sx={{ height: '100%' }}>
                        <Grid container direction="column" sx={{ height: '100%' }}>
                            <Tabs value={value} onChange={handleChange} variant="fullWidth" sx={{ width: '100%' }}>
                                {days.map((day) =>
                                    <Tab label={day} key={day} />
                                )}
                            </Tabs>
                            <SingleDayOpeningHours
                                startHour={startHour}
                                setStartHour={setStartHour}
                                endHour={endHour}
                                setEndHour={setEndHour}
                            />
                        </Grid>
                    </Card>
                </Grid>
                <Grid item lg={5}>
                    <Slide in={true} timeout={1000} direction="left">
                        <Card>
                            <CardContent>
                                <Typography variant="h2" style={{ color: 'white' }}>Opening hours management</Typography>
                                <Grid style={{ marginTop: 10 }} item lg={11}>
                                    <Typography variant="body1">
                                        This is a crucial section of your business.
                                        Our great mission is to encourage you to update the opening state of your place
                                        as frequently as it is possible. Your commitment will shortly result with benefits:
                                    </Typography>
                                </Grid>
                                <Alert sx={{ mt: 3, mb: 1 }} variant="outlined" >
                                    <AlertTitle>Information</AlertTitle>
                                    Your visitors will stay up to date with your opening hours
                                </Alert>
                                <Alert sx={{ mb: 1 }} variant="outlined" >
                                    <AlertTitle>Reliability</AlertTitle>
                                    Your business will be considered as reliable
                                </Alert>
                                <Alert variant="outlined" >
                                    <AlertTitle>Growth</AlertTitle>
                                    Your customer basis will grow
                                </Alert>
                            </CardContent>
                        </Card>
                    </Slide>

                </Grid>
            </Grid>
        </Grid>
    )
}