import AddIcon from '@mui/icons-material/Add';
import { Fade, Button, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOpeningHoursForSelectedLocationQuery } from 'redux-toolkit/api/placesApi';
import { useColorMode } from '../../../contexts/ColorModeContext';
import { OpeningHoursCard } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHoursCard';
import { Destinations } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/PlaceBoard';


const defaultHours = {
    monday: {
        isOpen: true
    },
    tuesday: {
        isOpen: true
    },
    wednesday: {
        isOpen: true
    },
    thursday: {
        isOpen: true
    },
    friday: {
        isOpen: true
    },
    saturday: {
        isOpen: false
    },
    sunday: {
        isOpen: false
    },
}

export const OpeningHours: FC = () => {
    return (
        <Fade in={true} timeout={500}>
            <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                <Grid item lg={10} sx={{ mt: 1, mb: 1 }}>
                    <Alert severity="info" variant="filled" sx={{mb: 1}}>
                        This is just an example. You will be able to specify opening hours after your place is registered.
                    </Alert>
                    <OpeningHoursCard openingHours={defaultHours} />
                </Grid>
            </Grid>
        </Fade >
    );
};

