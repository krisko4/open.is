import { CircularProgress, Grid } from '@mui/material';
import { NotReady } from 'components/NotReady';
import { PanelTabNavigator } from 'components/PanelTabNavigator';
import * as React from 'react';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdQuery } from 'store/api';
import { useAppDispatch } from 'store/hooks';
import { setBusinessChain } from 'store/slices/businessChainSlice';
import { Locations } from 'views/panel/locations';
import { BusinessChainSettings } from '../views/panel/businessChainSettings';

// interface Props {
//     placeId?: string
// }

export const BusinessChainManagement: FC = () => {
  const dispatch = useAppDispatch();
  const { placeId } = useParams();
  const { data: place, isLoading, isFetching } = useGetPlaceByIdQuery(placeId as string);

  useEffect(() => {
    if (place) {
      dispatch(setBusinessChain(place));
    }
  }, [place]);

  const tabs = useMemo(() => {
    return [
      {
        name: 'Dashboard',
        content: <NotReady key={placeId} />,
        url: 'dashboard',
      },
      {
        name: 'Locations',
        content: <Locations key={placeId} />,
        url: 'locations',
      },
      {
        name: 'Settings',
        content: <BusinessChainSettings key={placeId} />,
        url: 'settings',
      },
    ];
  }, [placeId]);

  return (
    <>
      {isLoading || isFetching ? (
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        <PanelTabNavigator tabs={tabs} />
      )}
    </>
  );
};
