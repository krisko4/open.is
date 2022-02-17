// @flow 
import { Button, CardMedia, Fade, Grid, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../contexts/PanelContexts/BusinessChainContext';
import { LocationProps, RawPlaceDataProps } from '../../../../contexts/PlaceProps';
import { setPlace } from '../../../../store/actions/setCurrentPlace';
import { convertToCurrentPlace } from '../../../../utils/place_data_utils';
type Props = {

};


export const BusinessChainTable = (props: Props) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {businessChain} = useBusinessChainContext()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const chooseLocation = (location: LocationProps) => {
        const businessChainCopy = { ...businessChain}
        businessChainCopy.locations = [location]
        const currentPlaces = convertToCurrentPlace(businessChainCopy)
        const currentPlace = currentPlaces[0]
        dispatch(setPlace(currentPlace))
        history.push({
            pathname: `/panel/management/${currentPlace._id}`,
            state: { place: currentPlace, businessChainId: businessChain._id }
        }
        )
    }

    return (
        <Scrollbars>
            <Fade in={true} timeout={1000}>
                <Grid container sx={{ height: '100%' }}>
                    <Paper sx={{ flexGrow: 1, pt: 2 }}>
                        <Toolbar>
                            <Grid container alignItems="center">
                                <Grid item lg={2}>
                                    <CardMedia
                                        style={{ height: 200, width: 200, marginTop: 10, borderRadius: 20 }}
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell align="right">Visits</TableCell>
                                        <TableCell align="right">Opinions</TableCell>
                                        <TableCell align="right">Rating</TableCell>
                                        <TableCell align="center">State</TableCell>
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
                                                <Button size="small" color={loc.isActive ? "success" : "error"}>
                                                    {loc.isActive ? 'Active' : 'Inactive'}
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                    {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.address}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={businessChain.locations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />

                    </Paper>

                </Grid>

            </Fade>

        </Scrollbars>
    );
};