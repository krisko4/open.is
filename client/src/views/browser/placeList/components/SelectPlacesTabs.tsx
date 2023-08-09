import { Favorite, FiberNew, Star, Subscriptions, Timelapse } from '@mui/icons-material';
import { FC, useMemo } from 'react';
import { useLoginContext } from 'contexts/LoginContext';
import { NavigationTabs } from 'components/NavigationTabs';

interface Tab {
  name: string;
  url: string;
  icon: JSX.Element;
}

export const SelectPlacesTabs: FC = () => {
  const { userData } = useLoginContext();
  const tabs = useMemo(() => {
    return [
      {
        name: 'Popular',
        url: 'popular',
        icon: <FiberNew color="success" />,
      },
      {
        name: 'Recently added',
        url: 'recent',
        icon: <Timelapse color="primary" />,
      },
      {
        name: 'Top rated',
        url: 'top',
        icon: <Star sx={{ color: 'yellow' }} />,
      },
      {
        name: 'Favorite',
        url: 'favorite',
        icon: <Favorite color="error" />,
      },
      userData.isLoggedIn && {
        name: 'Subscriptions',
        url: 'subscribed',
        icon: <Subscriptions color="error" />,
      },
    ] as Tab[];
  }, [userData.isLoggedIn]);
  return <NavigationTabs variant="fullWidth" tabs={tabs} />;
};
