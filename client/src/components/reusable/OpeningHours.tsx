import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, SlideProps } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { KeyboardTimePicker } from "@material-ui/pickers";
import { ClassNameMap } from '@material-ui/styles';
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from 'react';
import Scrollbars from "react-custom-scrollbars";
import myAxios from "../../axios/axios";
import { useAuthSelector } from '../../store/selectors/AuthSelector';
import { LoadingButton } from './LoadingButton';

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

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
            onChange={date => form.setFieldValue(field.name, date, false)}
        />
    )
}

interface Props {
    currentPlace?: any,
    setCurrentPlace: React.Dispatch<any>,
    classes: ClassNameMap<"title" | "container" | "divider" | "days" | "hours" | "content" | "dialog">,
}
const OpeningHours: FC<Props> = ({ currentPlace, setCurrentPlace, classes }) => {

    const openingHours = currentPlace && currentPlace.openingHours

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

    const [disabledIndices, setDisabledIndices] = useState<number[]>([])

    useEffect(() => {
        console.log(openingHours)
        const newDisabledIndices: number[] = []
        openingHours && Object.keys(openingHours).forEach((key, index) => {
            !openingHours[key].isOpen && newDisabledIndices.push(index)
        })
        setDisabledIndices(newDisabledIndices)

    }, [])


    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const { enqueueSnackbar } = useSnackbar()

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
        console.log(hours)
        console.log(disabledIndices)
        myAxios.patch(`places/${currentPlace._id}/opening-hours`, hours)
            .then(res => {
                console.log(res.data)
                enqueueSnackbar('Opening hours changed successfully', {
                    variant: 'success'
                })
                const newCurrentPlace = { ...currentPlace }
                newCurrentPlace.openingHours = hours
                setCurrentPlace(newCurrentPlace)
                setDialogOpen(false)

            }).catch(err => {
                console.log(err)
                enqueueSnackbar('Oops, something went wrong', {
                    variant: 'error'
                })
            }).finally(() => setLoading(false))
    }



    const isUserLoggedIn = useAuthSelector()


    return (
        <Grid container justify="center">
            <Grid container justify="center" style={{height: 500}}>
                {currentPlace.isUserOwner && isUserLoggedIn && openingHours &&
                    <Grid container justify="flex-end" >
                        <Grid item style={{ paddingRight: 30, paddingTop: 30 }}>
                            <Button startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} variant="contained" color="primary">Set opening hours</Button>
                        </Grid>
                    </Grid>
                }
                {
                    openingHours ?
                        <Grid item container alignItems="center" style={{marginTop: 10, marginBottom: 10}} lg={5} md={8}>
                            <Card className={classes.container} style={{flexGrow: 1}} elevation={10}>
                                <CardContent>
                                    <Typography variant="h5" className={classes.title}>Opening hours</Typography>
                                    <Divider className={classes.divider} />
                                    <Grid container justify="center">
                                        <Grid item className={classes.days} lg={6}>
                                            {days.map((day, index) => <Typography key={index} variant="h6">{day}</Typography>)}
                                        </Grid>
                                        <Grid item lg={5} style={{ textAlign: 'center' }} container direction="column" className={classes.hours}>
                                            {Object.keys(openingHours).map((key, index) => <div key={index}>
                                                {!openingHours[key].isOpen ?
                                                    <Typography variant="h6" style={{ color: 'red' }}>CLOSED</Typography>
                                                    :
                                                    <Typography variant="h6">{format(new Date(openingHours[key].startHour), 'HH:mm')} - {format(new Date(openingHours[key].endHour), 'HH:mm')}</Typography>

                                                }
                                            </div>
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        : <>
                            {currentPlace.isUserOwner ?
                                <Grid justify="center" direction="column" alignItems="center" container>
                                    <Typography variant="h6">This place has not set opening hours yet.</Typography>
                                    <Typography className={classes.content} variant="subtitle1">Press the button below to set opening hours.</Typography>
                                    <Button startIcon={<AddIcon />} style={{ marginTop: 10 }} onClick={() => setDialogOpen(true)} variant="contained" color="primary">Set opening hours</Button>
                                </Grid>

                                :
                                <Grid item lg={5} md={8} container alignItems="center">
                                    <Grid item>
                                        <Card className={classes.container} style={{ flexGrow: 1 }} elevation={10}>
                                            <CardContent>
                                                <Typography variant="h5" className={classes.title}>Opening hours</Typography>
                                                <Divider className={classes.divider} />
                                                <Grid container justify="center">
                                                    <Grid item className={classes.days} lg={6}>
                                                        {days.map((day, index) => <Typography key={index} variant="h6">{day}</Typography>)}
                                                    </Grid>
                                                    <Grid item lg={5} style={{ textAlign: 'center' }} container direction="column" className={classes.hours}>
                                                        {hours.map((hour, index) => <div key={index}>
                                                            {hour === 'closed' ?
                                                                <Typography variant="h6" style={{ color: 'red' }}>CLOSED</Typography>
                                                                :
                                                                <Typography variant="h6">{hour}</Typography>
                                                            }
                                                        </div>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                        <Typography variant="caption"><span style={{ color: 'red' }}>*</span>You will be able to specify the opening state of your place once it is registered. This is just an example.</Typography>
                                    </Grid>
                                </Grid>
                            }
                        </>



                }

            </Grid >
            {isUserLoggedIn && currentPlace.isUserOwner &&
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    onClose={() => setDialogOpen(false)}
                    PaperProps={
                        {
                            classes: { root: classes.dialog }
                        }
                    }

                >
                    <DialogTitle className="dialogTitle">Opening hours management</DialogTitle>
                    <Formik
                        initialValues={{ ...startSchedule, ...endSchedule }}
                        onSubmit={(values => submitForm(values))}
                    >

                        {() => (
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
                                <DialogActions style={{ marginTop: 10 }}>
                                    <LoadingButton type="submit" loading={loading} variant="contained" disabled={disabledIndices.length > 6 || loading} color="primary">Submit</LoadingButton>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Dialog>
            }
        </Grid >
    );
};

export default OpeningHours;