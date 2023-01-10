import { Alert, Button, Card, CardContent, Divider, Grid, Slide, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const NewPlaceChooser: FC = () => {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item lg={5}>
        <Slide in={true} timeout={500} direction="right">
          <Card>
            <CardContent>
              <Grid container direction="column" justifyContent="space-evenly">
                <Typography variant="h3">New place</Typography>
                <Divider color="primary" sx={{ mt: 1 }}></Divider>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  If you are an owner of a small business with <b>single</b> location, this might be the suitable option
                  for you.
                </Typography>
                <Grid container direction="column" alignItems="center" sx={{ mt: 1, mb: 1 }}>
                  <img style={{ height: '400px' }} src={`${import.meta.env.VITE_BASE_URL}/images/new_place.gif`} />
                  <Alert sx={{ mt: 1, mb: 1, width: '100%' }} variant="outlined" severity="success">
                    <b>Single</b> location registration
                  </Alert>
                  <Alert sx={{ mb: 1, width: '100%' }} variant="outlined" severity="success">
                    Quick and easy registration and management process
                  </Alert>
                  <Alert sx={{ mb: 1, width: '100%' }} variant="outlined" severity="success">
                    Detailed analysis of user activity across the location of your business, without additional
                    unnecessary settings
                  </Alert>
                </Grid>
                <Button
                  onClick={() => navigate('new-place')}
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Register new place
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
      <Grid item lg={5}>
        <Slide direction="left" timeout={500} in={true}>
          <Card>
            <CardContent>
              <Typography variant="h3">New business chain</Typography>
              <Divider color="primary" sx={{ mt: 1 }}></Divider>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                If you are an owner of a business with <b>multiple</b> locations, this might be the suitable option for
                you.
              </Typography>
              <Grid container direction="column" alignItems="center" sx={{ mt: 1, mb: 1 }}>
                <img style={{ height: '400px' }} src={`${import.meta.env.VITE_BASE_URL}/images/chain2.gif`} />
                <Alert sx={{ mt: 1, mb: 1, width: '100%' }} variant="outlined" severity="success">
                  <b>Multiple</b> locations registration
                </Alert>
                <Alert sx={{ mb: 1, width: '100%' }} variant="outlined" severity="success">
                  Quick and easy management of multiple locations of your business
                </Alert>
                <Alert sx={{ mb: 1, width: '100%' }} variant="outlined" severity="success">
                  Detailed analysis of user activity across specific locations of your business and a whole business as
                  a unit
                </Alert>
              </Grid>
              <Button
                onClick={() => navigate('new-business-chain')}
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                Register new business chain
              </Button>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
    </Grid>
  );
};
