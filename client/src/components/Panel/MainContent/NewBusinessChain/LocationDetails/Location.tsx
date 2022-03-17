import { ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Grow, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { useLocationContext } from '../../../../../contexts/PanelContexts/LocationContext';
import { LocationProps } from '../../../../../redux-toolkit/slices/PlaceProps';
import { LocationDetailsForm } from './LocationDetailsForm/LocationDetailsForm';

interface Props {
  location: LocationProps,
  setValidationStateChanged: React.Dispatch<React.SetStateAction<boolean>>
}


export const Location: FC<Props> = ({ location, setValidationStateChanged }) => {

  let { setSelectedLocations, selectedLocations } = useLocationContext();

  const deleteLocation = (e: any) => {
    e.preventDefault();
    const newSelectedLocations = selectedLocations.filter(loc => location !== loc);
    // setLocations([...newSelectedLocations])
    setValidationStateChanged((state) => !state);
    setSelectedLocations([...newSelectedLocations]);
  };


  return (
        <Grow timeout={1000} in={true}>
            <Accordion style={{ flexGrow: 1 }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item lg={11}>
                            <Typography variant="subtitle2">{location.address}</Typography>
                        </Grid>
                        <IconButton onClick={deleteLocation} size="large"><DeleteIcon color="error" /></IconButton>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <LocationDetailsForm
                        setValidationStateChanged={setValidationStateChanged}
                        location={location} />
                </AccordionDetails>
            </Accordion >
        </Grow>
  );
};