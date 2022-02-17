// @flow 
import { Grid, Rating, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import * as React from 'react';
import { useCurrentPlaceContext } from '../../../../../../contexts/PanelContexts/CurrentPlaceContext';
type Props = {
    
};

const StyledRating = styled(Rating)({
    '& .MuiSvgIcon-root': {
        height: '200px',
        width: '200px'
    }
})

export const Overview = (props: Props) => {
    const {currentPlace} = useCurrentPlaceContext()
    return (
        <Grid container sx={{height: '100%'}} alignItems="center" direction="column" justifyContent="center">
            <StyledRating readOnly value={currentPlace.averageNote?.average || 0} /> 
            <Typography variant="h2">
                Average note: {currentPlace.averageNote?.average || 0}
            </Typography>
        </Grid>
    );
};