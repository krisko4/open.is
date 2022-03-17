import { Fade,  Grid, Typography } from '@mui/material';
import { FC } from 'react';

export const NotReady: FC = () => {
  return (
        <Fade in={true} timeout={500}>
            <Grid container justifyContent="center" alignItems="center">
                <Typography variant="h4">
                    This option will be available in future versions. Stay tuned!
                </Typography>
            </Grid>

        </Fade>
  );
};