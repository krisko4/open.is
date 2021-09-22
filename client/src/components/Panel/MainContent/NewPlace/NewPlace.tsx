import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide, SlideProps, Typography } from "@material-ui/core";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import myAxios from "../../../../axios/axios";
import { ChosenOptions, clearPlace, usePanelContext } from "../../../../contexts/PanelContext";
import { useStepContext } from "../../../../contexts/StepContext";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import { NewPlaceStepper } from "./Steps/NewPlaceStepper";



const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const defaultNews = [
    {
        title: 'This will be my first news!',
        date: new Date().toString(),
        content: 'This is just an example of what your news will look like. It will disappear after your first news is created.'
    },
    {
        title: 'This will be my second news!',
        date: new Date().toString(),
        content: 'It is going to be fun!'

    },
    {
        title: 'Thank your for using our services 💌',
        date: new Date().toString(),
        content: 'We appreciate you.'

    }

]

const defaultOpinions = [
    {
        date: new Date().toString(),
        author: 'Administration',
        content: 'This is just an example of what opinions will look like in the browser once your place is created.',
        note: 5,
        averageNote: 0
    },
    {
        date: new Date().toString(),
        author: 'Happy client',
        content: 'This is a lovely place!',
        note: 5,
        averageNote: 0
    },
    {
        date: new Date().toString(),
        author: 'Administration',
        content: 'Thank you for using our services💌',
        note: 5,
        averageNote: 0
    },


]

export const NewPlace: FC = () => {

    const { activeStep, setActiveStep } = useStepContext()
    const { currentPlace, setOpinionCount, setNews, setOpinions, setCurrentPlace, imageFile } = usePanelContext()
    const { setSelectedOption, setPlaces, places } = usePanelContext()
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        setCurrentPlace(clearPlace)
        setNews(defaultNews)
        setOpinions(defaultOpinions)
        setOpinionCount(defaultOpinions.length)
    }, [])

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
            const currentPlaces: any = [...places]
            currentPlaces.push(res.data.place)
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

        <Grid container lg={activeStep > 0 ? 12 : 10} spacing={2}  item style={{ marginTop: -80, marginBottom: 40,  }} justify="space-evenly">
        
            <Grid item lg={5}>
                <Slide in={true}>
                    <Card style={{boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',borderRadius: 15}}>
                        <CardContent>
                            <Typography variant="h5" >
                                Business management
                            </Typography>
                            <Typography variant="subtitle2">
                                Add new place to your place assembly
                            </Typography>
                            <NewPlaceStepper isEditionMode={true} />
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