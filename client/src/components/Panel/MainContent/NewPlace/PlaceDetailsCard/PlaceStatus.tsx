import { Alert, Tooltip } from "@mui/material"
import { useStatusSelector } from "redux-toolkit/slices/currentPlaceSlice"

export const PlaceStatus = () => {
    const status = useStatusSelector()

    return (
        <Tooltip title={'This is a current status of your place'}>
            {status === 'open' ?
                <Alert severity="success" variant="filled" >
                    This place is now OPEN
                </Alert>
                : <Alert severity="error" variant="filled" >
                    This place is now CLOSED
                </Alert>
            }
        </Tooltip>
    )

}