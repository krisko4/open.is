import { Slide, Tooltip, IconButton, Card, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

interface Props {
  setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNewBusiness: FC<Props> = ({ setButtonClicked }) => {
  const [color, setColor] = useState<any>('primary');

  return (
    <Grid container justifyContent="space-evenly">
      <Grid item lg={5}>
        <Slide direction="right" in={true} timeout={500}>
          <Card sx={{ height: '100%' }}>
            <Grid container direction="column" alignItems="center" sx={{ p: 2, height: '100%' }}>
              <Typography variant="h1">Hello, {localStorage.getItem('fullName')?.split(' ')[0]}</Typography>
              <Grid container justifyContent="center">
                <Grid item xs={11}>
                  <Typography variant="body1" sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
                    It seems you have not registered any places yet. Please press the button below to add your business
                    and take advantage of functionality provided by our panel.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center">
                <Tooltip arrow title="Let's start">
                  <IconButton
                    color={color}
                    onClick={() => setButtonClicked(true)}
                    onMouseEnter={() => setColor('success')}
                    onMouseLeave={() => setColor('primary')}
                  >
                    <PlayCircleOutlineIcon sx={{ height: '200px', width: '200px' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Card>
        </Slide>
      </Grid>
      <Grid item lg={5}>
        <Slide in={true} timeout={500}>
          <img src={'https://c.tenor.com/jCmPqgkv0vQAAAAC/hello.gif'} style={{ height: '500px', width: '100%' }} />
        </Slide>
      </Grid>
    </Grid>
  );
};
