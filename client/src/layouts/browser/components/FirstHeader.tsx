import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { SignOutButton } from 'components/buttons/SignOutButton';
import { ColorModeSwitch } from 'components/ColorModeSwitch';
import { NotificationDrawer } from 'components/Notifications';
import { useAuthContext, useLoginContext } from 'contexts';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FirstHeader: FC = () => {
  const { setLoginOpen } = useAuthContext();
  const { userData } = useLoginContext();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <NotificationDrawer open={notificationsOpen} setOpen={setNotificationsOpen} />
      <Toolbar>
        <Button onClick={() => navigate('')} color="primary">
          Home
        </Button>
        <Button onClick={() => navigate('events')} color="primary">
          Events
        </Button>
        <Grid container alignItems="center" justifyContent="flex-end">
          <ColorModeSwitch />
          <Tooltip title="Home">
            <IconButton onClick={() => navigate('/')} color="inherit" size="large">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          {!userData.isLoggedIn ? (
            <Button color="primary" onClick={() => setLoginOpen(true)} variant="contained">
              Sign in
            </Button>
          ) : (
            <>
              <Tooltip title="Panel">
                <IconButton onClick={() => navigate('/panel')} color="inherit" size="large">
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton sx={{ mr: 1 }} onClick={() => setNotificationsOpen(true)} color="inherit" size="large">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <SignOutButton color="primary" variant="contained">
                Sign out
              </SignOutButton>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default FirstHeader;
