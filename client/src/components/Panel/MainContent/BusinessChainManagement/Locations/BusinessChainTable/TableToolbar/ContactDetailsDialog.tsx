import { Button, Divider, ListItemText, List, ListItem, Dialog, AppBar, Toolbar, IconButton, Typography, Grid, Card, CardContent } from "@mui/material"
import { FC } from "react"
import { useBusinessChainSelector } from "redux-toolkit/slices/businessChainSlice"
import { useBusinessChainContext } from "../../../../../../../contexts/PanelContexts/BusinessChainContext"
import DialogTransition from "../../../../../../reusable/DialogTransition"
import { FullHeightDialog } from "../../../../../../reusable/FullHeightDialog"
import { ContactDetailsEditForm } from "./ContactDetailsEditForm"

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedLocations: string[],
}
export const ContactDetailsDialog: FC<Props> = ({ dialogOpen, setDialogOpen, selectedLocations}) => {

    const  businessChain  = useBusinessChainSelector()

    return (
        <FullHeightDialog
            title="Contact details management"
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
        >
            <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center" justifyContent="space-evenly">
                <Grid container justifyContent="space-evenly" alignItems="center">
                    <Grid item lg={5}>
                        <ContactDetailsEditForm
                            selectedLocations={selectedLocations}
                            setDialogOpen={setDialogOpen}
                        />
                    </Grid>
                    <Grid item lg={5}>
                        <Card sx={{ minHeight: '500px' }}>
                            <CardContent>
                                <Typography variant="h3">
                                    Contact details management
                                </Typography>
                                <Grid container item style={{ marginTop: 10 }} lg={11}>
                                    <Typography variant="body1">
                                        You have selected <b>{selectedLocations.length}</b> {selectedLocations.length === 1 ? 'location' : 'locations'}.
                                        The changes will be applied to each selected location.
                                    </Typography>
                                </Grid>
                                <List>
                                    {
                                        selectedLocations.map((locId) => {
                                            return <>
                                                <Divider />
                                                <ListItem key={locId}>
                                                    <ListItemText
                                                        secondary={businessChain.locations.find(loc => loc._id === locId)?.address}
                                                    />
                                                </ListItem>
                                            </>
                                        })
                                    }
                                </List>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </FullHeightDialog >
    )
}