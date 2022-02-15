import { LoadingButton } from "@mui/lab"
import { Slide, Card, CardContent, Typography, Grid, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Tooltip, SlideProps } from "@mui/material"
import React from "react"
import { FC, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { useStepContext } from "../../../../../../contexts/StepContext"
import { NewPlaceStepper } from "../NewPlaceStepper"

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const Step51: FC<any> = ({registerPlace}) => {
    const [isOpen, setOpen] = useState(false)
    const { activeStep, setActiveStep, currentStep, steps } = useStepContext()
    const { imageFile, currentPlace } = useCurrentPlaceContext()
    const [isLoading, setLoading] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const handleClose = () => {
        setTooltipOpen(false)
    }

    const handleOpen = () => {
        if (!currentPlace.logo) {
            setTooltipOpen(true)
        }
    }

    return (
        <Slide in={true} timeout={1000}>
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h2">
                            Step {activeStep + 1} - Final
                        </Typography>
                        <Grid container sx={{ mt: '10px', mb: '10px' }} lg={11}>
                            <Typography variant="body1" sx={{ mb: '10px' }}>
                                This is the final step of the registration process. On the left side, you can see your place card.
                                You have filled it with your data - now you can make it beautiful by uploading images presenting your place.
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

                            <Tooltip open={tooltipOpen} onClose={handleClose} onOpen={handleOpen} title="Please upload a logo picture">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    disabled={!currentPlace.logo}
                                    size="large"
                                    onClick={() => setOpen(true)}

                                > Finish registration
                                </Button>
                            </Tooltip>
                        </Grid>
                    </CardContent>
                </Card>
            </div>

        </Slide>

    )
}