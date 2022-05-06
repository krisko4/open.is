import CloseIcon from '@mui/icons-material/Close';
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { DialogTransition } from '../Transitions';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const FullHeightDialog: FC<Props> = ({ dialogOpen, title, setDialogOpen, children }) => {
  return (
    <Dialog open={dialogOpen} fullScreen TransitionComponent={DialogTransition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDialogOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};
