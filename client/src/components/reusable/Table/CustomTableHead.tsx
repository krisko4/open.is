import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { PropsWithChildren } from 'react';
import { Props, TableData } from './CustomTable';

type Order = 'asc' | 'desc';

interface HeadProps {
  selectedRows: TableData[];
  onSort: (event: React.MouseEvent<unknown>, property: keyof TableData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof TableData;
  rowCount: number;
}

export const CustomTableHead = (props: PropsWithChildren<Props & HeadProps>) => {
  const { onSelectAllClick, order, orderBy, selectedRows, rowCount, onSort, columns } = props;
  const createSortHandler = (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
    onSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selectedRows.length > 0 && selectedRows.length < rowCount}
            checked={rowCount > 0 && selectedRows.length === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.key as string}
            align="left"
            padding={column.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === column.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.key}
              direction={orderBy === column.key ? order : 'asc'}
              onClick={createSortHandler(column.key)}
            >
              {column.label}
              {orderBy === column.key ? (
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
};
