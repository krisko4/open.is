import { IconButton, styled } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { SocialIcon } from 'react-social-icons';
import { useNavigate } from 'react-router-dom';

const StyledFooter = styled(Grid)({
  background:
    'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3)), url(https://villamiproperties.com/wp-content/uploads/2017/10/footer-background-2.jpg)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  paddingTop: 50,
  paddingBottom: 50,
});

const Footer: FC = () => {
  const navigate = useNavigate();

  return (
    <StyledFooter container alignItems="center" direction="column">
      <div>
        <Button onClick={() => navigate('/contact')} style={{ color: 'white' }}>
          Contact
        </Button>
        <Button onClick={() => navigate('/about')} style={{ color: 'white' }}>
          About us
        </Button>
      </div>
      <Grid item xs={8} style={{ textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: 'white' }}>
          This is a simple project created in educational purposes, designed with Material UI.
        </Typography>
      </Grid>
      <div>
        <IconButton size="large">
          <SocialIcon
            title="facebook-icon"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 35, height: 35, display: 'table-cell' }}
            url="http://facebook.com"
          />
        </IconButton>
        <IconButton size="large">
          <SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 35, height: 35, display: 'table-cell' }}
            url="http://instagram.com"
          />
        </IconButton>
        <IconButton size="large">
          <SocialIcon
            bgColor={'grey'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 35, height: 35, display: 'table-cell' }}
            url="http://github.com"
          />
        </IconButton>
        <IconButton size="large">
          <SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 35, height: 35, display: 'table-cell' }}
            url="http://linkedin.com"
          />
        </IconButton>
      </div>
      <Typography sx={{ color: 'white' }}>
        {new Date().getFullYear()} - <strong>Krzysztof Wyszyński</strong>
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
