import CloseIcon from '@mui/icons-material/Close';
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { DialogTransition } from '../Transitions';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  toolbarButtons?: React.ReactNode;
}

export const FullHeightDialog: FC<Props> = ({ dialogOpen, toolbarButtons, title, setDialogOpen, children }) => {
  return (
    <Dialog open={dialogOpen} fullScreen TransitionComponent={DialogTransition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDialogOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ pl: 2, pr: 2 }} variant="h6" component="div">
            {title}
          </Typography>
          {toolbarButtons}
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};
