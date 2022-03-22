import { ListSubheader } from '@mui/material';
import { ListItemLink } from 'components/reusable/ListItemLink';
import Divider from '@mui/material/Divider';
import { FC, useMemo } from 'react';
import { useGetPlacesByUserId } from 'redux-toolkit/api/placesApi';

interface Props {
  drawerOpen: boolean;
}

export const MyBusinessChains: FC<Props> = ({ drawerOpen }) => {
  const { data: allPlaces } = useGetPlacesByUserId();

  const chains = useMemo(() => {
    if (allPlaces) {
      return allPlaces.filter((place) => place.isBusinessChain);
    }
  }, [allPlaces]);

  return (
    <>
      {chains && (
        <>
          {chains.length > 0 && (
            <>
              <Divider />
              {drawerOpen && <ListSubheader disableSticky>My business chains</ListSubheader>}
              {chains.map((place) => (
                <ListItemLink key={place._id} place={place} to={`business-chain/${place._id as string}/dashboard`} />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};
