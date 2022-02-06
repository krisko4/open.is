import { Button, DialogActions, DialogContent, DialogContentText, Grid, Typography } from "@material-ui/core"
import LockIcon from '@material-ui/icons/Lock'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { KeyboardTimePicker } from "@material-ui/pickers"
import { Field, Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import { changeOpeningHours } from "../../../requests/OpeningHoursRequests"
import { useCustomSnackbar } from "../../../utils/snackbars"
import { LoadingButton } from "../LoadingButton"

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const hours = ['10:00 - 17:00', 'closed', '10:00 - 17:00', '12:00 - 15:00', '7:30 - 18:50', 'closed', 'closed']

const HourPicker: FC<any> = ({ field, form, label, classes, disabled, ...other }) => {

    return (
        <KeyboardTimePicker
            ampm={false}
            label={label}
            disabled={disabled}
            name={field.name}
            value={field.value}
            InputLabelProps={{ className: classes.inputLabel }}
            InputProps={{ className: classes.hourPicker }}
            InputAdornmentProps={{ className: classes.calendarIcon }}
            onChange={(date: any) => form.setFieldValue(field.name, date, false)}
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
        <Formik
            initialValues={{ ...startSchedule, ...endSchedule }}
            onSubmit={submitForm}
        >
            {({ initialValues }) => (
                <Form>
                    <DialogContent>
                        <DialogContentText className="dialogContentText" style={{ textAlign: 'center' }}>
                            Manage the opening state of your place by either providing hours using keyboard or by pressing the calendar attached to each text field.
                        </DialogContentText>
                        <Grid container justify="space-evenly" style={{ marginTop: 20 }}>
                            <Grid container item lg={2} direction="column">
                                {days.map((day, index) =>
                                    <Typography key={index} style={{ marginTop: 26 }} variant="subtitle2" className="dialogContentText">{day.toUpperCase()} </Typography>
                                )}
                            </Grid>
                            <Grid container item lg={3} direction="column">
                                {Object.keys(startSchedule).map((day, index) => <Field key={index} disabled={disabledIndices.includes(index)} classes={classes} label="Start hour" component={HourPicker} name={day} />)}
                            </Grid>
                            <Grid container item lg={5} direction="column">
                                {Object.keys(endSchedule).map((day, index) => <Grid key={index} container justify="space-between" style={{ alignItems: 'end' }}>
                                    <Grid item lg={7}>
                                        <Field key={index} label="End hour" classes={classes} disabled={disabledIndices.includes(index)} component={HourPicker} name={day} />
                                    </Grid>
                                    <Grid item lg={3}>
                                        {disabledIndices.includes(index) ? <Button startIcon={<LockOpenIcon />} onClick={() => enableIndex(index)} color="primary" size="small" variant="contained">Open</Button>
                                            :
                                            <Button startIcon={<LockIcon />} onClick={() => disableIndex(index)} color="secondary" size="small" variant="contained">Close</Button>
                                        }
                                    </Grid>
                                </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{ marginTop: 30 }}>
                        <LoadingButton type="submit" loading={loading} disabled={disabledIndices.length > 6 || loading} color="primary">Submit</LoadingButton>
                    </DialogActions>
                </Form>

            )}
        </Formik>
    )
}