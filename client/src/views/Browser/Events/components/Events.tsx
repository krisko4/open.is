import { Grid } from '@mui/material';
import { NavigationTabs } from 'components/NavigationTabs';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

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
export const Events: FC = () => {
  return (
    <Grid container sx={{ flexGrow: 1 }} direction="column">
      <NavigationTabs tabs={TABS} />
      <Outlet />
    </Grid>
  );
};
