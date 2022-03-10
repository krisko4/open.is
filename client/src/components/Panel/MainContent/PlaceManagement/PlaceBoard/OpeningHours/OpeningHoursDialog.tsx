import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import { Alert, AppBar, Dialog, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import {useBusinessChainIdSelector, setOpeningHoursForSelectedLocations } from 'redux-toolkit/slices/businessChainSlice';
import { setOpeningHours, useCurrentPlaceSelector, useIdSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { changeOpeningHours, changeOpeningHoursForSelectedLocations } from "../../../../../../requests/OpeningHoursRequests";
import { useCustomSnackbar } from "../../../../../../utils/snackbars";
import DialogTransition from "../../../../../reusable/DialogTransition";
import { OpeningHoursCard } from "./OpeningHoursCard";


interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    openingHours: any,
    selectedLocations?: string[],

}

export const OpeningHoursDialog: FC<Props> = ({ dialogOpen, selectedLocations, setDialogOpen,  openingHours }) => {

    const [loading, setLoading] = useState(false)
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const dispatch = useAppDispatch()
    const currentPlaceId = useIdSelector()
    const businessChainId = useBusinessChainIdSelector()

    const saveChanges = async () => {
        setLoading(true)
        Object.keys(openingHours).forEach(day => {
            delete openingHours[day].valid
            openingHours[day].start = new Date(openingHours[day].start)
            openingHours[day].end = new Date(openingHours[day].end)
        })
        try {
            // this means that openingHoursDialog is opened in business chain management 
            if ( selectedLocations ) {
                await changeOpeningHoursForSelectedLocations(businessChainId as string, openingHours, selectedLocations)
                dispatch(setOpeningHoursForSelectedLocations({
                    openingHours: openingHours,
                    selectedLocations: selectedLocations
                }))
            }
            else {
                await changeOpeningHours(currentPlaceId as string, openingHours)
                dispatch(setOpeningHours(openingHours))
            }
            enqueueSuccessSnackbar('You have successfully updated your opening hours')
            setDialogOpen(false)
        } catch (err) {
            console.log(err)
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }
    }


    return (

        <Dialog fullScreen
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            TransitionComponent={DialogTransition}
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
                    <OpeningHoursCard openingHours={openingHours} />
                </Grid>

            </Grid>

        </Dialog>
    )
}