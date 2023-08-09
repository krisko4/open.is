import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { EventContent } from './EventContent';
import { EventDate } from './EventDate';
import { EventImage } from './EventImage';
import { EventTitle } from './EventTitle';
import { EventAddress } from './EventAddress';

interface Props {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const Event: FC<Props> = ({ setImageFile }) => {
  return (
    <Card>
      <CardContent>
        <EventImage setImageFile={setImageFile} />
        <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
          <Typography color="primary" variant="overline">
            0 users will participate
          </Typography>
        </Grid>
        <Grid item>
          <EventTitle />
        </Grid>
        <Grid item>
          <EventAddress />
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <EventDate />
        </Grid>
        <EventContent />
      </CardContent>
    </Card>
  );
};
