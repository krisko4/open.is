import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {useOpeningHoursDataSelector,  useIdSelector, useIsAlwaysOpenSelector, useIsUserOwnerSelector, useOpeningHoursSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { useColorMode } from '../../../contexts/ColorModeContext';
import { OpeningHoursCard } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHoursCard';
import { Destinations } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/PlaceBoard';


const defaultHours = {
    monday: {
        isOpen: false
    },
    tuesday: {
        isOpen: false
    },
    wednesday: {
        isOpen: false
    },
    thursday: {
        isOpen: false
    },
    friday: {
        isOpen: false
    },
    saturday: {
        isOpen: false
    },
    sunday: {
        isOpen: false
    },
}

export const OpeningHours: FC = () => {

    const {openingHours, alwaysOpen, isUserOwner} = useOpeningHoursDataSelector()
    const placeId = useIdSelector()
    const { mode } = useColorMode()
    const navigate = useNavigate()
    const navigateToOpeningHours = () => {
        navigate(`/panel/management/${placeId}/${Destinations.OPENING_HOURS}`)
    }
    return (
        <Grid container direction="column" style={{ height: '100%' }} alignItems="center">
            {
                openingHours ?
                    <Grid container style={{ flexGrow: 1 }} justifyContent="center" alignItems="center" >
                        {alwaysOpen ? <>
                            <img style={{ width: '100%' }} src={mode === 'light' ? `${process.env.REACT_APP_BASE_URL}/images/open24light.png` : `${process.env.REACT_APP_BASE_URL}/images/open24dark.gif`} />
                        </> :
                            <Grid item lg={10}>
                                <OpeningHoursCard openingHours={openingHours} />
                            </Grid>
                        }
                    </Grid>
                    :
                    <>
                        {isUserOwner ?
                            <Grid justifyContent="center" style={{ height: '100%' }} direction="column" alignItems="center" container>
                                <Typography variant="h6">Opening hours have not been specified yet.</Typography>
                                <Typography variant="subtitle1">Press the button below to set opening hours.</Typography>
                                <Button
                                    startIcon={<AddIcon />}
                                    style={{ marginTop: 10 }}
                                    onClick={() => navigateToOpeningHours()}
                                    variant="contained"
                                    color="primary"
                                >
                                    Set opening hours
                                </Button>
                            </Grid>
                            :
                            <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                                <Grid item lg={10}>
                                    <OpeningHoursCard openingHours={defaultHours} />
                                    <Typography variant="subtitle1">This is just an example. You will be able to specify opening hours after your place is registered.</Typography>
                                </Grid>
                            </Grid>
                        }
                    </>
            }
        </Grid >
    );
};

