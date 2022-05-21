import { Grid } from '@mui/material';
import { NavigationTabs } from 'components/NavigationTabs';
import React, { FC } from 'react';
import { Events } from './Events';
import { Navigate, Routes, Route } from 'react-router';
import { useSelectedEventsSelector } from 'redux-toolkit/slices/eventSlice';
import { EventDetails } from './EventDetails';
import { FilteredEvents } from './FilteredEvents';

enum EventFilters {
  POPULAR = '/events/search/popular',
  TODAY = '/events/search/today',
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
  const selectedEvents = useSelectedEventsSelector();
  return (
    <Routes>
      <Route path="/" element={<Events />}>
        <Route index element={<Navigate to={TABS[0].url} />} />
        {FILTER_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<FilteredEvents key={route.path} fetchUrl={route.filter} />}
          />
        ))}
      </Route>
      <Route path="/:id" element={<EventDetails />} />
      {/* {selectedEvents.map((event) => (
        <Route path={event._id} key={event._id} element={<EventDetails />} />
      ))} */}
    </Routes>
  );
};
