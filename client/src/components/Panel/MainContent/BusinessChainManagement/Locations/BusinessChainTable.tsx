import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SettingsIcon from '@mui/icons-material/Settings';
import { LoadingButton } from '@mui/lab';
import { Tooltip, Box, Button, CardMedia, Fade, Grid, IconButton, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography, DialogTitle, Dialog, DialogContent, TextField, DialogActions } from '@mui/material';
import * as React from 'react';
import { FC, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../../contexts/PanelContexts/BusinessChainContext';
import { LocationProps, RawPlaceDataProps } from '../../../../../contexts/PlaceProps';
import { setPlace } from '../../../../../store/actions/setCurrentPlace';
import { convertToCurrentPlace } from '../../../../../utils/place_data_utils';
import DialogTransition from '../../../../reusable/DialogTransition';
import { Destinations } from '../../PlaceManagement/PlaceBoard/PlaceBoard';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

export const BusinessChainTable: FC = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dialogOpen, setDialogOpen] = useState(false)
    const { businessChain } = useBusinessChainContext()
    const [selectedLocationId, setSelectedLocationId] = useState<string>('')
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openDeleteDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, locationId: string) => {
        event.stopPropagation()
        setSelectedLocationId(locationId)
        setDialogOpen(true)
    }

    const chooseLocation = (location: LocationProps) => {
        const businessChainCopy = { ...businessChain }
        businessChainCopy.locations = [location]
        const currentPlaces = convertToCurrentPlace(businessChainCopy)
        const currentPlace = currentPlaces[0]
        if (currentPlace.isActive) {
            history.push(`/panel/management/${currentPlace._id}/${Destinations.HOME}`)
            return
        }
        history.push(`/panel/management/${currentPlace._id}/${Destinations.OPENING_HOURS}`)
    }
    return (
        <TableContainer component={Box} sx={{ mt: 3, flexGrow: 1 }}>
            <Grid container justifyContent="flex-end" sx={{ mb: 1, pr: 1 }}>
                <Button startIcon={<SettingsIcon />} variant="contained" color="primary">Manage locations</Button>
            </Grid>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Visits</TableCell>
                        <TableCell align="right">Opinions</TableCell>
                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {businessChain.locations.map((loc) => (
                        <TableRow
                            hover

                            onClick={() => chooseLocation(loc)}
                            key={loc._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {loc.address}
                            </TableCell>
                            <TableCell align="right"  >
                                {loc.visitCount}
                            </TableCell>
                            <TableCell align="right">
                                {loc.opinions?.length || 0}
                            </TableCell>
                            <TableCell align="right">
                                <Rating readOnly value={loc.averageNote?.average || 0} />
                                {/* {loc.averageNote?.average || 0} */}
                            </TableCell>
                            <TableCell align="right">
                                <Button size="small" onClick={(e) => e.stopPropagation()} color={loc.isActive ? "success" : "error"}>
                                    {loc.isActive ? 'Active' : 'Inactive'}
                                </Button>
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip placement="top" arrow title="Delete location">
                                    <IconButton onClick={(e) => openDeleteDialog(e, loc._id as string)}>
                                        <DeleteForeverIcon color="error" />
                                    </IconButton>

                                </Tooltip>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={businessChain.locations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <DeleteConfirmationDialog
                dialogOpen={dialogOpen}
                selectedLocationId={selectedLocationId}
                setDialogOpen={setDialogOpen} />
        </TableContainer>


    )
}