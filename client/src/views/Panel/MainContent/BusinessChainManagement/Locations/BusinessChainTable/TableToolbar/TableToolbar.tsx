import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Tooltip, Toolbar, alpha, Typography, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { DeleteConfirmationDialog } from '../../DeleteConfirmationDialog';
import { AddLocationsDialog } from './AddLocationsDialog';
import { ContactDetailsDialog } from './ContactDetailsDialog';
import { SetOpeningHoursDialog } from './SetOpeningHoursDialog';

interface Props {
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}
export const TableToolbar: FC<Props> = ({ selectedLocations, setSelectedLocations }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [contactDetailsDialogOpen, setContactDetailsDialogOpen] = useState(false);
  const [openingHoursDialogOpen, setOpeningHoursDialogOpen] = useState(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        width: '100%',
        pr: { xs: 1, sm: 1 },
        ...(selectedLocations.length > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selectedLocations.length > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selectedLocations.length} {selectedLocations.length === 1 ? 'location' : 'locations'} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Locations
        </Typography>
      )}
      {selectedLocations.length > 0 ? (
        <>
          <Tooltip title="Set contact details">
            <IconButton onClick={() => setContactDetailsDialogOpen(true)}>
              <SettingsIcon color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Set opening hours">
            <IconButton onClick={() => setOpeningHoursDialogOpen(true)}>
              <QueryBuilderIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Add locations">
            <IconButton onClick={() => setAddDialogOpen(true)}>
              <AddLocationAltIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      <AddLocationsDialog dialogOpen={addDialogOpen} setDialogOpen={setAddDialogOpen} />
      <DeleteConfirmationDialog
        dialogOpen={deleteDialogOpen}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        setDialogOpen={setDeleteDialogOpen}
      />
      <ContactDetailsDialog
        dialogOpen={contactDetailsDialogOpen}
        selectedLocations={selectedLocations}
        setDialogOpen={setContactDetailsDialogOpen}
      />
      <SetOpeningHoursDialog
        dialogOpen={openingHoursDialogOpen}
        selectedLocations={selectedLocations}
        setDialogOpen={setOpeningHoursDialogOpen}
      />
    </Toolbar>
  );
};
