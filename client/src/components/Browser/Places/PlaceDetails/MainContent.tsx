import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { Alert, CardMedia, Fade, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import React, { FC } from 'react';
import { SocialIcon } from 'react-social-icons';
import { CurrentPlaceProps } from 'redux-toolkit/slices/PlaceProps';
interface Props {
  place: CurrentPlaceProps,
}

const MainContent: FC<Props> = ({ place }) => {


  const icons = [
    {
      icon: <PhoneIcon color="primary" />,
      text: place.phone || 'Phone number',
    },
    {
      icon: <MailOutlineIcon color="primary" />,
      text: place.email || 'E-mail address',
    },
    {
      icon: <LanguageIcon color="primary" />,
      text: place.website || 'Website',
    },
  ];



  return (
        <Fade timeout={1000} in={true}>
            <Grid container >
                <Grid container item>
                    <Card style={{ flexGrow: 1, paddingBottom: 12, paddingTop: 12, paddingRight: 20 }}>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    {place.status === 'open' ? <Alert severity="success" variant="filled" >
                                        This place is now {place.status?.toUpperCase()}
                                    </Alert>
                                      : <Alert severity="error" variant="filled" >
                                            This place is now {place.status?.toUpperCase()}
                                        </Alert>

                                    }
                                </Grid>
                            </Grid>
                    </Card>
                </Grid>
                <Grid container item sx={{ mt: '20px' }}>
                    <Grid item lg={3} sx={{ ml: '20px', textAlign: 'center' }}>
                        <CardMedia style={{ height: 200, backgroundSize: 'contain', marginTop: 10, borderRadius: 20 }} image={place.logo as string} />
                        <Rating
                            style={{ marginTop: 20 }}
                            name="simple-controlled"
                            value={place.averageNote?.average}
                            readOnly
                        />
                    </Grid>
                        <Grid item container direction="column" lg={8} sx={{ ml: '30px' }}>
                        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                            {place.name}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            {place.subtitle}
                        </Typography>
                        <Typography variant="body1" color="primary">{place.type}</Typography>
                        <div>
                            <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://facebook.com" /></IconButton>
                            <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://instagram.com" /></IconButton>
                        </div>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
                    <Grid item lg={10}>
                        <Card elevation={10} style={{ flexGrow: 1 }}>
                            <CardContent>
                                <Typography variant="body1">{place.description}</Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item lg={10} style={{ marginTop: 20 }}>
                        <Divider style={{ width: '100%' }}></Divider>
                    </Grid>
                </Grid>
                <Grid item container lg={12} justifyContent="space-around" style={{ marginTop: 20, marginBottom: 10 }}>
                    {icons.map((item, index) => {
                      return (
                            <Grid item lg={3} key={index}>
                                <Card elevation={10}>
                                    <CardContent>
                                        <Grid container justifyContent="center">
                                            <Grid item lg={12} style={{ textAlign: 'center' }}>
                                                {item.icon}
                                            </Grid>
                                            <Grid item>
                                                {item.text}
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                      );
                    })}
                </Grid>
            </Grid>
        </Fade >
  );
};

export default MainContent;