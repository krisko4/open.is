import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fade, Grid, Paper, Slide, SlideProps, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { FC, useEffect, useRef, useState } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useHistory } from "react-router-dom"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { useLocationContext } from '../../../../../contexts/PanelContexts/LocationContext'
import { registerNewPlace } from "../../../../../requests/PlaceRequests"
import { useCustomSnackbar } from "../../../../../utils/snackbars"
import { LoadingButton } from "../../../../reusable/LoadingButton"
import { Location } from './Location'
import { animateScroll as scroll } from 'react-scroll'

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface Props {
    addressSubmitted: boolean,
    imageFile: File | null,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export interface LocationDetails {
    address: string,
    phone: string,
    website: string,
    email: string,
    facebook: string,
    instagram: string,
    lat: number,
    lng: number
}

export const LocationDetails: FC<Props> = ({ setOpen, addressSubmitted, imageFile }) => {

    const { currentPlace } = useCurrentPlaceContext()
    const isFirstRender = useRef(true)
    const [loading, setLoading] = useState(false)
    const { enqueueInfoSnackbar, enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const history = useHistory()
    const { setSaveButtonClicked, selectedLocations, setSelectedLocations, errorsDetected } = useLocationContext()
    const [businessSummary, setBusinessSummary] = useState({
        name: currentPlace.name,
        subtitle: currentPlace.subtitle,
        type: currentPlace.type,
        description: currentPlace.description,
        img: currentPlace.logo,
        locations: selectedLocations
    })

    const registerNewBusiness = async () => {

        setLoading(true)
        const formData = new FormData()
        const { locations } = businessSummary
        businessSummary.img = imageFile
        //@ts-ignore
        delete businessSummary['locations']
        console.log(locations)
        console.log(businessSummary)
        let key: keyof typeof businessSummary
        //@ts-ignore
        for (key in businessSummary) formData.append(key, businessSummary[key])
        formData.append('locations', JSON.stringify(locations))
        try {
            const res = await registerNewPlace(formData)
            console.log(res.data)
            enqueueSuccessSnackbar('You have successfully registered your business chain')
            setDialogOpen(false)
            setOpen(false)
            history.push('dashboard')

        } catch (err) {
            console.log(err)
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }


    }

    const [dialogOpen, setDialogOpen] = useState(false)


    const handleSaveButtonClick = () => {
        console.log(businessSummary)
        setSaveButtonClicked(state => !state)
        // setDialogOpen(true)
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (selectedLocations.some(place => place.address === currentPlace.address)) {
            enqueueInfoSnackbar('You have already selected this location.')
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
        selectedLocations.push(newLocation)

        setSelectedLocations([...selectedLocations])
    }, [addressSubmitted])

    useEffect(() => {
        setBusinessSummary(summary => {
            return {
                ...summary,
                locations: selectedLocations
            }
        })
    }, [selectedLocations])

    return (
        <Grid container style={{ height: '100%', paddingTop: 1 }}>
            <Paper square sx={{ flexGrow: 1, height: '100%' }}>
                {selectedLocations.length === 0 ?
                    <Fade in={true} timeout={1000}>
                        <Grid container style={{ height: '100%' }} justifyContent="center" alignItems="center">
                            <Typography variant="h3">Waiting for the first location...</Typography>
                            <Grid item lg={8} style={{ marginTop: 10 }}>
                                <img src={`${process.env.REACT_APP_BASE_URL}/images/location.gif`} style={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                    </Fade>
                    : <>
                        <Grid container style={{ height: '90%' }}>
                            <Scrollbars>
                                <div style={{ flexGrow: 1 }}>
                                    {
                                        selectedLocations.map((location) =>
                                            <Grid item key={location.address} style={{ width: '100%' }}>
                                                <Location
                                                    location={location}
                                                />
                                            </Grid>
                                        )
                                    }
                                </div>
                            </Scrollbars>
                        </Grid>
                        <Grid container style={{ height: '10%' }}>
                            <Paper elevation={3} style={{ flexGrow: 1 }}>
                                <Grid container style={{ height: '100%' }} alignItems="center" justifyContent="flex-end">
                                    <Button disabled={errorsDetected} style={{ marginRight: 20 }} onClick={handleSaveButtonClick} variant="contained" color="primary">Continue</Button>
                                </Grid>
                            </Paper>
                        </Grid>
                    </>
                }

            </Paper>

        </Grid >

    );
}