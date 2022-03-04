import { Button, Grid, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../../../contexts/PanelContexts/BusinessChainContext';
import { Destinations } from '../../../PlaceManagement/PlaceBoard/PlaceBoard';
import { CustomTableHead } from './CustomTableHead';
import { TableToolbar } from './TableToolbar/TableToolbar';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string | boolean },
        b: { [key in Key]: number | string | boolean },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface Data {
    address: string,
    visits: number,
    opinions: number,
    rating: number,
    state: string
}


export const BusinessChainTable: React.FC = () => {

    const { businessChain } = useBusinessChainContext()
    const history = useHistory()
    const rows = useMemo(() => {
        return businessChain.locations.map(location => (
            {
                address: location.address,
                visits: location.visits?.reduce((a, b) => a + b.visitCount, 0) || 0,
                opinions: location.opinions?.length || 0,
                rating: location.averageNote?.average || 0,
                state: location.isActive || false,
                id: location._id
            }
        ))
    }, [businessChain.locations])

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('visits');
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(businessChain.locations.length);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((row) => row.id as string);
            setSelectedLocations(newSelecteds);
            return;
        }
        setSelectedLocations([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, locationId: string) => {
        event.stopPropagation()
        let locations = [...selectedLocations]
        if (locations.includes(locationId)) {
            locations = locations.filter(locId => locId !== locationId)
        }
        else {
            locations.push(locationId)
        }
        setSelectedLocations(locations)
    };

    const isSelected = (locationId: string) => selectedLocations.includes(locationId)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const chooseLocation = (index: number) => {
        const location = businessChain.locations[index]
        history.push(`/panel/management/${location._id}/${location.isActive ? Destinations.HOME : Destinations.OPENING_HOURS}`)
    }

    return (
        <Paper sx={{margin: 1}}>
            <Grid container sx={{ width: '100%', flexGrow: 1, mt: 1 }}>
                <TableToolbar setSelectedLocations={setSelectedLocations} selectedLocations={selectedLocations} />
                <TableContainer>
                    <Table>
                        <CustomTableHead
                            selectedLocations={selectedLocations}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id as string);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            onClick={() => chooseLocation(index)}
                                            tabIndex={-1}
                                            key={row.address}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    onClick={(event) => handleClick(event, row.id as string)}
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.address}
                                            </TableCell>
                                            <TableCell align="right">{row.visits}</TableCell>
                                            <TableCell align="right">{row.opinions}</TableCell>
                                            <TableCell align="right">{row.rating}</TableCell>
                                            <TableCell align="right">
                                                <Button size="small" onClick={(e) => e.stopPropagation()} color={row.state ? "success" : "error"}>
                                                    {row.state ? 'Active' : 'Inactive'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { value: businessChain.locations.length, label: 'All' }]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>

        </Paper>
    );
    // <TableContainer component={Box} sx={{ mt: 3, flexGrow: 1 }}>
    //     <Grid container justifyContent="flex-end" sx={{ mb: 1, pr: 1 }}>
    //         <Button startIcon={<SettingsIcon />} variant="contained" color="primary">Manage locations</Button>
    //     </Grid>
    //     <Table>
    //         <TableHead>
    //             <TableRow>
    //                 <TableCell>Address</TableCell>
    //                 <TableCell align="right">Visits</TableCell>
    //                 <TableCell align="right">Opinions</TableCell>
    //                 <TableCell align="right">Rating</TableCell>
    //                 <TableCell align="center">State</TableCell>
    //                 <TableCell align="center"></TableCell>
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             {businessChain.locations.map((loc) => (
    //                 <TableRow
    //                     hover
    //                     onClick={() => chooseLocation(loc)}
    //                     key={loc._id}
    //                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //                 >
    //                     <TableCell>
    //                         {loc.address}
    //                     </TableCell>
    //                     <TableCell align="right"  >
    //                         {loc.visits?.reduce((a, b) => a + b.visitCount, 0) || 0}
    //                     </TableCell>
    //                     <TableCell align="right">
    //                         {loc.opinions?.length || 0}
    //                     </TableCell>
    //                     <TableCell align="right">
    //                         <Rating readOnly value={loc.averageNote?.average || 0} />
    //                         {/* {loc.averageNote?.average || 0} */}
    //                     </TableCell>
    //                     <TableCell align="right">
    //                         <Button size="small" onClick={(e) => e.stopPropagation()} color={loc.isActive ? "success" : "error"}>
    //                             {loc.isActive ? 'Active' : 'Inactive'}
    //                         </Button>
    //                     </TableCell>
    //                     <TableCell align="right">
    //                         <Tooltip placement="top" arrow title="Delete location">
    //                             <IconButton onClick={(e) => openDeleteDialog(e, loc._id as string)}>
    //                                 <DeleteForeverIcon color="error" />
    //                             </IconButton>

    //                         </Tooltip>
    //                     </TableCell>

    //                 </TableRow>
    //             ))}
    //         </TableBody>
    //     </Table>
    //     <TablePagination
    //         rowsPerPageOptions={[5, 10, 25]}
    //         component="div"
    //         count={businessChain.locations.length}
    //         rowsPerPage={rowsPerPage}
    //         page={page}
    //         onPageChange={handleChangePage}
    //         onRowsPerPageChange={handleChangeRowsPerPage}
    //     />
    //     <DeleteConfirmationDialog
    //         dialogOpen={dialogOpen}
    //         selectedLocationId={selectedLocationId}
    //         setDialogOpen={setDialogOpen} />
    // </TableContainer>


}