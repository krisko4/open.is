import AddIcon from '@mui/icons-material/Add';
import CloudCircle from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import { Tooltip, IconButton, Slide, styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { ColorModeSwitch } from '../reusable/ColorModeSwitch';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 300;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<Props> = ({ drawerOpen, setDrawerOpen }) => {
  // const { setPanelOpen } = usePageContext()
  // const { places, setSelectedOption} = usePanelContext()

  const navigate = useNavigate();

  return (
    <Slide in={true} timeout={500}>
      <AppBar open={drawerOpen} position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(drawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid item container justifyContent="flex-end" alignItems="center">
            <ColorModeSwitch />
            <Tooltip title="Home">
              <IconButton onClick={() => navigate('/')} color="inherit" size="large">
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Dashboard">
              <IconButton onClick={() => navigate('')} color="inherit" size="large">
                <DashboardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="New place">
              <IconButton onClick={() => navigate('new-place')} color="inherit" size="large">
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="New business chain">
              <IconButton onClick={() => navigate('new-business-chain')} color="inherit" size="large">
                <CloudCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Browser">
              <IconButton onClick={() => navigate('/search')} color="inherit" size="large">
                <TravelExploreIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;
