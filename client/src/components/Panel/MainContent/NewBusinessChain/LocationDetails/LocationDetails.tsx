import { Grid, Typography } from "@material-ui/core"
import React, { FC, useEffect, useRef, useState } from "react"
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
    const [selectedPlaces, setSelectedPlaces] = useState<LocationDetails[]>([])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        console.log(currentPlace)
        if (!selectedPlaces.some(place => place.lat === currentPlace.lat && place.lng === currentPlace.lng)) {
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
        }
    }, [addressSubmitted])

    useEffect(() => {
        console.log(selectedPlaces)
    }, [selectedPlaces])

    return (
        <Grid container style={{ height: '100%', borderLeftStyle: 'solid', borderWidth: 1, borderColor: 'lightgrey' }}>
            {selectedPlaces.length === 0 ?
                <Grid container style={{ height: '100%' }} justify="center" alignItems="center">
                    <Grid container item justify="center" lg={10}>
                        <Typography variant="h3">Waiting for the first location...</Typography>
                        <Grid item lg={8} style={{ marginTop: 10 }}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/images/location.gif`} style={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                </Grid> :
                <Grid item style={{width: '100%'}}>
                    {
                        selectedPlaces.map((place, index) => <Location key={index} address={place.address} />)
                    }
                </Grid>
            }
        </Grid>



    )
}