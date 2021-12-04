import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Typography } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import DeleteIcon from '@material-ui/icons/Delete'
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
                <Grid container justify="space-between" alignItems="center">
                    <Grid item lg={11}>
                        <Typography variant="subtitle2">{location.address}</Typography>
                    </Grid>
                    <IconButton onClick={deleteLocation}><DeleteIcon color="secondary" /></IconButton>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <TestForm location={location}/>
            </AccordionDetails>
        </Accordion >
    )
}