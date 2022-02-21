import { LoadingButton } from "@mui/lab"
import { Alert, AlertTitle, Card, CardContent, Checkbox, Fade, FormControlLabel, FormGroup, Grid, Paper, Slide, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import _ from "lodash"
import React, { FC, useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { LocationProps } from "../../../../../../contexts/PlaceProps"
import { setPlaceAlwaysOpen } from "../../../../../../requests/OpeningHoursRequests"
import { usePlacesSelector } from "../../../../../../store/selectors/PlacesSelector"
import { useCustomSnackbar } from "../../../../../../utils/snackbars"
import { OpeningHoursDialog } from "./OpeningHoursDialog"
import { SingleDayOpeningHours } from "./SingleDayOpeningHours"


const defaultStartHour = new Date(0, 0, 0, 8)
const defaultEndHour = new Date(0, 0, 0, 18)

const areOpeningHoursEqual = (h1:any, h2: any) => {
    console.log(h1)
    console.log(h2)
    for(const key of Object.keys(h1)){
        for(const nestedKey of Object.keys(key)){
            if(h1[key][nestedKey] !== h2[key][nestedKey]){
                return false
            }
        }
    }
    return true
}

export const OpeningHours: FC = () => {

    const { setCurrentPlace, currentPlace } = useCurrentPlaceContext()
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()

    const [value, setValue] = useState('monday');
    const places = usePlacesSelector()
    const [areHoursValid, setHoursValid] = useState(false)
    const [checked, setChecked] = useState(currentPlace.alwaysOpen)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setChecked(currentPlace.alwaysOpen)
        if (currentPlace.openingHours) {
            const hours = currentPlace.openingHours
            for (const day of Object.keys(hours)) {
                hours[day].valid = true
            }
            setOpeningHours({...hours})
        }

    }, [currentPlace])


    const [openingHours, setOpeningHours] = useState<any>(
        {
            monday: {
                start: defaultStartHour,
                end: defaultEndHour,
                valid: true,
                open: false
            },
            tuesday: {
                start: defaultStartHour,
                end: defaultEndHour,
                valid: true,
                open: false
            },
            wednesday: {
                start: defaultStartHour,
                end: defaultEndHour,
                valid: true,
                open: false
            },
            thursday: {
                start: defaultStartHour,
                end: defaultEndHour,
                valid: true,
                open: false
            },
            friday: {
                start: defaultStartHour,
                end: defaultEndHour,
                valid: true,
                open: false
            },
            saturday: {
                start: defaultStartHour,
                end: defaultEndHour,
                valid: true,
                open: false
            },
            sunday: {
                start: defaultStartHour,
                end: defaultEndHour,
                valid: true,
                open: false
            },
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

    const saveChanges = async () => {
        if (!checked) {
            setDialogOpen(true)
            return
        }
        setLoading(true)
        try {
            await setPlaceAlwaysOpen(currentPlace._id as string, checked)
            enqueueSuccessSnackbar('You have successfully updated your opening hours')
            if (!currentPlace.isActive) {
                const newCurrentPlace = { ...currentPlace }
                newCurrentPlace.alwaysOpen = true
                newCurrentPlace.isActive = true
                setCurrentPlace(newCurrentPlace)
            }
            const place = places.find(place => place._id === currentPlace.businessId)
            const location = place?.locations.find(loc => loc._id === currentPlace._id) as LocationProps
            location.alwaysOpen = true
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }

    }


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
                    <Grid item lg={6} sx={checked ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
                        <Fade in={true} timeout={1000}>
                            <Card sx={{ height: '100%' }}>
                                <Grid container direction="column" sx={{ height: '100%' }}>
                                    <Paper>
                                        <Tabs value={value} onChange={handleChange} variant="fullWidth" sx={{ width: '100%' }}>
                                            {days.map((day) =>
                                                <Tab value={day.toLowerCase()} label={day} key={day} />
                                            )}
                                        </Tabs>

                                    </Paper>
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
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h2">Opening hours management</Typography>
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
            <Slide timeout={500} in={true} direction="up">
                <Grid
                    container
                >
                    <Paper square sx={{ flexGrow: 1 }}>
                        <Toolbar sx={{ flexGrow: 1 }}>
                            <Grid container justifyContent="space-between">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox onChange={(e) => setChecked(e.target.checked)} checked={checked} />}
                                        label="My place is always open"
                                        labelPlacement="end"
                                    />
                                </FormGroup>
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    onClick={saveChanges}
                                    disabled={
                                        (!areHoursValid && !checked) ||
                                        (checked && currentPlace.alwaysOpen) ||
                                        (areOpeningHoursEqual(openingHours, currentPlace.openingHours) && !checked)}
                                    size="large"
                                    color="primary"
                                >
                                    Save changes
                                </LoadingButton>
                            </Grid>
                        </Toolbar>

                    </Paper>
                </Grid>

            </Slide>
            <OpeningHoursDialog
                openingHours={openingHours}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen} />
        </Grid>
    )
}