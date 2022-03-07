import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../../../contexts/ColorModeContext';
import { useLoginContext } from "../../../contexts/LoginContext";
import { CurrentPlaceProps } from '../../../contexts/PlaceProps';
import { OpeningHoursCard } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHoursCard';
import { Destinations } from '../../Panel/MainContent/PlaceManagement/PlaceBoard/PlaceBoard';

interface Props {
    currentPlace?: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<any>,
}



export const OpeningHours: FC<Props> = ({ currentPlace, setCurrentPlace }) => {

    const { userData } = useLoginContext()
    const openingHours = currentPlace && currentPlace.openingHours
    const [dialogOpen, setDialogOpen] = useState(false)
    const { mode } = useColorMode()
    const navigate = useNavigate()

    const navigateToOpeningHours = () => {
        navigate(`/panel/management/${currentPlace?._id}/${Destinations.OPENING_HOURS}`)

    }


    return (
        <Grid container direction="column" style={{ height: '100%' }} alignItems="center">
            {
                openingHours ?
                    <Grid container style={{ flexGrow: 1 }} justifyContent="center" alignItems="center" >
                        {currentPlace.alwaysOpen ? <>
                            <img style={{ width: '100%' }} src={mode === 'light' ? `${process.env.REACT_APP_BASE_URL}/images/open24light.png` : `${process.env.REACT_APP_BASE_URL}/images/open24dark.gif`} />
                        </> :
                            <Grid item lg={10}>
                                <OpeningHoursCard openingHours={openingHours} />
                            </Grid>
                        }
                    </Grid>
                    :
                    <>
                        {currentPlace?.isUserOwner ?
                            <Grid justifyContent="center" style={{ height: '100%' }} direction="column" alignItems="center" container>
                                <Typography variant="h6">Opening hours have not been specified yet.</Typography>
                                <Typography variant="subtitle1">Press the button below to set opening hours.</Typography>
                                <Button
                                    startIcon={<AddIcon />}
                                    style={{ marginTop: 10 }}
                                    onClick={() => navigateToOpeningHours()}
                                    variant="contained"
                                    color="primary"
                                >
                                    Set opening hours
                                </Button>
                            </Grid>
                            :
                            <Grid style={{ height: '100%' }} container justifyContent="center" alignItems="center">
                            </Grid>
                        }
                    </>
            }
        </Grid >
    );
};

