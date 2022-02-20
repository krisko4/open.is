import { Typography } from "@mui/material"
import React from "react"
import { FC} from "react"
interface Props {
    name: string
}
export const PlaceName: FC<Props> = ({ name }) => {
    console.log('hai')
    return (
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            {name || 'This is the name of your business'}
        </Typography>

    )
}

export const MemoizedPlaceName = React.memo(PlaceName)