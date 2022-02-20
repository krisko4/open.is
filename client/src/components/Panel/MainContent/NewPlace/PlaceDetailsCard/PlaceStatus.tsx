import { Alert, Tooltip } from "@mui/material"
import { useMemo } from "react"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const PlaceStatus = () => {
    const { currentPlace } = useCurrentPlaceContext()
    return useMemo(() => {
        return (
            <Tooltip title={'This is a current status of your place'}>
                <Alert severity="error" variant="filled" >
                    This place is now <b>{currentPlace.status?.toUpperCase() || 'CLOSED'}</b>
                </Alert>
            </Tooltip>
        )
    }, [currentPlace.status])
}