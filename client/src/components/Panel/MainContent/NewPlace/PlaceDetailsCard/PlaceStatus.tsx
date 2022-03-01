import { Alert, Tooltip } from "@mui/material"
import { useMemo } from "react"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const PlaceStatus = () => {
    const { currentPlace } = useCurrentPlaceContext()
    return useMemo(() => {
        return (
            <Tooltip title={'This is a current status of your place'}>
                {currentPlace.status === 'open' ?
                    <Alert severity="success" variant="filled" >
                        This place is now {currentPlace.status?.toUpperCase() }
                    </Alert>
                    : <Alert severity="error" variant="filled" >
                        This place is now {currentPlace.status?.toUpperCase() }
                    </Alert>
                }
            </Tooltip>
        )
    }, [currentPlace.status])
}