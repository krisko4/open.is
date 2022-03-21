import { ListSubheader, List } from '@mui/material';
import { ListItemLink } from 'components/reusable/ListItemLink';
import React, { FC, useMemo } from 'react';
import { useGetPlacesByUserId } from 'redux-toolkit/api/placesApi';
interface Props {
  drawerOpen: boolean
}
export const MyPlaces: FC<Props> = ({ drawerOpen }) => {

  const { data: allPlaces } = useGetPlacesByUserId();

  const places = useMemo(() => {
    if (allPlaces) {
      return allPlaces.filter(place => !place.isBusinessChain);
    }
  }, [allPlaces]);

  return (
        <List>
            {places &&
                <>
                    {places.length > 0 &&
                        <>
                            {/* <Divider /> */}
                            {drawerOpen &&
                                <ListSubheader disableSticky>
                                    My places
                                </ListSubheader>
                            }
                            {places.map((place) =>
                                <ListItemLink
                                    key={place._id}
                                    place={place}
                                    to={`management/${place._id}/${place.locations[0]._id as string}/${place.locations[0].isActive ? 'home' : 'opening-hours'}`} />,
                            )}
                        </>
                    }

                </>
            }
        </List>
  );
  
};