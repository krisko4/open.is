import CloseIcon from '@mui/icons-material/Close';
import { AppBar, CircularProgress, Dialog, Fade, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { FullHeightDialog } from 'components/dialogs';
import { Event } from 'components/Event';
import { CachedEvent } from 'components/Event/CachedEvent';
import { FC, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { addEvents, setSelectedEvents, useSelectedEventsSelector } from 'redux-toolkit/slices/eventSlice';
import { getPaginatedEvents } from 'requests/EventRequests';
import { useCustomSnackbar } from 'utils/snackbars';
import { EventDetails } from '../../eventDetails';

interface Props {
  fetchUrl: string;
}
export const FilteredEvents: FC<Props> = ({ fetchUrl }) => {
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const start = useRef(0);
  const limit = useRef(50);
  const total = useRef(1);
  const isFirstFetch = useRef(true);
  const { enqueueErrorSnackbar } = useCustomSnackbar();
  const selectedEvents = useSelectedEventsSelector();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    if (start.current < total.current) {
      try {
        console.log(fetchUrl);
        const res = await getPaginatedEvents(fetchUrl, start.current, limit.current);
        console.log(res);
        const newEvents = res.data.data;
        if (start.current === 0) {
          dispatch(setSelectedEvents(newEvents));
        } else {
          dispatch(addEvents(newEvents));
        }
        start.current += limit.current;
        if (isFirstFetch.current) {
          isFirstFetch.current = false;
          const meta = res.data.metadata;
          if (meta.length > 0) {
            total.current = res.data.metadata[0].total;
          }
        }
      } catch (err) {
        console.log(err);
        enqueueErrorSnackbar();
      }
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  //   const handleScroll = (values: positionValues) => {
  //     if (values.top === 1 && hasMore) {
  //       fetchPlaces();
  //     }
  //   };

  useEffect(() => {
    (async () => {
      await fetchEvents();
      setFirstLoading(false);
    })();
  }, [total]);

  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Scrollbars>
        {loading && (
          <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
            <CircularProgress disableShrink color="secondary" />
          </Grid>
        )}
        <Grid container sx={{ height: '100%' }}>
          {selectedEvents.length === 0 ? (
            <Grid container justifyContent="center" alignItems="center">
              <Typography>No events</Typography>
            </Grid>
          ) : (
            selectedEvents.map((event) => (
              <Fade in={true} key={event._id} timeout={1000}>
                <Grid item xs={4} sx={{ p: 1 }}>
                  <CachedEvent onClick={() => navigate(`/search/events/${event._id}`)} eventData={event} />
                </Grid>
              </Fade>
            ))
          )}
        </Grid>
      </Scrollbars>
    </Grid>
  );
};
