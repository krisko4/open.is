// @flow 
import { Grid, Rating, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useCurrentPlaceContext } from '../../../../../../contexts/PanelContexts/CurrentPlaceContext';
import { Opinions } from '../../../../../reusable/Opinions/Opinions';
type Props = {

};

const StyledRating = styled(Rating)({
    marginTop: 20,
    '& .MuiSvgIcon-root': {
        height: '100px',
        width: '100px'
    }
})

export const Overview = (props: Props) => {
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    return (
        <Scrollbars>
            <Grid container sx={{ height: '100%' }} alignItems="center" direction="column" justifyContent="center">
                <StyledRating readOnly value={currentPlace.averageNote?.average || 0} />
                <Typography variant="h3">
                    Average note: {currentPlace.averageNote?.average || 0}
                </Typography>
                <Grid container sx={{ flexGrow: 1 }}>
                    <Opinions
                        currentPlace={currentPlace}
                        setCurrentPlace={setCurrentPlace}
                    />
                </Grid>
            </Grid>

        </Scrollbars>
    );
};