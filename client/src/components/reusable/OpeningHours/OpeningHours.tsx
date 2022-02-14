import { SlideProps, Slide, Grid, Typography, Dialog, DialogTitle, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ClassNameMap } from '@mui/styles';
import React, { FC, useState } from 'react';
import { useLoginContext } from "../../../contexts/LoginContext";
import { CurrentPlaceProps } from "../../../contexts/PanelContexts/CurrentPlaceContext";
import { OpeningHoursForm } from './OpeningHoursForm';
import { OpeningHoursCard } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHoursCard';
const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);


interface Props {
    currentPlace?: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<any>,
}



export const OpeningHours: FC<Props> = ({ currentPlace, setCurrentPlace }) => {

    const { userData } = useLoginContext()
    const openingHours = currentPlace && currentPlace.openingHours
    const [dialogOpen, setDialogOpen] = useState(false)


    return (
        <Grid container direction="column" style={{ height: '100%' }} alignItems="center">
            {/* {currentPlace?.isUserOwner && userData.isLoggedIn && openingHours &&
                <Grid container justifyContent="flex-end" >
                    <Grid item style={{ paddingRight: 30, paddingTop: 30 }}>
                        <Button startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} variant="contained" color="primary">Set opening hours</Button>
                    </Grid>
                </Grid>
            } */}
            {
                openingHours ? <>


                    <Grid container style={{ flexGrow: 1 }} justifyContent="center" alignItems="center" >
                        {currentPlace.alwaysOpen ? <>
                            <img style={{width: '100%'}} src="https://cdn.dribbble.com/users/1354693/screenshots/10231698/open_247.gif" />
                        </> :
                            <Grid item lg={10}>
                                <OpeningHoursCard openingHours={openingHours} />
                            </Grid>
                        }
                    </Grid>


                </>

                    : <>
                        {currentPlace?.isUserOwner ?
                            <Grid justifyContent="center" style={{ height: '100%' }} direction="column" alignItems="center" container>
                                <Typography variant="h6">This place has not set opening hours yet.</Typography>
                                <Typography variant="subtitle1">Press the button below to set opening hours.</Typography>
                                <Button startIcon={<AddIcon />} style={{ marginTop: 10 }} onClick={() => setDialogOpen(true)} variant="contained" color="primary">Set opening hours</Button>
                            </Grid>
                            :
                            <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                            </Grid>
                        }
                    </>
            }

            {userData.isLoggedIn && currentPlace?.isUserOwner &&
                <Dialog
                    open={dialogOpen}
                    maxWidth="sm"
                    TransitionComponent={Transition}
                    onClose={() => setDialogOpen(false)}


                >
                    <DialogTitle className="dialogTitle">Opening hours management</DialogTitle>
                    <OpeningHoursForm
                        currentPlace={currentPlace}
                        openingHours={openingHours}
                        setCurrentPlace={setCurrentPlace}
                        setDialogOpen={setDialogOpen}

                    />

                </Dialog>
            }
        </Grid >
    );
};

