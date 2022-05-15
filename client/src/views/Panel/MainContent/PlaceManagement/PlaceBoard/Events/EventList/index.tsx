import { Button, Fade, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { CachedEvent } from 'components/Event/CachedEvent';
import { FC } from 'react';
import { EventData } from 'redux-toolkit/api/types';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Add } from '@mui/icons-material';
import { Options } from '../enums';

interface Props {
  events: EventData[];
  setSelectedOption: React.Dispatch<React.SetStateAction<Options | null>>;
}
export const EventList: FC<Props> = ({ events, setSelectedOption }) => {
  return (
    <Grid container sx={{ p: 1 }}>
      <Grid sx={{ mb: 1 }} container justifyContent="flex-end">
        <Button startIcon={<Add />} variant="contained" onClick={() => setSelectedOption(Options.NEW_EVENT)}>
          New event
        </Button>
        <Tooltip title="Filter events">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      {events.map((event, index) => (
        <Fade in={true} timeout={1000} key={event.title + index}>
          <Grid item sx={{ p: 1 }} xs={4}>
            <CachedEvent eventData={event} />
          </Grid>
        </Fade>
      ))}
    </Grid>
  );
};
