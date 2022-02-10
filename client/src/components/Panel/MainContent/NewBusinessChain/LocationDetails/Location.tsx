import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Typography } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete'
import { FC } from "react"
import { useLocationContext } from "../../../../../contexts/PanelContexts/LocationContext"
import { LocationDetails } from "./LocationDetails"
import { TestForm } from './LocationDetailsForm/TestForm'

interface Props {
    location: LocationDetails
}



const handleSubmit = () => {
    console.log('hello')
}


export const Location: FC<Props> = ({location}) => {

    const {setSelectedLocations} = useLocationContext() 

    const deleteLocation = (e: any) => {
        e.preventDefault()
        setSelectedLocations(locations => {
            return locations.filter(loc => location !== loc)
        })
    }


    return (
        <Accordion style={{ flexGrow: 1, background: 'white' }}>
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
                <TestForm location={location}/>
            </AccordionDetails>
        </Accordion >
    );
}