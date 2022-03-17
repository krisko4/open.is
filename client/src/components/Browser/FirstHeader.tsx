import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLoginContext } from '../../contexts/LoginContext';
import { ColorModeSwitch } from '../reusable/ColorModeSwitch';
import { SignOutButton } from '../reusable/SignOutButton';
const FirstHeader: FC = () => {

  const { setLoginOpen } = useAuthContext();
  const { userData } = useLoginContext();
  const navigate = useNavigate();

  return (
        <AppBar position="static"
        >
            <Toolbar>
                <Grid container alignItems="center" justifyContent="flex-end">
                    <ColorModeSwitch />
                    <Tooltip title="Home">
                        <IconButton onClick={() => navigate('/')} color="inherit" size="large">
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    {!userData.isLoggedIn ?
                        <Button color="primary" onClick={() => setLoginOpen(true)} variant="contained">
                            Sign in
                        </Button>
                      :
                        <>
                            <Tooltip title="Panel">
                                <IconButton sx={{ mr: 1 }} onClick={() => navigate('/panel')} color="inherit" size="large">
                                    <AdminPanelSettingsIcon />
                                </IconButton>
                            </Tooltip>
                            <SignOutButton color="primary" variant="contained">Sign out</SignOutButton>
                        </>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
  );
};

export default FirstHeader;