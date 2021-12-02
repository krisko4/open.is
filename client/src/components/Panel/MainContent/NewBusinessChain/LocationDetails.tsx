import { Grid, Typography } from "@material-ui/core"
import React, { FC, useEffect, useRef } from "react"
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext"

interface Props{
    addressSubmitted : boolean
}

export const LocationDetails: FC<Props> = ({addressSubmitted}) => {

    const {currentPlace, setCurrentPlace} = useCurrentPlaceContext()
    const isFirstRender = useRef(true)

    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = false
            return
        }
        console.log(currentPlace)
    }, [addressSubmitted])

    return (
        <Grid container alignItems="center" justify="center" style={{ height: '100%', borderLeftStyle: 'solid', borderWidth: 1, borderColor: 'lightgrey' }}>
            <Grid container item justify="center" lg={10}>
                <Typography variant="h3">Waiting for the first location...</Typography>
                <Grid item lg={8} style={{marginTop: 10}}>
                    <img src={`${process.env.REACT_APP_BASE_URL}/images/location.gif`} style={{ width: '100%' }} />
                </Grid>

            </Grid>
        </Grid>
    )
}