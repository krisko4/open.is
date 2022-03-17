import { Fade } from '@mui/material';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import React, { FC } from 'react';
import { OpinionCard } from './OpinionCard';
import { format } from 'date-fns';





export const opinions = [
  {
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    author: 'Administration',
    content: 'This is just an example of what opinions will look like in the browser once your place is created.',
    note: 5,
    averageNote: 0,
    authorImg: `${[process.env.REACT_APP_BASE_URL]}/images/admin.png`,
  },
  {
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    author: 'Happy client',
    content: 'This is a lovely place!',
    note: 5,
    averageNote: 0,
    authorImg: `${[process.env.REACT_APP_BASE_URL]}/images/client.jpg`,
  },
  {
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    author: 'Administration',
    content: 'Thank you for using our services💌',
    note: 5,
    averageNote: 0,
    authorImg: `${[process.env.REACT_APP_BASE_URL]}/images/admin.png`,
  },


];

export const Opinions: FC = () => {


  return (
        <Fade in={true} timeout={500}>
            <Grid container style={{ height: '100%' }} justifyContent="center">
                <Grid container item xs={11} direction="column" style={{ marginTop: 20, marginBottom: 20 }}>
                    <Grid container justifyContent="space-between" >
                        <Alert severity="info" variant="filled">{opinions.length} {opinions.length > 1 ? <span>users have</span> : <span>user has</span>} commented on this place.</Alert>
                    </Grid>
                    {
                        opinions.map((opinion, index) =>
                            <Grid item key={index} style={{ marginTop: 20, marginBottom: 20 }}>
                                <OpinionCard opinion={opinion} />
                            </Grid>,
                        )}
                </Grid >
            </Grid>
        </Fade>
  );
};