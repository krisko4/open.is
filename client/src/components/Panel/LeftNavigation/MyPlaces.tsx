import { ListSubheader, List } from '@mui/material';
import { ListItemLink } from 'components/reusable/ListItemLink';
import React, { FC } from 'react';
import Divider from '@mui/material/Divider';
import { useGetPlacesByUserId } from 'redux-toolkit/api/placesApi';
interface Props{
  drawerOpen: boolean
}
export const MyPlaces: FC<Props> = ({ drawerOpen }) => {

  const { data : places } = useGetPlacesByUserId();

  return <List>
        {places && places.length > 0 &&
            <>
            <Divider/>
            {drawerOpen &&
                <ListSubheader disableSticky>
                    My places
                </ListSubheader>
            }
                { places && places.filter(place => !place.isBusinessChain).map((place) =>
                    <ListItemLink
                        key={place._id}
                        place={place}
                        to={`management/${place._id}/${place.locations[0]._id as string}/${place.locations[0].isActive ? 'home' : 'opening-hours'}`} />,
                )}
            </>
        }
    </List>;
};