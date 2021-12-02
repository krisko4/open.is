import { AppBar, Dialog, Grid, IconButton, Slide, SlideProps, Toolbar, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, { FC, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { clearPlace, CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { defaultNews, defaultOpinions } from '../../../reusable/defaults';
import { PlaceDetailsCard } from "../NewPlace/PlaceDetailsCard";
import { BusinessInformation } from './BusinessInformation/BusinessInformation'
import { LocationDetails } from './LocationDetails';
import { LocationSelection } from './LocationSelection/LocationSelection';
const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);
interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

enum Steps {
    BUSINESS_INFORMATION,
    BUSINESS_DETAILS
}

export const BusinessChainDialog: FC<Props> = ({ open, setOpen }) => {

    const [currentStep, setCurrentStep] = useState(Steps.BUSINESS_DETAILS)
    const [addressSubmitted, setAddressSubmitted] = useState(false)

    const closeDialog = () => {
        setOpen(false)
        setCurrentStep(Steps.BUSINESS_INFORMATION)
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            fullScreen
        >
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Business chain management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container style={{ height: '100%' }}>
                <CurrentPlaceContextProvider>
                    <Grid item style={{ background: 'white' }} lg={6} xs={9}>
                        <Scrollbars>
                            {currentStep === Steps.BUSINESS_INFORMATION ? <>
                                <BusinessInformation setCurrentStep={setCurrentStep} />
                            </>
                                : <LocationSelection setCurrentStep={setCurrentStep} />
                            }
                        </Scrollbars>
                    </Grid>
                    <Grid item container lg={6}>
                        <Scrollbars>
                            {currentStep === Steps.BUSINESS_INFORMATION ?
                                <Grid container justify="center">
                                    <Grid item lg={11} style={{ marginTop: 20, marginBottom: 20 }}>
                                        <PlaceDetailsCard />
                                    </Grid>
                                </Grid>
                                : <LocationDetails addressSubmitted={addressSubmitted} />
                            }
                        </Scrollbars>
                    </Grid>
                </CurrentPlaceContextProvider>
            </Grid >
        </Dialog >

    )
}