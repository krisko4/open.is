import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, SlideProps, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";
import myAxios from "../../../../axios/axios";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { ChosenOptions, usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { useStepContext } from "../../../../contexts/StepContext";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import { NewPlaceStepper } from "./Steps/NewPlaceStepper";


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);


export const NewPlace: FC = () => {

    const { activeStep, imageFile, setActiveStep } = useStepContext()
    const { currentPlace } = useCurrentPlaceContext()
    const { setSelectedOption, setPlaces, places } = usePanelContext()
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    console.log('newPlace')

    const registerPlace = () => {
        setLoading(true)
        const place = { ...currentPlace }
        place.img = imageFile
        console.log(place)
        const formData = new FormData()
        let key: keyof typeof place
        for (key in place) formData.append(key, place[key])
        myAxios.post('/places', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data)
            const newPlace = res.data.place
            newPlace.img = res.data.place.img
            newPlace.visits = []
            newPlace.opinions = []
            newPlace.news = []
            const currentPlaces: any = [...places]
            currentPlaces.push(newPlace)
            setPlaces(currentPlaces)
            enqueueSnackbar('You have successfully registered new place', {
                variant: 'success'
            })
            setSelectedOption(ChosenOptions.DASHBOARD)
        }).catch(err => {
            console.log(err)
            enqueueSnackbar('Oops, something went wrong', {
                variant: 'error'
            })
        }).finally(() => {
            setLoading(false)
            setOpen(false)
        }
        )
    }

    return (

        <Grid container lg={activeStep > 0 ? 12 : 10} spacing={2} item style={{ marginBottom: 40, paddingLeft: 10 }} justify="space-evenly">

            <Grid item lg={activeStep > 0 ? 5 : 6}>
                <Slide in={true}>
                    <Card style={{ boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px', borderRadius: 15 }}>
                        <CardContent>
                            <Typography variant="h5" >
                                Business management
                            </Typography>
                            <Typography variant="subtitle2">
                                Add new place to your place assembly
                            </Typography>
                            <NewPlaceStepper isEditionMode={false} />
                        </CardContent>
                        {activeStep > 0 &&
                            <CardActions>
                                <Grid container justify="space-between">
                                    <Button variant="text" color="primary" onClick={() => setActiveStep((currentStep) => currentStep - 1)}>Return</Button>
                                    {activeStep === 4 &&
                                        <div>
                                            <Button variant="text" disabled={!currentPlace.img} color="primary" onClick={() => setOpen(true)}>Finish registration</Button>
                                            <Dialog
                                                open={isOpen}
                                                TransitionComponent={Transition}
                                            >
                                                <DialogTitle>Summary</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Are you sure you would like to finish registration and save your place?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setOpen(false)} disabled={isLoading} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <LoadingButton color="primary" loading={isLoading} disabled={isLoading} onClick={registerPlace}>Yes, I am sure</LoadingButton>
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
                <Grid item lg={7} >
                    <PlaceDetailsCard />
                </Grid>
            }
        </Grid>


    )
}