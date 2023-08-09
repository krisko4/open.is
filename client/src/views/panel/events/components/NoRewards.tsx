import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Fade, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { RewardDrawingOptions } from '../enums';

interface Props {
  setSelectedOption: React.Dispatch<React.SetStateAction<RewardDrawingOptions | null>>;
}

export const NoRewards: FC<Props> = ({ setSelectedOption }) => {
  return (
    <Fade in={true} timeout={1000}>
      <Grid container item sx={{ height: '100%' }} justifyContent="center" alignItems="center">
        <Grid item sx={{ textAlign: 'center' }} xs={9}>
          <Typography variant="h5">
            It seems you have not created any reward drawings for your event. Press the button below to create a new
            reward drawing.
          </Typography>
          <Tooltip
            onClick={() => setSelectedOption(RewardDrawingOptions.NEW_REWARD_DRAWING)}
            title="Create new reward drawing"
          >
            <IconButton>
              <PlayCircleOutlineIcon color="success" sx={{ width: 200, height: 200 }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Fade>
  );
};
