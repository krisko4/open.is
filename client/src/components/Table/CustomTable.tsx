import { Grid, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { PropsWithChildren, useState } from 'react';
import { CustomTableHead } from './CustomTableHead';
import { TableToolbar } from './TableToolbar';

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
  orderBy: Key
): (a: { [key in Key]: number | string | boolean }, b: { [key in Key]: number | string | boolean }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export interface TableData {
  id: string;
  [key: string]: string | number | boolean;
}

export interface Props {
  renderToolbar?: (selectedRows: TableData[]) => React.ReactNode;
  // ToolbarChildren?: React.ReactNode;
  tableTitle: string;
  rows: TableData[];
  columns: {
    key: keyof TableData;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
  }[];
}

export const CustomTable = (props: PropsWithChildren<Props>) => {
  const { rows, columns, tableTitle, renderToolbar } = props;
  const [order, setOrder] = useState<Order>('asc');
  // order by first column
  const [orderBy, setOrderBy] = useState(columns[0].key);
  const [selectedRows, setSelectedRows] = useState<TableData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows.length);

  const handleSort = (event: React.MouseEvent<unknown>, column: keyof TableData) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // const newSelecteds = rows.map((row) => row.id as string);
      setSelectedRows(rows);
      return;
    }
    setSelectedRows([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, clickedRow: TableData) => {
    event.stopPropagation();
    let newRows = [...selectedRows];
    if (newRows.some((row) => row.id === clickedRow.id)) {
      newRows = newRows.filter((row) => row.id !== clickedRow.id);
    } else {
      newRows.push(clickedRow);
    }
    setSelectedRows(newRows);
  };

  const isSelected = (rowId: string) => selectedRows.some((row) => row.id === rowId);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Paper sx={{ margin: 1, flexGrow: 1 }}>
      <Grid container sx={{ width: '100%', flexGrow: 1, mt: 1 }}>
        <TableToolbar title={tableTitle} selectedRows={selectedRows}>
          {renderToolbar && renderToolbar(selectedRows)}
        </TableToolbar>
        <TableContainer>
          <Table>
            <CustomTableHead
              tableTitle={tableTitle}
              rows={rows}
              columns={columns}
              selectedRows={selectedRows}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onSort={handleSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      // onClick={handleTableRowClick}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row)}
                          checked={isItemSelected}
                        />
                      </TableCell>
                      {Object.entries(row)
                        .slice(1)
                        .map(([key, value]) => (
                          <TableCell key={key} align="left">
                            {value}
                          </TableCell>
                        ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { value: rows.length, label: 'All' }]}
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
};
