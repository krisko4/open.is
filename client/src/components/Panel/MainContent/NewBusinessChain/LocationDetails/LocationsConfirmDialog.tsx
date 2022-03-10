import { LoadingButton } from "@mui/lab"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FC } from "react"
import { useAddLocationsMutation } from "redux-toolkit/api/placesApi"
import { useAppDispatch } from "redux-toolkit/hooks"
import { useBusinessChainIdSelector } from "redux-toolkit/slices/businessChainSlice"
import { useLocationContext } from "../../../../../contexts/PanelContexts/LocationContext"
import { LocationProps } from "../../../../../contexts/PlaceProps"
import { useCustomSnackbar } from "../../../../../utils/snackbars"

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAddLocationsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>,

}
export const LocationsConfirmDialog: FC<Props> = ({ dialogOpen, setDialogOpen, setAddLocationsDialogOpen }) => {
    const { selectedLocations } = useLocationContext()
    // const [loading, setLoading] = useState(false)
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const businessChainId = useBusinessChainIdSelector()
    const [addLocations, { isLoading }] = useAddLocationsMutation()

    const dispatch = useAppDispatch()

    const handleClick = async () => {
        // setLoading(true)
        try {
            const locations: LocationProps[] = selectedLocations.map(location => {
                const newLocation = { ...location }
                delete newLocation['isValid']
                newLocation.facebook = `https://facebook.com/` + newLocation.facebook
                newLocation.instagram = `https://instagram.com/` + newLocation.instagram
                return newLocation
            })
            await addLocations({
                placeId: businessChainId as string,
                locations: locations
            })
            // const res = await addLocations(businessChainId as string, locations)
            // const updatedLocations = res.data.locations
            // dispatch(setLocations(updatedLocations))
            enqueueSuccessSnackbar('You have successfully added new locations')
            if (setAddLocationsDialogOpen) setAddLocationsDialogOpen(false)
        } catch (err) {
            console.log(err)
            enqueueErrorSnackbar()
        } finally {
            // setLoading(false)

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
                    <Button disabled={isLoading} onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleClick}
                    >
                        Yes, I am sure
                    </LoadingButton>
                </Grid>

            </DialogActions>

        </Dialog>

    )
}