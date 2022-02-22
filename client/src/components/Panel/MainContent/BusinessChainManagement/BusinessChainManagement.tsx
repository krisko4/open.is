import { Grid, Paper, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../contexts/PanelContexts/BusinessChainContext';
import { RawPlaceDataProps } from '../../../../contexts/PlaceProps';
import { usePlacesSelector } from '../../../../store/selectors/PlacesSelector';
import { PanelTabNavigator } from '../../../reusable/PanelTabNavigator';
import { BusinessChainTable } from './Locations/BusinessChainTable';
import { Locations } from './Locations/Locations';
type Props = {

};

const tabs = [
    {
        name: 'Dashboard',
        content: <h1>Hello world</h1>,
        url: 'dashboard'
    },
    {
        name: 'Locations',
        content: <Locations />,
        url: 'locations'
    },
    {
        name: 'Settings',
        content: <h1>Hello world</h1>,
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
    const { setBusinessChain } = useBusinessChainContext()
    const match = useRouteMatch<StateType>()
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        const { id } = match.params
        const businessChain = places.find(pl => pl._id === id) as RawPlaceDataProps
        console.log(businessChain)
        setBusinessChain(businessChain)
        console.log('biz')
        // const currentPlace = convertToCurrentPlace(place)[0]
        if (location.pathname === `${match.url}`) {
            history.push(`${match.url}/dashboard`)
        }
        const dest = location.pathname.substring(match.url.length + 1)
        setValue(dest)
        // dispatch(setPlace(currentPlace))
        // setCurrentPlace(currentPlace)
    }, [match])

    return (
        <PanelTabNavigator placeId={match.params.id}  tabs={tabs} />
    );
};