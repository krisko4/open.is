import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Fade, Grid, Paper, Typography } from "@material-ui/core"
import { useSnackbar } from "notistack"
import React, { FC, useEffect, useRef, useState } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { Location } from './Location'
import { useLocationContext } from '../../../../../contexts/PanelContexts/LocationContext'
import { authAxios } from "../../../../../axios/axios"
import { useBusinessChainContext } from "../../../../../contexts/PanelContexts/BusinessChainContext"
interface Props {
    addressSubmitted: boolean
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

export const LocationDetails: FC<Props> = ({ addressSubmitted }) => {

    const { businessChain } = useBusinessChainContext()
    const isFirstRender = useRef(true)
    const { enqueueSnackbar } = useSnackbar()
    const { setSaveButtonClicked, selectedLocations, setSelectedLocations } = useLocationContext()
    const [businessSummary, setBusinessSummary] = useState({
        name: businessChain.name,
        subtitle: businessChain.subtitle,
        type: businessChain.type,
        description: businessChain.description,
        img: businessChain.img,
        locations: selectedLocations
    })

    const registerNewBusiness = () => {
        console.log(businessSummary)
        // authAxios.post('/')
    }

    const [dialogOpen, setDialogOpen] = useState(false)


    const handleSaveButtonClick = () => {
        setSaveButtonClicked(state => !state)
        setDialogOpen(true)
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        // console.log(businessChain)
        // const {locations} = businessChain

        // if (selectedLocations.some(place => place.address === businessChain.address)) {
        //     enqueueSnackbar('You have already selected this location.', {
        //         variant: 'info'
        //     })
        //     return
        // }
        // const newLocation = {
        //     address: businessChain.address,
        //     lat: businessChain.lat,
        //     lng: businessChain.lng,
        //     phone: '',
        //     email: '',
        //     website: '',
        //     instagram: '',
        //     facebook: ''
        // }
        // selectedLocations.push(newLocation)

        setSelectedLocations([...businessChain.locations])
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
        <Grid container style={{ height: '100%', borderLeftStyle: 'solid', borderWidth: 1, borderColor: 'lightgrey' }}>
            {selectedLocations.length === 0 ?
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
                                    selectedLocations.map((location) =>
                                        <Grid item key={location.address} style={{ width: '100%' }}>
                                            <Location
                                                location={location}
                                            />
                                        </Grid>
                                    )
                                }
                            </Scrollbars>

                        </div>
                    </Grid>
                    <Grid container style={{ height: '10%' }}>
                        <Paper elevation={5} style={{ flexGrow: 1 }}>
                            <Grid container style={{ height: '100%' }} alignItems="center" justify="flex-end">
                                <Button style={{ marginRight: 20 }} onClick={handleSaveButtonClick} variant="contained" color="primary">Register my business</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Dialog open={dialogOpen}>
                        <DialogTitle>
                            Business registration confirmation
                        </DialogTitle>
                        <DialogContent>
                            You have selected <b>{selectedLocations.length}</b> {selectedLocations.length > 1 ? 'locations' : 'location'}. Are you sure you would like to register your business?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
                            <Button onClick={() => registerNewBusiness()} color="primary">Yes, I am sure</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }

        </Grid >



    )
}