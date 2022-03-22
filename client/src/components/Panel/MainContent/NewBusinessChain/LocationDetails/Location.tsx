import { ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Grow, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { removeFormLocationByAddressId } from 'redux-toolkit/slices/formLocationsSlice';
import { SelectedLocationProps } from 'redux-toolkit/slices/selectedLocationsSlice';
// import { useLocationContext } from '../../../../../contexts/PanelContexts/LocationContext';
import { LocationDetailsForm } from './LocationDetailsForm/LocationDetailsForm';

interface Props {
  location: SelectedLocationProps;
}

export const Location: FC<Props> = ({ location }) => {
  //   let { setSelectedLocations, selectedLocations } = useLocationContext();
  const dispatch = useAppDispatch();

  const deleteLocation = (e: any) => {
    e.preventDefault();
    if (location.addressId) {
      dispatch(removeFormLocationByAddressId(location.addressId));
    }
    // setSelectedLocations(locations => locations.filter(loc => location !== loc));
    //   const newSelectedLocations = selectedLocations.filter(loc => location !== loc);
    //   // setLocations([...newSelectedLocations])
    //   setValidationStateChanged((state) => !state);
    //   setSelectedLocations([...newSelectedLocations]);
  };

  return (
    <Grow timeout={1000} in={true}>
      <Accordion style={{ flexGrow: 1 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item lg={11}>
              <Typography variant="subtitle2">{location.address}</Typography>
            </Grid>
            <IconButton onClick={deleteLocation} size="large">
              <DeleteIcon color="error" />
            </IconButton>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <LocationDetailsForm location={location} />
        </AccordionDetails>
      </Accordion>
    </Grow>
  );
};
