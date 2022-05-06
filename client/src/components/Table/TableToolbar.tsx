import { Toolbar, alpha, Typography, IconButton, Grid } from '@mui/material';
import { FC } from 'react';
import { TableData } from './CustomTable';

interface Props {
  selectedRows: TableData[];
  title: string;
}
export const TableToolbar: FC<Props> = ({ title, selectedRows, children }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        width: '100%',
        pr: { xs: 1, sm: 1 },
        ...(selectedRows.length > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selectedRows.length > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}
      {children}
    </Toolbar>
  );
};
