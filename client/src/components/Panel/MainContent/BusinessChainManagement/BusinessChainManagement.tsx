import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../contexts/PanelContexts/BusinessChainContext';
import { CurrentPlaceContextProvider } from '../../../../contexts/PanelContexts/CurrentPlaceContext';
import { RawPlaceDataProps } from '../../../../contexts/PlaceProps';
import { usePlacesSelector } from '../../../../store/selectors/PlacesSelector';
import { NotReady } from '../../../reusable/NotReady';
import { PanelTabNavigator } from '../../../reusable/PanelTabNavigator';
import { Locations } from './Locations/Locations';
type Props = {

};

const tabs = [
    {
        name: 'Dashboard',
        content: <NotReady/>,
        url: 'dashboard'
    },
    {
        name: 'Locations',
        content: <Locations />,
        url: 'locations'
    },
    {
        name: 'Settings',
        content: <NotReady/>,
        url: 'settings'
    },
]


interface StateType {
    id: string
}

export const BusinessChainManagement = (props: Props) => {
    const [value, setValue] = useState('dashboard')
    const location = useLocation()
    const places = usePlacesSelector()
    const { businessChain, setBusinessChain } = useBusinessChainContext()
    const match = useRouteMatch<StateType>()
    const history = useHistory()


    useEffect(() => {
        const { id } = match.params
        console.log(id)
        console.log(location.pathname)
        console.log(match.url)
        // if (location.pathname === `${match.url}`) {
        //     console.log('in')
        //     history.push(`${match.url}/dashboard`)
        // }
        if (id !== businessChain._id) {
            const businessChain = places.find(pl => pl._id === id) as RawPlaceDataProps
            setBusinessChain(businessChain)
        }
        const dest = location.pathname.substring(match.url.length + 1)
        setValue(dest)
    }, [match])

    return (
        <CurrentPlaceContextProvider>
            <PanelTabNavigator areBusinessChainTabs={true} value={value} setValue={setValue} placeId={match.params.id} tabs={tabs} />
        </CurrentPlaceContextProvider>
    );
};