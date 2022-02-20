import { Typography } from "@mui/material"
import React from "react"
import { FC } from "react"

interface Props {
    type: string | null
}
export const PlaceType: FC<Props> = ({ type }) => {
    return (
        <Typography variant="body1">{type || 'Business type'}</Typography>
    )
}

export const MemoizedPlaceType = React.memo(PlaceType)