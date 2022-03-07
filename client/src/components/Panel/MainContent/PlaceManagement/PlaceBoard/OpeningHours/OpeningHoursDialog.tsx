import { SlideProps, Slide, Dialog, AppBar, Toolbar, IconButton, Typography, Grid, Alert, Card, Divider, CardContent, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab"
import CloseIcon from '@mui/icons-material/Close'
import { format } from "date-fns";
import React, { FC, useState } from "react";
import { changeOpeningHours, changeOpeningHoursForSelectedLocations } from "../../../../../../requests/OpeningHoursRequests";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useCustomSnackbar } from "../../../../../../utils/snackbars";
import { OpeningHoursCard } from "./OpeningHoursCard";
import { setPlaces } from "../../../../../../store/actions/setPlaces";
import { LocationProps, RawPlaceDataProps } from "../../../../../../contexts/PlaceProps";
import DialogTransition from "../../../../../reusable/DialogTransition";
import { useAppDispatch } from "redux-toolkit/hooks";
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";


interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    openingHours: any,
    businessChain?: RawPlaceDataProps,
    selectedLocations?: string[],
    setBusinessChain?: React.Dispatch<React.SetStateAction<RawPlaceDataProps>>

}

export const OpeningHoursDialog: FC<Props> = ({ dialogOpen, selectedLocations, setDialogOpen, setBusinessChain, businessChain, openingHours }) => {

    const [loading, setLoading] = useState(false)
    const { currentPlace } = useCurrentPlaceContext()
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const places = usePlacesSelector()
    const dispatch = useAppDispatch()

    const saveChanges = async () => {
        setLoading(true)
        Object.keys(openingHours).forEach(day => {
            delete openingHours[day].valid
            openingHours[day].start = new Date(openingHours[day].start)
            openingHours[day].end = new Date(openingHours[day].end)
        }
        )
        try {
            // this means that openingHoursDialog is opened in business chain management 
            if (businessChain && selectedLocations && setBusinessChain) {
                await changeOpeningHoursForSelectedLocations(businessChain._id as string, openingHours, selectedLocations)
                selectedLocations.forEach(locId => {
                    const location = businessChain.locations.find(loc => loc._id === locId) as LocationProps
                    location.openingHours = openingHours
                    location.isActive = true
                })
                setBusinessChain({...businessChain})
            }
            else {
                await changeOpeningHours(currentPlace._id as string, openingHours)
                const place = places.find(place => place._id === currentPlace.businessId)
                const location = place?.locations.find(loc => loc._id === currentPlace._id) as LocationProps
                location.openingHours = openingHours
                location.isActive = true
            }
            currentPlace.openingHours = openingHours
            currentPlace.isActive = true
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