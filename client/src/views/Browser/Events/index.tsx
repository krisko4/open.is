import { Grid } from '@mui/material';
import { NavigationTabs } from 'components/NavigationTabs';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useSelectedEventsSelector } from 'store/slices/eventSlice';
import { EventDetails } from '../eventDetails';
import { Events } from './components/Events';
import { FilteredEvents } from './components/FilteredEvents';

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
    </Routes>
  );
};
