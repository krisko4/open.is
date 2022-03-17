import { Fade, Grid, Alert } from '@mui/material';
import React, { FC } from 'react';
import { OpeningHoursCard } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHoursCard';


const defaultHours = {
  monday: {
    isOpen: true,
  },
  tuesday: {
    isOpen: true,
  },
  wednesday: {
    isOpen: true,
  },
  thursday: {
    isOpen: true,
  },
  friday: {
    isOpen: true,
  },
  saturday: {
    isOpen: false,
  },
  sunday: {
    isOpen: false,
  },
};

export const OpeningHours: FC = () => {
  return (
        <Fade in={true} timeout={500}>
            <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                <Grid item lg={10} sx={{ pt: 2, pb: 2 }}>
                    <Alert severity="info" variant="filled" sx={{ mb: 1 }}>
                        This is just an example. You will be able to specify opening hours after your place is registered.
                    </Alert>
                    <OpeningHoursCard openingHours={defaultHours} />
                </Grid>
            </Grid>
        </Fade >
  );
};

