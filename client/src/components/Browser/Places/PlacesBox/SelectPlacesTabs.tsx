import { NavigationTabs } from 'components/reusable/NavigationTabs';
import { Favorite, FiberNew, Star, Subscriptions, Timelapse } from '@mui/icons-material';
import { FC, useMemo } from 'react';
import { useLoginContext } from 'contexts/LoginContext';

export const SelectPlacesTabs: FC = () => {
  const { userData } = useLoginContext();
  const tabs = useMemo(() => {
    const returnedTabs = [
      {
        name: 'Popular',
        url: 'popular',
        icon: <FiberNew />,
      },
      {
        name: 'Recently added',
        url: 'recent',
        icon: <Timelapse />,
      },
      {
        name: 'Top rated',
        url: 'top',
        icon: <Star />,
      },
      {
        name: 'Favorite',
        url: 'favorite',
        icon: <Favorite />,
      },
    ];
    if (userData.isLoggedIn)
      returnedTabs.push({
        name: 'Subscriptions',
        url: 'subscribed',
        icon: <Subscriptions />,
      });
    return returnedTabs;
  }, [userData.isLoggedIn]);
  return <NavigationTabs variant="fullWidth" tabs={tabs} />;
};
