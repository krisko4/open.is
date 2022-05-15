import { Grid } from '@mui/material';
import { NavigationTabs } from 'components/NavigationTabs';
import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { FilteredEvents } from './FilteredEvents';

enum EventFilters {
  POPULAR = '/events/popular',
  TODAY = '/events/today',
}

const TABS = [
  {
    name: 'Today',
    url: 'today',
  },
  {
    name: 'Popular',
    url: 'popular',
  },
  {
    name: 'This week',
    url: 'this-week',
  },
];

const FILTER_ROUTES = [
  {
    path: 'popular',
    filter: EventFilters.POPULAR,
  },
  {
    path: 'today',
    filter: EventFilters.TODAY,
  },
  {
    path: 'this-week',
    filter: EventFilters.TODAY,
  },
];

export const EventBoard: FC = () => {
  return (
    <Grid container sx={{ flexGrow: 1 }} direction="column">
      {/* <Routes>
        {selectedEvents.map((event) => (
          <Route path={event._id} key={event._id} element={<EventDetails event={event} />} />
        ))}
      </Routes> */}
      <NavigationTabs tabs={TABS} />
      <Routes>
        {FILTER_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<FilteredEvents key={route.path} fetchUrl={route.filter} />}
          />
        ))}
      </Routes>
    </Grid>
  );
};
