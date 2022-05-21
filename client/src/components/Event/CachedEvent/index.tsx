import { Card, CardContent, Grid, Typography } from '@mui/material';
import { UploadCardMedia } from 'components/ImageUpload/UploadCardMedia';
import { FC, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { EventData } from 'redux-toolkit/api/types';

interface Props {
  eventData: EventData;
  onClick?: () => void;
}
export const CachedEvent: FC<Props> = ({
  onClick,
  eventData: { title, content, img, startDate, endDate, participators },
}) => {
  const [elevation, setElevation] = useState(1);
  return (
    <Card
      onClick={onClick}
      elevation={elevation}
      onMouseEnter={() => setElevation(6)}
      onMouseLeave={() => setElevation(1)}
    >
      <CardContent>
        <UploadCardMedia isEditable={false} style={{ height: '400px', width: '100%' }} currentImg={img} />
        <Grid sx={{ mt: 1 }} container justifyContent="flex-end">
          <Typography color="primary" variant="overline">
            {participators.length} {participators.length === 1 ? 'user' : 'users'} will participate
          </Typography>
        </Grid>
        <Grid item>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Grid>
        <Grid item sx={{ mb: 1 }}>
          <Typography variant="body2" color="primary">
            {startDate} - {endDate}
          </Typography>
        </Grid>
        {content.length < 900 ? (
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        ) : (
          <div style={{ height: 200 }}>
            <Scrollbars autoHide>
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
            </Scrollbars>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
