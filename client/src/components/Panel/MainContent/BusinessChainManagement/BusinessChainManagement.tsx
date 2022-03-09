import { Grid, CircularProgress } from '@mui/material';
import { clearPlace } from 'contexts/PanelContexts/CurrentPlaceContext';
import { RawPlaceDataProps } from 'contexts/PlaceProps';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setBusinessChain, useBusinessChainIdSelector, useBusinessChainSelector } from 'redux-toolkit/slices/businessChainSlice';
import { setCurrentPlace } from 'redux-toolkit/slices/currentPlaceSlice';
import { usePlacesSelector } from 'redux-toolkit/slices/placesSlice';
import { getPlaceById } from 'requests/PlaceRequests';
import { NotReady } from '../../../reusable/NotReady';
import { PanelTabNavigator } from '../../../reusable/PanelTabNavigator';
import { Locations } from './Locations/Locations';
import { BusinessChainSettings } from './Settings/BusinessChainSettings';

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

interface Props {
    placeId: string
}

export const BusinessChainManagement: FC<Props> = ({ placeId }) => {
    const [value, setValue] = useState('dashboard')
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const businessChain = useBusinessChainSelector()


    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                if (!placeId) return
                const res = await getPlaceById(placeId)
                const place = res.data as RawPlaceDataProps
                dispatch(setBusinessChain(place))
                navigate('dashboard')
                setValue('dashboard')
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [placeId])


    useEffect(() => {
        navigate(value)
    }, [value])

    return (
        <>
            {
                loading ?
                    <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center" >
                        <CircularProgress size={100} />
                    </Grid > :
                    <PanelTabNavigator areBusinessChainTabs={true} value={value} setValue={setValue} placeId={businessChain._id as string} tabs={tabs} />
            }
        </>
    );
};