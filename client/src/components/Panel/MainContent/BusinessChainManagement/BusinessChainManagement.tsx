import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePlacesSelector } from 'redux-toolkit/slices/placesSlice';
import { useBusinessChainContext } from '../../../../contexts/PanelContexts/BusinessChainContext';
import { CurrentPlaceContextProvider } from '../../../../contexts/PanelContexts/CurrentPlaceContext';
import { NotReady } from '../../../reusable/NotReady';
import { PanelTabNavigator } from '../../../reusable/PanelTabNavigator';
import { Locations } from './Locations/Locations';
import { BusinessChainSettings } from './Settings/BusinessChainSettings';
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



export const BusinessChainManagement = (props: Props) => {
    const [value, setValue] = useState('dashboard')
    const location = useLocation()
    const places = usePlacesSelector()
    const { businessChain, setBusinessChain } = useBusinessChainContext()


    // useEffect(() => {
    //     const { id } = match.params
    //     if (id !== businessChain._id) {
    //         const businessChain = places.find(pl => pl._id === id) as RawPlaceDataProps
    //         setBusinessChain(businessChain)
    //     }
    //     const dest = location.pathname.substring(match.url.length + 1)
    //     setValue(dest)
    // }, [match])

    return (
            <PanelTabNavigator areBusinessChainTabs={true} value={value} setValue={setValue} placeId={businessChain._id as string} tabs={tabs} />
    );
};