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
  [theme.breakpoints.up('sm')]: {
    zIndex: theme.zIndex.drawer + 1,
  },
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
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

const navigationButtons = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    url: '/',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    url: '',
  },
  {
    title: 'New place',
    icon: <AddIcon />,
    url: 'new-place',
  },
  {
    title: 'New business chain',
    icon: <CloudCircle />,
    url: 'new-business-chain',
  },
  {
    title: 'Browser',
    icon: <TravelExploreIcon />,
    url: '/search',
  },
];

const Header: FC<Props> = ({ drawerOpen, setDrawerOpen }) => {
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
              ...(drawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid item container justifyContent="flex-end" alignItems="center">
            <ColorModeSwitch />
            {navigationButtons.map((button) => (
              <Tooltip key={button.url} title={button.title}>
                <IconButton onClick={() => navigate(button.url)} color="inherit" size="large">
                  {button.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;
