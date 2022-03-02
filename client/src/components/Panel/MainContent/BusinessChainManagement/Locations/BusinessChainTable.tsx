import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@mui/material'
import { useBusinessChainContext } from '../../../../../contexts/PanelContexts/BusinessChainContext';


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


interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'address',
        numeric: false,
        disablePadding: true,
        label: 'Address',
    },
    {
        id: 'visits',
        numeric: true,
        disablePadding: false,
        label: 'Visits',
    },
    {
        id: 'opinions',
        numeric: true,
        disablePadding: false,
        label: 'Opinions',
    },
    {
        id: 'rating',
        numeric: true,
        disablePadding: false,
        label: 'Rating',
    },
    {
        id: 'state',
        numeric: true,
        disablePadding: false,
        label: 'State',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                width: '100%',
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Locations
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export const BusinessChainTable: React.FC = () => {

    const [dialogOpen, setDialogOpen] = React.useState(false)
    const { businessChain } = useBusinessChainContext()
    const [selectedLocationId, setSelectedLocationId] = React.useState<string>('')
    const history = useHistory()
    const [rows, setRows] = React.useState(
        businessChain.locations.map(location => (
            {
                address: location.address,
                visits: location.visits?.reduce((a, b) => a + b.visitCount, 0) || 0,
                opinions: location.opinions?.length || 0,
                rating: location.averageNote?.average || 0,
                state: location.isActive || false
            }
        ))
    )

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('visits');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
            const newSelecteds = rows.map((n) => n.address);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const openDeleteDialog = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, locationId: string) => {
    //     event.stopPropagation()
    //     setSelectedLocationId(locationId)
    //     setDialogOpen(true)
    // }

    // const chooseLocation = (location: LocationProps) => {
    //     history.push(`/panel/management/${location._id}/${location.isActive ? Destinations.HOME : Destinations.OPENING_HOURS}`)
    // }

    return (
        <Grid container sx={{ width: '100%', flexGrow: 1 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
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
                                const isItemSelected = isSelected(row.address);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.address)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.address}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
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
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (dense ? 33 : 53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
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