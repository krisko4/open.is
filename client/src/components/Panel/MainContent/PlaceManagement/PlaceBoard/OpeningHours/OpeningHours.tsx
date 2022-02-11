import { Alert, AlertTitle, Button, Card, CardActions, CardContent, Fade, FormControlLabel, FormGroup, Grid, Slide, Switch, Tab, Tabs, Toolbar, Tooltip, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { SingleDayOpeningHours } from "./SingleDayOpeningHours"

export const OpeningHours: FC = () => {

    const { setCurrentPlace, currentPlace } = useCurrentPlaceContext()

    const [value, setValue] = useState('monday');
    const [areHoursValid, setHoursValid] = useState(false)


    const [openingHours, setOpeningHours] = useState<any>(
        {
            monday: {
                start: '8:00',
                end: '16:00',
                valid: true
            },
            tuesday: {
                start: '8:00',
                end: '16:00',
                valid: true
            },
            wednesday: {
                start: '8:00',
                end: '16:00',
                valid: true
            },
            thursday: {
                start: '8:00',
                end: '16:00',
                valid: true
            },
            friday: {
                start: '8:00',
                end: '16:00',
                valid: true
            },
            saturday: {
                start: '8:00',
                end: '16:00',
                valid: true
            },
            sunday: {
                start: '8:00',
                end: '16:00',
                valid: true
            }
        }
    )
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (Object.keys(openingHours).some(day => !openingHours[day].valid)) {
            setHoursValid(false)
            return
        }
        setHoursValid(true)

    }, [openingHours])

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
        <Grid container sx={{ height: '100%', overflow: 'hidden' }} direction="column">
            {currentPlace.isActive ||
                <Alert variant="filled" severity="warning">
                    Your place is currently not visible in the browser. Please set opening hours to activate your business.
                </Alert>
            }
            <Grid sx={{ flexGrow: 1 }} container alignItems="center">
                <Grid container justifyContent="space-evenly">
                    <Grid item lg={6}>
                        <Fade in={true} timeout={1000}>
                            <Card sx={{ height: '100%' }}>
                                <Grid container direction="column" sx={{ height: '100%' }}>
                                    <Tabs value={value} onChange={handleChange} variant="fullWidth" sx={{ width: '100%' }}>
                                        {days.map((day) =>
                                            <Tab value={day.toLowerCase()} label={day} key={day} />
                                        )}
                                    </Tabs>
                                    <SingleDayOpeningHours
                                        openingHours={openingHours}
                                        setOpeningHours={setOpeningHours}
                                        day={value.toLowerCase()}
                                    />

                                </Grid>
                            </Card>
                        </Fade>
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
                                        Your customer basis will expand
                                    </Alert>
                                </CardContent>
                            </Card>
                        </Slide>

                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                sx={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
                }}
            >
                <Toolbar sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent="flex-end">
                        <Tooltip title="Save your opening hours">
                            <Button variant="contained" disabled={!areHoursValid} size="large" color="primary">Save changes</Button>
                        </Tooltip>
                    </Grid>
                </Toolbar>
            </Grid>
        </Grid>
    )
}