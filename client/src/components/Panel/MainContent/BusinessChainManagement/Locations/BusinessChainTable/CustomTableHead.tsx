import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { FC } from 'react';

type Order = 'asc' | 'desc';

interface Props {
  selectedLocations: string[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
interface Data {
  address: string;
  visits: number;
  opinions: number;
  rating: number;
  state: string;
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

export const CustomTableHead: FC<Props> = ({
  onSelectAllClick,
  order,
  orderBy,
  selectedLocations,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selectedLocations.length > 0 && selectedLocations.length < rowCount}
            checked={rowCount > 0 && selectedLocations.length === rowCount}
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
};
