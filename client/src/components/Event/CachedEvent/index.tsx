import {
  Avatar,
  Card,
  CardContent,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { UploadCardMedia } from 'components/ImageUpload/UploadCardMedia';
import { FC, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useNavigate } from 'react-router';
import { EventData } from 'store/api/types';

interface Props {
  eventData: EventData;
  onClick?: () => void;
}
export const CachedEvent: FC<Props> = ({
  onClick,
  eventData: { title, content, img, address, startDate, endDate, participators, place, locationId },
}) => {
  const [elevation, setElevation] = useState(1);
  const navigate = useNavigate();
  const navigateToLocation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/search/${place._id}/${locationId}`);
  };
  return (
    <Card
      onClick={onClick}
      elevation={elevation}
      onMouseEnter={() => setElevation(3)}
      onMouseLeave={() => setElevation(1)}
    >
      <CardContent>
        <UploadCardMedia isEditable={false} style={{ height: '400px', width: '100%' }} currentImg={img} />
        <Grid sx={{ mt: 1 }} container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Tooltip title="Visit location">
              <ListItem button onClick={navigateToLocation}>
                <ListItemAvatar>
                  <Avatar src={place.logo as string} />
                </ListItemAvatar>
                <ListItemText primary={place.name} />
              </ListItem>
            </Tooltip>
          </Grid>
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
          <Typography variant="body2" color="text.secondary">
            {address}
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
