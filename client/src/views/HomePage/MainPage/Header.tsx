import HomeIcon from '@mui/icons-material/Home';
import { Slide, AppBar, Button, Grid, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SignOutButton } from 'components/Buttons/SignOutButton';
import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useLoginContext } from '../../../contexts/LoginContext';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    fontFamily: '-apple-system',
  },
  elevatedAppBar: {
    transition: 'all .5s ease 0s',
    backgroundColor: 'transparent',
    '& .aboutButton': {
      marginRight: 10,
      color: 'white',
      borderColor: 'white',
    },
    '& .contactButton': {
      marginRight: 10,
      color: 'white',
    },
  },
  transparentAppBar: {
    transition: 'all .5s ease 0s',
    backgroundColor: 'transparent',
    paddingTop: 20,
    '& .aboutButton': {
      marginRight: 10,
      color: 'white',
      borderColor: 'white',
    },
    '& .contactButton': {
      marginRight: 10,
      color: 'white',
    },
  },
  solidAppBar: {
    backgroundColor: 'white',
    transition: 'all .5s ease 0s',
    '& .aboutButton': {
      color: '#2196f3',
      marginRight: 10,
      borderColor: '#2196f3',
    },
    '& .contactButton': {
      marginRight: 10,
      color: '#2196f3',
    },
  },
});

interface AppBarStateTypes {
  elevation: number;
  buttonColor: any;
}

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const [appBarState, setAppBarState] = useState<AppBarStateTypes>({
    elevation: 0,
    buttonColor: 'error',
  });

  const { setLoginOpen } = useAuthContext();
  const { userData } = useLoginContext();
  const appBarRef = useRef<'transparentAppBar' | 'solidAppBar' | 'elevatedAppBar'>('transparentAppBar');

  const handleScroll = () => {
    const isSolid = window.scrollY > 800;
    const isElevated = window.scrollY > 150;
    if (isSolid) {
      appBarRef.current = 'solidAppBar';
      setAppBarState({ elevation: 10, buttonColor: 'primary' });
      return;
    }
    if (isElevated) {
      appBarRef.current = 'elevatedAppBar';
      setAppBarState({ elevation: 10, buttonColor: 'error' });
      return;
    }
    appBarRef.current = 'transparentAppBar';
    setAppBarState({ elevation: 0, buttonColor: 'error' });
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar data-testid="header" elevation={appBarState.elevation} className={classes[appBarRef.current]}>
      <Grid container justifyContent="center">
        <Grid item>
          <Slide in={true} timeout={1000}>
            <Toolbar>
              {location.pathname === '/' ? (
                <Button onClick={() => navigate('/about')} variant="outlined" className="aboutButton">
                  About us
                </Button>
              ) : (
                <Button
                  startIcon={<HomeIcon />}
                  onClick={() => navigate('/')}
                  variant="outlined"
                  className="aboutButton"
                >
                  Home
                </Button>
              )}
              {location.pathname === '/contact' ? (
                <Button variant="text" className="contactButton" onClick={() => navigate('/about')}>
                  About us
                </Button>
              ) : (
                <Button variant="text" className="contactButton" onClick={() => navigate('/contact')}>
                  Contact
                </Button>
              )}
              {userData.isLoggedIn ? (
                <div>
                  <Button
                    data-testid="panel-navigate-button"
                    onClick={() => navigate('/panel')}
                    className="contactButton"
                  >
                    My panel
                  </Button>
                  <SignOutButton data-testid="signout-button" className="contactButton">
                    Sign out
                  </SignOutButton>
                </div>
              ) : (
                <Button
                  data-testid="login-button"
                  className="contactButton"
                  onClick={() => {
                    setLoginOpen(true);
                  }}
                >
                  Sign in
                </Button>
              )}
            </Toolbar>
          </Slide>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
