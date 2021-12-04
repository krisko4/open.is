import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, SlideProps, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import myAxios from "../../../../axios/axios";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { PlaceProps, usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { useStepContext } from "../../../../contexts/StepContext";
import { setPlaces } from "../../../../store/actions/setPlaces";
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { PlaceDetailsCard } from "../NewPlace/PlaceDetailsCard";
import { NewPlaceStepper } from "../NewPlace/Steps/NewPlaceStepper";


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface Props {
    initialPlaceData: PlaceProps,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditPlace: FC<Props> = ({ initialPlaceData, setDialogOpen }) => {

    const { activeStep, setActiveStep, imageFile } = useStepContext()
    const { currentPlace, setCurrentPlace} = useCurrentPlaceContext()
    const places = usePlacesSelector()
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const submitChanges = async () => {
        setLoading(true)
        const formData = new FormData()
        const changedPlace = {...currentPlace}
        if (imageFile) changedPlace.img = imageFile
        let key: keyof typeof changedPlace
        for (key in currentPlace) formData.append(key, changedPlace[key])
        try {
            const res = await myAxios.put('/places', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res.data)
            // res.data.place.img = `${process.env.REACT_APP_BASE_URL}/images/places/${res.data.place.img}`
            const currentPlaces: any = [...places]
            currentPlaces.push(res.data.place)
            setCurrentPlace(res.data.place)
            setPlaces(currentPlaces)
            enqueueSnackbar('You have successfully modified your place', {
                variant: 'success'
            })
            setDialogOpen(false)

        } catch (err) {
            console.log(err)
            enqueueSnackbar('Oops, something went wrong', {
                variant: 'error'
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <Grid container style={{ paddingTop: 50, paddingBottom: 50 }} justify="space-evenly">
            <Grid item lg={activeStep > 0 ? 5 : 4}>
                <Slide in={true}>
                    <Card style={{ boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', borderRadius: 15 }}>
                        <CardContent>
                            <Typography variant="h5" >
                                Business data management
                            </Typography>
                            <Typography variant="subtitle2">
                                Modify your place information
                            </Typography>
                            <NewPlaceStepper isEditionMode={true} />
                        </CardContent>
                        {activeStep > 0 &&
                            <CardActions>
                                <Grid container justify="space-between">
                                    <Button variant="text" color="primary" onClick={() => setActiveStep((currentStep) => currentStep - 1)}>Return</Button>
                                    {activeStep === 4 &&
                                        <div>
                                            <Button variant="text" disabled={!currentPlace.img} color="primary" onClick={() => setOpen(true)}>Finish modifications</Button>
                                            <Dialog
                                                open={isOpen}
                                                TransitionComponent={Transition}
                                            >
                                                <DialogTitle>Summary</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Are you sure you would like to finish modifications and save your place?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setOpen(false)} disabled={isLoading} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <LoadingButton color="primary" onClick={() => submitChanges()} loading={isLoading} disabled={isLoading}>Yes, I am sure</LoadingButton>
                                                </DialogActions>
                                            </Dialog>

                                        </div>
                                    }
                                </Grid>
                            </CardActions>
                        }
                    </Card>
                </Slide>
            </Grid>
            {activeStep > 0 &&
                <Grid item lg={6} >
                    <PlaceDetailsCard />
                </Grid>
            }
        </Grid>
    )
}