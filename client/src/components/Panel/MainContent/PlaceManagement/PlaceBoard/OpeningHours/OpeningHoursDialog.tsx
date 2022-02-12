import { SlideProps, Slide, Dialog, AppBar, Toolbar, IconButton, Typography, Grid, Alert, Card, Divider, CardContent, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab"
import CloseIcon from '@mui/icons-material/Close'
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { changeOpeningHours } from "../../../../../../requests/OpeningHoursRequests";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useCustomSnackbar } from "../../../../../../utils/snackbars";

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    openingHours: any,

}

export const OpeningHoursDialog: FC<Props> = ({ dialogOpen, setDialogOpen, openingHours }) => {

    const [loading, setLoading] = useState(false)
    const { currentPlace } = useCurrentPlaceContext()
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()

    const saveChanges = async () => {
        setLoading(true)
        Object.keys(openingHours).forEach(day => {
            delete openingHours[day].valid
            openingHours[day].start = new Date(openingHours[day].start)
            openingHours[day].end = new Date(openingHours[day].end)
        }
        )
        try {
            await changeOpeningHours(currentPlace._id as string, openingHours)
            enqueueSuccessSnackbar('You have successfully updated your opening hours')
            setDialogOpen(false)
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }
    }


    return (

        <Dialog fullScreen
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setDialogOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Summary
                    </Typography>
                    <LoadingButton
                        loading={loading}
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={saveChanges}>
                        Save changes
                    </LoadingButton>
                </Toolbar>
            </AppBar>
            <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                <Grid item lg={5}>

                    <Alert severity="info" sx={{ mb: 1 }}>
                        This is the summary board of your opening hours. Press the button in the top-right corner to save your changes.
                    </Alert>
                    <Card>
                        <Toolbar>
                            <Grid container sx={{ pb: 1, pt: 1 }} justifyContent="center">
                                <Typography variant="h2">
                                    OPENING HOURS
                                </Typography>
                            </Grid>
                        </Toolbar>
                        <Divider />
                        <CardContent>
                            <Grid container justifyContent="center" sx={{ pt: 1, pb: 1 }} >
                                <Grid container item lg={8}>
                                    {Object.keys(openingHours).map((day, index) =>
                                        <Grid container sx={{ mb: 1 }} key={day}>
                                            <Grid item container alignItems="center" lg={6}>
                                                <Typography variant="h6">{day.toUpperCase()}</Typography>
                                            </Grid>
                                            <Grid item container justifyContent="flex-end" lg={6}>
                                                {!openingHours[day].open ?
                                                    <Button variant="outlined" color="error">Closed</Button>
                                                    :
                                                    <Typography variant="h6">{format(new Date(openingHours[day].start), 'HH:mm')} - {format(new Date(openingHours[day].end), 'HH:mm')}</Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>

            </Grid>

        </Dialog>
    )
}