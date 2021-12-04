import { Button, Card, CardContent, Fade, Grid, Paper, Typography } from "@material-ui/core"
import { useSnackbar } from "notistack"
import React, { FC, useEffect, useRef, useState } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { Location } from './Location'
interface Props {
    addressSubmitted: boolean
}

interface LocationDetails {
    address: string,
    phone: string,
    website: string,
    email: string,
    facebook: string,
    instagram: string,
    lat: number,
    lng: number
}


export const LocationDetails: FC<Props> = ({ addressSubmitted }) => {

    const { currentPlace } = useCurrentPlaceContext()
    const isFirstRender = useRef(true)
    const { enqueueSnackbar } = useSnackbar()
    const [selectedPlaces, setSelectedPlaces] = useState<LocationDetails[]>([])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        console.log(currentPlace)
        if (selectedPlaces.some(place => place.address === currentPlace.address)) {
            enqueueSnackbar('You have already selected this location.', {
                variant: 'info'
            })
            return

        }
        const newLocation = {
            address: currentPlace.address,
            lat: currentPlace.lat,
            lng: currentPlace.lng,
            phone: '',
            email: '',
            website: '',
            instagram: '',
            facebook: ''
        }
        selectedPlaces.push(newLocation)
        setSelectedPlaces([...selectedPlaces])
    }, [addressSubmitted])

    useEffect(() => {
        console.log(selectedPlaces)
    }, [selectedPlaces])

    return (
        <Grid container style={{ height: '100%', borderLeftStyle: 'solid', borderWidth: 1, borderColor: 'lightgrey' }}>
            {selectedPlaces.length === 0 ?
                <Fade in={true} timeout={1000}>
                    <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
                        <Grid container item justify="center" lg={10}>
                            <Typography variant="h3">Waiting for the first location...</Typography>
                            <Grid item lg={8} style={{ marginTop: 10 }}>
                                <img src={`${process.env.REACT_APP_BASE_URL}/images/location.gif`} style={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Fade>
                : <>
                    <Grid container style={{ height: '90%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <Scrollbars autoHide>
                                {
                                    selectedPlaces.map((place, index) =>
                                        <Grid item key={place.address} style={{ width: '100%' }}>
                                            <Location setSelectedPlaces={setSelectedPlaces} address={place.address} />
                                        </Grid>
                                    )
                                }
                            </Scrollbars>

                        </div>
                    </Grid>
                    <Grid container style={{ height: '10%' }}>
                        <Paper elevation={5} style={{ flexGrow: 1 }}>
                            <Grid container style={{ height: '100%' }} alignItems="center" justify="flex-end">
                                <Button style={{ marginRight: 20 }} variant="contained" color="primary">Register my business</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </>
            }

        </Grid >



    )
}