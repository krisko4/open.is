import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { useNavigate } from 'react-router-dom';
import { Paper, ListSubheader, ListItemAvatar, Avatar } from '@mui/material';
import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import { useLoginContext } from 'contexts/LoginContext';
import { FC } from 'react';
import { useGetPlacesByUserId } from 'redux-toolkit/api/placesApi';
import { RawPlaceDataProps } from 'redux-toolkit/slices/PlaceProps';
import { MyBusinessChains } from './MyBusinessChains/MyBusinessChains';
import { MyPlaces } from './MyPlaces';
import AddIcon from '@mui/icons-material/Add';
import CloudCircle from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';


const generateNavigationButtons = (places: RawPlaceDataProps[]) => [
  {
    name: 'Dashboard',
    icon: <DashboardIcon color="primary" />,
    url: places.length > 0 ? 'dashboard' : '',
  },
  {
    name: 'My account',
    icon: <SettingsIcon color="primary" />,
    url: 'account',

  },
  {
    name: 'New place',
    icon: <AddIcon color="primary" />,
    url: 'new-place',
  },
  {
    name: 'New business chain',
    icon: <CloudCircle color="primary" />,
    url: 'new-business-chain',
  },
];

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)})`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)})`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: open ? 'normal' : 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface Props {
  drawerOpen: boolean,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LeftNavigation: FC<Props> = ({ drawerOpen, setDrawerOpen }) => {

  const { data: places } = useGetPlacesByUserId();
  const navigate = useNavigate();
  const { userData } = useLoginContext();
  const theme = useTheme();


  return (
        <Drawer variant="permanent" open={drawerOpen}>
            <DrawerHeader>
                <IconButton onClick={() => setDrawerOpen(false)}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
                <Paper sx={{ height: '100%' }}>
            <Scrollbars autoHide>
                    <ListItem >
                        <ListItemAvatar>
                            <Avatar
                                imgProps={{
                                  style: { objectFit: 'contain' },
                                }}
                                alt={userData.fullName}
                                src={userData.img as string}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={userData.fullName}
                            secondary="Standard user"
                        />
                    </ListItem>
                    <List>
                        {drawerOpen && <ListSubheader disableSticky>Settings</ListSubheader>}
                        {
                            places && generateNavigationButtons(places).map((button, index) =>
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => {
                                      navigate(`${button.url}`);
                                    }
                                    }
                                >
                                    <ListItemIcon>
                                        {button.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={button.name}>
                                    </ListItemText>
                                </ListItem>,
                            )
                        }
                        <MyPlaces drawerOpen={drawerOpen} />
                        <MyBusinessChains drawerOpen={drawerOpen}
                        />
                    </List>
            </Scrollbars>
                </Paper>
        </Drawer>
  );
};