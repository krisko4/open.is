import { Typography } from "@mui/material"
import React from "react"
import { FC} from "react"
interface Props {
    subtitle: string
}
export const PlaceSubtitle: FC<Props> = ({ subtitle }) => {
    return (
        <Typography variant="h6">
            {subtitle || 'This is a short subtitle of your business'}
        </Typography>

    )
}

export const MemoizedPlaceSubtitle = React.memo(PlaceSubtitle)