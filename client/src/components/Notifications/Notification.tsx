import { Typography, Card, CardContent, Grid, Avatar } from '@mui/material';
import { FC, useState } from 'react';

interface NotificationProps {
  image: string;
  title: string;
  content: string;
}

interface Props {
  notificationData: NotificationProps;
}
export const Notification: FC<Props> = ({ notificationData }) => {
  const [elevation, setElevation] = useState(3);
  return (
    <Card
      // className={classes.card}

      sx={{ flexGrow: 1, backgroundColor: 'transparent' }}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(3)}
      //   elevation={elevation}
      //   onMouseEnter={() => setElevation(10)}
      //   onMouseLeave={() => setElevation(3)}
    >
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item container alignItems="center">
            <Grid item>
              <Avatar
                imgProps={{
                  style: {
                    objectFit: 'contain',
                  },
                }}
                style={{ width: 80, height: 80 }}
                src={notificationData.image as string}
                alt={notificationData.title}
              />
            </Grid>
            <Grid item xs={9} style={{ marginLeft: 10 }}>
              <Typography variant="h6">{notificationData.title}</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {notificationData.content}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
