import { Card, CardContent, Typography } from "@mui/material"
import React from 'react'
import { FC } from "react"

interface Props {
    description: string
}
export const PlaceDescription: FC<Props> = ({ description }) => {
    return (
        <Card elevation={10} style={{ flexGrow: 1 }}>
            <CardContent>
                <div style={{ display: 'inline-block', overflowWrap: 'break-word' }}>
                    <Typography variant="body1" >
                        {description || 'This is a brief description of your business. In this section you can make your visitors interested in your company.'}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )

}

export const MemoizedPlaceDescription = React.memo(PlaceDescription)