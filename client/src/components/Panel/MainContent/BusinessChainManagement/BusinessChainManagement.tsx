import { RawPlaceDataProps } from 'contexts/PlaceProps';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setBusinessChain, useBusinessChainSelector } from 'redux-toolkit/slices/businessChainSlice';
import { usePlacesSelector } from 'redux-toolkit/slices/placesSlice';
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
    const dipatch = useAppDispatch()
    const navigate = useNavigate()
    const businessChain = useBusinessChainSelector()
    const { id } = useParams()


    useEffect(() => {
        const businessChain = places.find(pl => pl._id === id) as RawPlaceDataProps
        dipatch(setBusinessChain(businessChain))
    }, [id])


    useEffect(() => {
        navigate(value)
    }, [value])
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