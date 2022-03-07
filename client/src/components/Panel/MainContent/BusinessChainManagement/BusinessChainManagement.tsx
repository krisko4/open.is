import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../contexts/PanelContexts/BusinessChainContext';
import { CurrentPlaceContextProvider } from '../../../../contexts/PanelContexts/CurrentPlaceContext';
import { RawPlaceDataProps } from '../../../../contexts/PlaceProps';
import { NotReady } from '../../../reusable/NotReady';
import { PanelTabNavigator } from '../../../reusable/PanelTabNavigator';
import { Locations } from './Locations/Locations';
import { BusinessChainSettings } from './Settings/BusinessChainSettings';
import { Image } from '../../../../contexts/PlaceProps'
import { convertToCurrentPlace } from '../../../../utils/place_data_utils';
import { usePlacesSelector } from 'redux-toolkit/slices/placesSlice';
type Props = {

};

const tabs = [
    {
        name: 'Dashboard',
        content: <NotReady />,
        url: 'dashboard'
    },
    {
        name: 'Locations',
        content: <Locations />,
        url: 'locations'
    },
    {
        name: 'Settings',
        content: <BusinessChainSettings />,
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


    useEffect(() => {
        const { id } = match.params
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