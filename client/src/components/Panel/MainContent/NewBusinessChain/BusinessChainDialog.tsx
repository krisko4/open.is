import { AppBar, Dialog, Grid, IconButton, Slide, SlideProps, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { CurrentPlaceContextProvider } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { PlaceDetailsCard } from "../NewPlace/PlaceDetailsCard";
import { BusinessInformation } from './BusinessInformation/BusinessInformation';
import { LocationDetails } from './LocationDetails/LocationDetails';
import { LocationSelection } from './LocationDetails/LocationSelection';
import { LocationContextProvider } from '../../../../contexts/PanelContexts/LocationContext'
import { SettingsInputComponentRounded } from "@mui/icons-material";
import DialogTransition from "../../../reusable/DialogTransition";
interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

enum Steps {
    BUSINESS_INFORMATION,
    BUSINESS_DETAILS
}

export const BusinessChainDialog: FC<Props> = ({ open, setOpen }) => {

    const [currentStep, setCurrentStep] = useState(Steps.BUSINESS_INFORMATION)
    const [addressSubmitted, setAddressSubmitted] = useState(false)

    const [imageFile, setImageFile] = useState<File | null>(null)
    const closeDialog = () => {
        setOpen(false)
        setCurrentStep(Steps.BUSINESS_INFORMATION)
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={DialogTransition}
            fullScreen
        >
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeDialog}
                        aria-label="close"
                        size="large">
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
                            {/* {currentStep === Steps.BUSINESS_INFORMATION ? <>
                                <BusinessInformation setImageFile={setImageFile} setCurrentStep={setCurrentStep} />
                            </>
                                : <LocationSelection setAddressSubmitted={setAddressSubmitted}  />
                            } */}
                        </Scrollbars>
                    </Grid>
                    <Grid item container lg={6}>
                        {/* <Scrollbars>
                            {currentStep === Steps.BUSINESS_INFORMATION ?
                                <Grid container justifyContent="center">
                                    <Grid item lg={11} style={{ marginTop: 20, marginBottom: 20 }}>
                                        <PlaceDetailsCard />
                                    </Grid>
                                </Grid>
                                :
                                <LocationContextProvider>
                                     <LocationDetails setOpen={setOpen} addressSubmitted={addressSubmitted} /> 
                                </LocationContextProvider>
                            }
                        </Scrollbars> */}
                    </Grid>
                </CurrentPlaceContextProvider>
            </Grid >
        </Dialog >
    );
}