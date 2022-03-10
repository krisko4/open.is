import { Card, CardContent, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { FC } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useLocationsSelector } from "redux-toolkit/slices/businessChainSlice"
import { FullHeightDialog } from "../../../../../../reusable/FullHeightDialog"
import { ContactDetailsEditForm } from "./ContactDetailsEditForm"

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedLocations: string[],
}
export const ContactDetailsDialog: FC<Props> = ({ dialogOpen, setDialogOpen, selectedLocations }) => {

    const locations = useLocationsSelector()

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
                        <Card sx={{ height: '500px' }}>
                            <CardContent sx={{ height: '100%' }}>
                                <Grid container direction="column" sx={{ height: '100%' }}>
                                    <Typography variant="h3">
                                        Contact details management
                                    </Typography>
                                    <Typography variant="body1" sx={{mt: 1, mb: 1}}>
                                        You have selected <b>{selectedLocations.length}</b> {selectedLocations.length === 1 ? 'location' : 'locations'}.
                                        The changes will be applied to each selected location.
                                    </Typography>
                                    <Grid container sx={{ flexGrow: 1 }}>
                                        <Scrollbars>
                                                <List>
                                                    {
                                                        selectedLocations.map((locId) => {
                                                            return <div key={locId}>
                                                                <Divider />
                                                                <ListItem key={locId}>
                                                                    <ListItemText
                                                                        secondary={locations.find(loc => loc._id === locId)?.address}
                                                                    />
                                                                </ListItem>
                                                            </div>
                                                        })
                                                    }
                                                </List>
                                        </Scrollbars>
                                    </Grid>

                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        </FullHeightDialog >
    )
}