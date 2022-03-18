
import { ListSubheader } from '@mui/material';
import { ListItemLink } from 'components/reusable/ListItemLink';
import Divider from '@mui/material/Divider';
import { FC } from 'react';
import { useGetPlacesByUserId } from 'redux-toolkit/api/placesApi';

interface Props{
  drawerOpen: boolean
}

export const MyBusinessChains: FC<Props> = ({ drawerOpen }) => {


  const { data : places } = useGetPlacesByUserId();

  return <>
        {places && places.filter(place => place.isBusinessChain).length > 0 &&
            <>
            <Divider/>
            {drawerOpen && 
                <ListSubheader disableSticky>
                    My business chains
                </ListSubheader>
            }
                {places.filter(place => place.isBusinessChain).map((place) =>
                    <ListItemLink key={place._id} place={place} to={`business-chain/${place._id as string}/dashboard`} />,
                )}
            </>
        }
    </>;
};