import { Button, Fade, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { CachedEvent } from 'components/Event/CachedEvent';
import { FC, useState } from 'react';
import { EventData } from 'redux-toolkit/api/types';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Add } from '@mui/icons-material';
import { EventOptions } from '../enums';
import { FullHeightDialog } from 'components/Dialogs';
import { EventManagement } from '../EventManagement';

interface Props {
  events: EventData[];
  setSelectedOption: React.Dispatch<React.SetStateAction<EventOptions | null>>;
}
export const EventList: FC<Props> = ({ events, setSelectedOption }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const handleClick = (event: EventData) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };
  return (
    <Grid container sx={{ p: 2 }}>
      <FullHeightDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} title="Event management">
        {selectedEvent && <EventManagement event={selectedEvent} />}
      </FullHeightDialog>
      <Grid sx={{ mb: 1 }} container justifyContent="flex-end">
        <Grid item>
          <Button startIcon={<Add />} variant="contained" onClick={() => setSelectedOption(EventOptions.NEW_EVENT)}>
            New event
          </Button>
          <Tooltip title="Filter events">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {events.map((event, index) => (
        <Fade in={true} timeout={1000} key={event.title + index}>
          <Grid item sx={{ p: 1 }} xs={4}>
            <CachedEvent onClick={() => handleClick(event)} eventData={event} />
          </Grid>
        </Fade>
      ))}
    </Grid>
  );
};
