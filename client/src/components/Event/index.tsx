import { Button, Card, CardMedia, CardContent, Typography, CardActions, Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { EventContent } from './EventContent';
import { EventTitle } from './EventTitle';
import { EventImage } from './EventImage';
import { EventDate } from './EventDate';

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
        <Grid item sx={{ mb: 1 }}>
          <EventDate />
        </Grid>
        <EventContent />
      </CardContent>
    </Card>
  );
};
