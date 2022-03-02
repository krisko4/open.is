import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsIcon from '@mui/icons-material/Settings';
import { LoadingButton } from '@mui/lab';
import { Tooltip, Box, Button, CardMedia, Fade, Grid, IconButton, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography, DialogTitle, Dialog, DialogContent, TextField, DialogActions } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../../contexts/PanelContexts/BusinessChainContext';
import { LocationProps, RawPlaceDataProps } from '../../../../../contexts/PlaceProps';
import { setPlace } from '../../../../../store/actions/setCurrentPlace';
import { convertToCurrentPlace } from '../../../../../utils/place_data_utils';
import DialogTransition from '../../../../reusable/DialogTransition';
import { BusinessChainTable } from './BusinessChainTable';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
type Props = {

};


export const Locations = (props: Props) => {

    const { businessChain } = useBusinessChainContext()


    return (
        <Scrollbars>
            <Fade in={true} timeout={1000}>
                <Grid container sx={{ height: '100%' }}>
                    <Paper variant="outlined" sx={{ flexGrow: 1 }} square>
                        <Paper sx={{ height: '100%', pt: 2 }} square>
                            <Toolbar>
                                <Grid container alignItems="center">
                                    <Grid item lg={2}>
                                        <CardMedia
                                            style={{ height: 200, backgroundSize: 'contain',  width: 200, marginTop: 10, borderRadius: 20 }}
                                            image={businessChain.logo as string}
                                        />
                                    </Grid>
                                    <Grid container item lg={10} direction="column">
                                        <Typography variant="h2">
                                            {businessChain.name}
                                        </Typography>
                                        <Typography variant="h6">
                                            {businessChain.subtitle}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                            <BusinessChainTable />
                        </Paper>
                    </Paper>
                </Grid>
            </Fade>
        </Scrollbars>
    );
};