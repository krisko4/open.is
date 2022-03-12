import { LoadingButton } from "@mui/lab"
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Slide, Tooltip, Typography } from "@mui/material"
import { CurrentPlaceProps, RawPlaceDataProps } from "contexts/PlaceProps"
import _ from "lodash"
import React, { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddPlaceMutation } from "redux-toolkit/api/placesApi"
import { useAppDispatch } from "redux-toolkit/hooks"
import { useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice"
import { addPlace, usePlacesSelector } from "redux-toolkit/slices/placesSlice"
import { useStepContext } from "../../../../../../contexts/StepContext"
import { registerNewPlace, updatePlaceData } from "../../../../../../requests/PlaceRequests"
import { setPlaces } from "../../../../../../store/actions/setPlaces"
import { convertToCurrentPlace } from "../../../../../../utils/place_data_utils"
import { useCustomSnackbar } from "../../../../../../utils/snackbars"
import DialogTransition from "../../../../../reusable/DialogTransition"
import { Destinations } from "../../../PlaceManagement/PlaceBoard/PlaceBoard"
import { NewPlaceStepper } from "../NewPlaceStepper"

interface Props {
    formData: FormData,
    isEditionMode?: boolean,
    initialPlaceData? : CurrentPlaceProps
}

export const Step5: FC<Props> = ({ isEditionMode, initialPlaceData, formData }) => {
    const [isOpen, setOpen] = useState(false)
    const { activeStep, steps } = useStepContext()
    const [registerNewPlace, { data, isLoading }] = useAddPlaceMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const places = usePlacesSelector()
    const { enqueueErrorSnackbar, enqueueWarningSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const currentPlace = useCurrentPlaceSelector()

    useEffect(() => {
        if (steps.some(step => !step.isValid)) {
            enqueueWarningSnackbar('You have left some invalid data in previous steps. Please make sure all the fields are correctly filled.')
        }
    }, [])


    const editPlaceData = async () => {
        try {
            formData.append('_id', currentPlace._id as string)
            const res = await updatePlaceData(formData)
            const placeBeforeUpdate = places.find(place => place.locations.find(location => location._id === currentPlace._id))
            const rawPlaceDataAfterUpdate = res.data.place
            if (placeBeforeUpdate) places[places.indexOf(placeBeforeUpdate)] = rawPlaceDataAfterUpdate
            dispatch(setPlaces([...places]))
            //@ts-ignore
            dispatch(setCurrentPlace(convertToCurrentPlace(rawPlaceDataAfterUpdate)[0]))
            enqueueSuccessSnackbar('You have successfully modified your place')
            setOpen(false)
            navigate(Destinations.HOME)
        } catch (err) {
            console.log(err)
            enqueueErrorSnackbar()
        } finally {
            // setLoading(false)
        }
    }

    const handleClick = async () => {
        if (isEditionMode) {
            await editPlaceData()
            return
        }
        try {
            await registerNewPlace(formData)
            enqueueSuccessSnackbar('You have successfully added new place')
            navigate(`/panel/dashboard`)

        } catch (err) {
            enqueueErrorSnackbar()
        }
    }

    return (
        <Slide in={true} direction="left" timeout={1000}>
            <Card>
                <CardContent>
                    <Typography variant="h2">
                        Step {activeStep + 1} - Final
                    </Typography>
                    <Grid container item sx={{ mt: '10px', mb: '10px' }} lg={11}>
                        <Typography variant="body1" sx={{ mb: '10px' }}>
                            This is the final step of the {isEditionMode ? 'edition' : 'registration'}  process. On the left side, you can see an example place card of one of your locations.
                            You have filled it with your data - now you can make it beautiful by uploading images presenting your business.
                        </Typography>
                        <Typography variant="caption">
                            <span style={{ color: 'red' }}>*</span> Uploading a logo picture is required.<br />
                            <span style={{ color: 'red' }}>*</span> You can upload up to 5 pictures.<br />
                        </Typography>
                        <Divider sx={{ width: '100%', mt: 1, mb: 1 }} />
                        <NewPlaceStepper
                            orientation="vertical"
                        />
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>
                        <Dialog
                            open={isOpen}
                            TransitionComponent={DialogTransition}
                        >
                            <DialogTitle>Summary</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {isEditionMode ?
                                        'Are your sure you would like to save your changes?' :
                                        'Are you sure you would like to finish registration and save your place?'
                                    }
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)} disabled={isLoading} color="primary">
                                    Cancel
                                </Button>
                                <LoadingButton color="primary" loading={isLoading} disabled={isLoading} onClick={handleClick}>Yes, I am sure</LoadingButton>
                            </DialogActions>
                        </Dialog>
                        {
                            !currentPlace.logo ?
                                <Tooltip arrow title="Please upload a logo picture">
                                    <Grid container>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            disabled={
                                                !currentPlace.logo || (isEditionMode && _.isEqual(currentPlace, initialPlaceData))
                                            }
                                            size="large"
                                            onClick={() => setOpen(true)}
                                        >
                                            {
                                                isEditionMode ? 'Save changes' : 'Finish registration'
                                            }
                                        </Button>

                                    </Grid>
                                </Tooltip>
                                :
                                <Button
                                    fullWidth
                                    variant="contained"
                                    disabled={
                                        !currentPlace.logo ||
                                        (isEditionMode && _.isEqual(currentPlace, initialPlaceData)) ||
                                        steps.some(step => !step.isValid)
                                    }

                                    size="large"
                                    onClick={() => setOpen(true)}
                                >
                                    {
                                        isEditionMode ? 'Save changes' : 'Finish registration'
                                    }
                                </Button>
                        }
                    </Grid>
                </CardContent>
            </Card>
        </Slide >



    )
}