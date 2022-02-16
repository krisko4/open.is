import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Typography } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete'
import { FC } from "react"
import { useLocationContext } from "../../../../../contexts/PanelContexts/LocationContext"
import { LocationDetails } from "./LocationDetails"
import { LocationDetailsForm } from './LocationDetailsForm/LocationDetailsForm'
import { LocationProps } from "../../../../../contexts/PanelContexts/BusinessChainContext"

interface Props {
    location: LocationProps,
    setValidationStateChanged: React.Dispatch<React.SetStateAction<boolean>>
}


export const Location: FC<Props> = ({ location, setValidationStateChanged}) => {

    let { setSelectedLocations, selectedLocations } = useLocationContext()

    const deleteLocation = (e: any) => {
        e.preventDefault()
        const newSelectedLocations = selectedLocations.filter(loc => location !== loc)
        // setLocations([...newSelectedLocations])
        setValidationStateChanged((state) => !state)
        setSelectedLocations([...newSelectedLocations])
    }


    return (
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
                    setValidationStateChanged={ setValidationStateChanged}
                    location={location} />
            </AccordionDetails>
        </Accordion >
    );
}