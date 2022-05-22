import { Divider, Drawer, Grid, IconButton, ListItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NotificationListItem } from './NotificationListItem';
import { FC } from 'react';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const notifications = [
  {
    image: 'https://i.pinimg.com/474x/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f--avatar-maker.jpg',
    title: 'Hello',
    content: 'How are you?',
  },
  {
    image: 'https://i.pinimg.com/474x/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f--avatar-maker.jpg',
    title: 'Hello',
    content: 'How are you?',
  },
];

export const NotificationDrawer: FC<Props> = ({ open, setOpen }) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <Grid container direction="column" sx={{ height: '100%', width: { xs: '70vw', lg: '45vw' } }}>
        <Grid container item sx={{ p: 2 }} alignItems="center" justifyContent="space-between">
          <Typography variant="h3">Notifications</Typography>
          <div>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon color="error" />
            </IconButton>
          </div>
        </Grid>
        <Divider />
        {notifications.map((notification, index) => (
          <ListItem disableGutters disablePadding sx={{ width: 'inherit' }} button key={index}>
            <NotificationListItem notificationData={notification} />
          </ListItem>
        ))}
      </Grid>
    </Drawer>
  );
};
