import { Button, DialogActions, DialogContent, DialogContentText, Grid, TextField, Typography } from "@mui/material"
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Field, Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import { changeOpeningHours } from "../../../requests/OpeningHoursRequests"
import { useCustomSnackbar } from "../../../utils/snackbars"
import { LoadingButton } from "../LoadingButton"
import { LocalizationProvider, TimePicker } from "@mui/lab"

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const hours = ['10:00 - 17:00', 'closed', '10:00 - 17:00', '12:00 - 15:00', '7:30 - 18:50', 'closed', 'closed']


const TimePickerField: FC<any> = ({ field, form, ...other }) => {

    return (
        <TimePicker
            value={field.value}
            onChange={hour => form.setFieldValue(field.name, hour)}
            renderInput={(props) => <TextField type="time" {...props}></TextField>}
        />
    )
}

export const OpeningHoursForm: FC<any> = ({ openingHours, classes, currentPlace, setDialogOpen, setCurrentPlace }) => {

    const [loading, setLoading] = useState(false)
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const [disabledIndices, setDisabledIndices] = useState<number[]>([])

    const startSchedule = openingHours ? {
        mondayStart: openingHours.monday.startHour,
        tuesdayStart: openingHours.tuesday.startHour,
        wednesdayStart: openingHours.wednesday.startHour,
        thursdayStart: openingHours.thursday.startHour,
        fridayStart: openingHours.friday.startHour,
        saturdayStart: openingHours.saturday.startHour,
        sundayStart: openingHours.sunday.startHour,
    } : {
        mondayStart: "2018-01-01T00:00:00.000Z",
        tuesdayStart: "2018-01-01T00:00:00.000Z",
        wednesdayStart: "2018-01-01T00:00:00.000Z",
        thursdayStart: "2018-01-01T00:00:00.000Z",
        fridayStart: "2018-01-01T00:00:00.000Z",
        saturdayStart: "2018-01-01T00:00:00.000Z",
        sundayStart: "2018-01-01T00:00:00.000Z",
    }

    const endSchedule = openingHours ? {
        mondayEnd: openingHours.monday.endHour,
        tuesdayEnd: openingHours.tuesday.endHour,
        wednesdayEnd: openingHours.wednesday.endHour,
        thursdayEnd: openingHours.thursday.endHour,
        fridayEnd: openingHours.friday.endHour,
        saturdayEnd: openingHours.saturday.endHour,
        sundayEnd: openingHours.sunday.endHour,
    } : {
        mondayEnd: "2018-01-01T00:00:00.000Z",
        tuesdayEnd: "2018-01-01T00:00:00.000Z",
        wednesdayEnd: "2018-01-01T00:00:00.000Z",
        thursdayEnd: "2018-01-01T00:00:00.000Z",
        fridayEnd: "2018-01-01T00:00:00.000Z",
        saturdayEnd: "2018-01-01T00:00:00.000Z",
        sundayEnd: "2018-01-01T00:00:00.000Z",
    }

    useEffect(() => {
        console.log(openingHours)
        const newDisabledIndices: number[] = []
        openingHours && Object.keys(openingHours).forEach((key, index) => {
            !openingHours[key].isOpen && newDisabledIndices.push(index)
        })
        setDisabledIndices(newDisabledIndices)
    }, [])

    useEffect(() => {
        console.log(disabledIndices)
    }, [disabledIndices])

    const disableIndex = (index: number) => {
        const newIndices = [...disabledIndices]
        newIndices.push(index)
        setDisabledIndices(newIndices)
    }
    const enableIndex = (index: number) => {
        const newIndices = disabledIndices.filter(element => element !== index)
        setDisabledIndices(newIndices)
    }

    const submitForm = (values: any) => {
        setLoading(true)
        const hours: any = {
            monday: {
                startHour: values.mondayStart,
                endHour: values.mondayEnd,
                isOpen: true
            },
            tuesday: {
                startHour: values.tuesdayStart,
                endHour: values.tuesdayEnd,
                isOpen: true
            },
            wednesday: {
                startHour: values.wednesdayStart,
                endHour: values.wednesdayEnd,
                isOpen: true
            },
            thursday: {
                startHour: values.thursdayStart,
                endHour: values.thursdayEnd,
                isOpen: true
            },
            friday: {
                startHour: values.fridayStart,
                endHour: values.fridayEnd,
                isOpen: true
            },
            saturday: {
                startHour: values.saturdayStart,
                endHour: values.saturdayEnd,
                isOpen: true
            },
            sunday: {
                startHour: values.sundayStart,
                endHour: values.sundayEnd,
                isOpen: true
            },
        }
        disabledIndices.forEach(index => {
            hours[Object.keys(hours)[index]].isOpen = false
        })
        changeOpeningHours(currentPlace._id as string, hours).then(res => {
            console.log(res.data)
            enqueueSuccessSnackbar('Opening hours changed successfully')
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.openingHours = hours
            setCurrentPlace(newCurrentPlace)
            setDialogOpen(false)

        }).catch(err => {
            console.log(err)
            enqueueErrorSnackbar()
        }).finally(() => setLoading(false))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Formik
                initialValues={{ ...startSchedule, ...endSchedule }}
                onSubmit={submitForm}
            >
                {({ initialValues, handleChange, setFieldValue, values }) => (
                    <Form>
                        <Grid container direction="column">
                            {days.map((day, index) =>
                                <Grid container alignItems="center" key={index}>
                                    <Typography variant="subtitle2">{day.toUpperCase()} </Typography>
                                    <Field
                                        name={Object.keys(startSchedule)[index]}
                                        component={TimePickerField}
                                    />
                                    <Field
                                        name={Object.keys(endSchedule)[index]}
                                        component={TimePickerField}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        {/* <Grid container justifyContent="space-evenly" style={{ marginTop: 20 }}>
                            <Grid container item lg={2} direction="column">
                                {days.map((day, index) =>
                                    <Typography key={index} style={{ marginTop: 26 }} variant="subtitle2" className="dialogContentText">{day.toUpperCase()} </Typography>
                                )}
                            </Grid>
                            <Grid container item lg={3} direction="column">
                                {Object.keys(startSchedule).map((day, index) =>
                                    <Field
                                        name={day}
                                        component={TimePickerField}
                                    />
                                )}
                            </Grid>
                            <Grid container item lg={5} direction="column">
                                {Object.keys(endSchedule).map((day, index) => <Grid key={index} container justifyContent="space-between" style={{ alignItems: 'end' }}>
                                    <Grid item lg={7}>
                                        <Field
                                            name={day}
                                            component={TimePickerField}
                                        />
                                    </Grid>
                                    <Grid item lg={3}>
                                        {disabledIndices.includes(index) ? <Button startIcon={<LockOpenIcon />} onClick={() => enableIndex(index)} color="primary" size="small" variant="contained">Open</Button>
                                            :
                                            <Button startIcon={<LockIcon />} onClick={() => disableIndex(index)} color="error" size="small" variant="contained">Close</Button>
                                        }
                                    </Grid>
                                </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <LoadingButton type="submit" loading={loading} disabled={disabledIndices.length > 6 || loading} color="primary">Submit</LoadingButton> */}
                    </Form>
                )}
            </Formik>
        </LocalizationProvider>
    );
}