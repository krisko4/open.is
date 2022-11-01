import { CircularProgress, Grid } from '@mui/material';
import { NotReady } from 'components/NotReady';
import { PanelTabNavigator } from 'components/PanelTabNavigator';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdAndSelectedLocationQuery } from 'store/api';
import { useCustomSnackbar } from 'utils/snackbars';
import { OpeningHoursWrapper } from 'views/panel/openingHours/components/OpeningHoursWrapper';
import { PlaceDashboard } from 'views/panel/placeDashboard';
import { PlaceSettings } from 'views/panel/placeSettings';
import Referrals from 'views/panel/referrals';
import { Subscriptions } from 'views/panel/subscriptions';
import { Events } from '../views/panel/events';

export enum Destinations {
  HOME = 'home',
  STATISTICS = 'statistics',
  OPENING_HOURS = 'opening-hours',
  EVENTS = 'events',
  OPINIONS = 'opinions',
  NEWS = 'news',
  VISITS = 'visits',
  SETTINGS = 'settings',
  SUBSCRIPTIONS = 'subscriptions',
  REFERRALS = 'referrals',
  NONE = '',
}

export const PlaceBoard: FC = () => {
  const { enqueueErrorSnackbar } = useCustomSnackbar();
  const { placeId, locationId } = useParams();

  const {
    data: place,
    isFetching,
    isError,
  } = useGetPlaceByIdAndSelectedLocationQuery({
    placeId: placeId as string,
    locationId: locationId as string,
  });

  useEffect(() => {
    if (isError) {
      enqueueErrorSnackbar();
    }
  }, [isError, enqueueErrorSnackbar]);

  const tabs = useMemo(() => {
    const key = place?._id as string;
    const settingsTab = {
      name: 'Settings',
      url: Destinations.SETTINGS,
      content: <PlaceSettings key={key} />,
    };

    const returnedTabs = [
      {
        name: 'Home',
        url: Destinations.HOME,
        content: <PlaceDashboard key={key} />,
      },
      {
        name: 'Statistics',
        url: Destinations.STATISTICS,
        content: <NotReady />,
      },
      {
        name: 'Opening hours',
        url: Destinations.OPENING_HOURS,
        content: <OpeningHoursWrapper key={key} />,
      },
      {
        name: 'Events',
        url: Destinations.EVENTS,
        content: <Events />,
      },
      {
        name: 'Opinions',
        url: Destinations.OPINIONS,
        content: <NotReady />,
      },
      {
        name: 'News',
        url: Destinations.NEWS,
        content: <NotReady />,
      },
      {
        name: 'Visits',
        url: Destinations.VISITS,
        content: <NotReady />,
      },
      {
        name: 'Subscriptions',
        url: Destinations.SUBSCRIPTIONS,
        content: <Subscriptions />,
      },
      {
        name: 'Referrals',
        url: Destinations.REFERRALS,
        content: <Referrals />,
      },
    ];
    if (!place?.isBusinessChain) returnedTabs.push(settingsTab);
    return returnedTabs;
  }, [place]);

  return (
    <>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <PanelTabNavigator tabs={tabs} />
      )}
    </>
  );
};
