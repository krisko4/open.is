import { LoadingButton } from "@mui/lab"
import { DialogContent, Dialog, DialogTitle, DialogActions, Grid, Button } from "@mui/material"
import { FC, useState } from "react"
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice"
import { useBusinessChainContext } from "../../../../../contexts/PanelContexts/BusinessChainContext"
import { useLocationContext } from "../../../../../contexts/PanelContexts/LocationContext"
import { LocationProps, RawPlaceDataProps } from "../../../../../contexts/PlaceProps"
import { addLocations } from "../../../../../requests/PlaceRequests"
import { useCustomSnackbar } from "../../../../../utils/snackbars"

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAddLocationsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>,

}
export const LocationsConfirmDialog: FC<Props> = ({ dialogOpen, setDialogOpen, setAddLocationsDialogOpen }) => {
    const { selectedLocations } = useLocationContext()
    const { businessChain, setBusinessChain } = useBusinessChainContext()
    const [loading, setLoading] = useState(false)
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const places = usePlacesSelector()

    const handleClick = async () => {
        setLoading(true)
        try {
            const locations: LocationProps[] = selectedLocations.map(location => {
                const newLocation = { ...location }
                delete newLocation['isValid']
                newLocation.facebook = `https://facebook.com/` + newLocation.facebook
                newLocation.instagram = `https://instagram.com/` + newLocation.instagram
                return newLocation
            })
            const res = await addLocations(businessChain._id as string, locations)
            console.log(res.data)
            businessChain.locations = [...res.data.locations]
            setBusinessChain({...businessChain})
            setDialogOpen(false)
            if (setAddLocationsDialogOpen) setAddLocationsDialogOpen(false)
        } catch (err) {
            console.log(err)
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)

        }
    }

    return (
        <Dialog open={dialogOpen}
        >
            <DialogTitle>
                Confirm new locations
            </DialogTitle>
            <DialogContent>
                You have decided to add <b>{selectedLocations.length}</b> new {selectedLocations.length === 1 ? 'location' : 'locations'} to your business chain.
                Are you sure you would like to save your changes?
            </DialogContent>
            <DialogActions>
                <Grid container justifyContent="space-between">
                    <Button disabled={loading} onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={loading}
                        disabled={loading}
                        onClick={handleClick}
                    >
                        Yes, I am sure
                    </LoadingButton>
                </Grid>

            </DialogActions>

        </Dialog>

    )
}