import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Grid, List, ListItemButton, Typography } from '@mui/material';
import { FC } from 'react';
import { Participator } from 'store/api/types';

interface Props {
  participators: Participator[];
}

export const ParticipatorList: FC<Props> = ({ participators }) => {
  return (
    <List sx={{ flexGrow: 1 }}>
      {participators.map((participator, index) => (
        <ListItemButton key={index}>
          <Grid container>
            <Grid item container alignItems="center">
              <Grid item>
                <Avatar style={{ width: 80, height: 80 }} src={participator.img} />
              </Grid>
              <Grid item style={{ marginLeft: 10 }}>
                <Typography variant="h5">{participator.firstName}</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {participator.email}
                </Typography>
              </Grid>
              <Grid item sx={{ flexGrow: 1, textAlign: 'end' }}>
                {participator.isSubscriber ? (
                  <Button startIcon={<CheckIcon />} variant="outlined" color="success">
                    Subscribes
                  </Button>
                ) : (
                  <Button startIcon={<CloseIcon />} variant="outlined" color="error">
                    Subscribes
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </ListItemButton>
      ))}
    </List>
  );
};
