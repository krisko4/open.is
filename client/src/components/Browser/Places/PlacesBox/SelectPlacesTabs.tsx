import { NavigationTabs } from 'components/reusable/NavigationTabs';
import { Favorite, FiberNew, Star, Subscriptions, Timelapse } from '@mui/icons-material';
import { FC } from 'react';

export const SelectPlacesTabs: FC = () => {
  const tabs = [
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
    {
      name: 'Subscriptions',
      url: 'subscribed',
      icon: <Subscriptions />,
    },
  ];

  return <NavigationTabs variant="fullWidth" tabs={tabs} />;
};
