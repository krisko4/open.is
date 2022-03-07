import { Card, CardContent, Typography } from "@mui/material"
import React from 'react'
import { FC } from "react"
import { useDescriptionSelector } from "redux-toolkit/slices/currentPlaceSlice"

export const PlaceDescription: FC = () => {
    const description = useDescriptionSelector()
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
