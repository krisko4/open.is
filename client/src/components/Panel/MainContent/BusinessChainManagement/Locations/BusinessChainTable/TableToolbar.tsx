import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Tooltip, Toolbar, alpha, Typography, IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useBusinessChainContext } from '../../../../../../contexts/PanelContexts/BusinessChainContext';
import { DeleteConfirmationDialog } from '../DeleteConfirmationDialog';

interface Props {
    selectedLocations: number[],
    setSelectedLocations: React.Dispatch<React.SetStateAction<number[]>>
}
export const TableToolbar: FC<Props> = ({ selectedLocations, setSelectedLocations }) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    const { businessChain } = useBusinessChainContext()

    const openDeleteDialog = () => {
        setDialogOpen(true)
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                width: '100%',
                pr: { xs: 1, sm: 1 },
                ...(selectedLocations.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {selectedLocations.length > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {selectedLocations.length} {selectedLocations.length === 1 ? 'location' : 'locations'} selected
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
            {selectedLocations.length > 0 ? (
                <>
                    <Tooltip title="Set contact details">
                        <IconButton>
                            <SettingsIcon color="warning" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Set opening hours">
                        <IconButton>
                            <QueryBuilderIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={openDeleteDialog}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip title="Add locations">
                        <IconButton>
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
            <DeleteConfirmationDialog
                dialogOpen={dialogOpen}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                setDialogOpen={setDialogOpen} />
        </Toolbar>
    );
};
