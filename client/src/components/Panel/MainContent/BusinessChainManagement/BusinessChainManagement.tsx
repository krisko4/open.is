import { CircularProgress, Grid } from '@mui/material';
import { clearPlace } from 'contexts/PanelContexts/CurrentPlaceContext';
import { RawPlaceDataProps } from 'contexts/PlaceProps';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setBusinessChain } from 'redux-toolkit/slices/businessChainSlice';
import { getPlaceById } from 'requests/PlaceRequests';
import { NotReady } from '../../../reusable/NotReady';
import { PanelTabNavigator } from '../../../reusable/PanelTabNavigator';
import { Locations } from './Locations/Locations';
import { BusinessChainSettings } from './Settings/BusinessChainSettings';
import { setCurrentPlace } from 'redux-toolkit/slices/currentPlaceSlice'
import { useGetPlaceByIdQuery } from 'redux-toolkit/api/placesApi';

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
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const { data, isLoading,  isSuccess, isFetching } = useGetPlaceByIdQuery(placeId)

    useEffect(() => {
        if (data) {
            dispatch(setBusinessChain(data))
        }
    }, [data])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             if (!placeId) return
    //             const res = await getPlaceById(placeId)
    //             const place = res.data as RawPlaceDataProps
    //             dispatch(setBusinessChain(place))
    //         } catch (err) {
    //             console.log(err)
    //         } finally {
    //             setLoading(false)
    //         }
    //     })()
    // }, [placeId])


    return (
        <>
            {
                isLoading || isFetching ?
                    <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center" >
                        <CircularProgress size={100} />
                    </Grid > :
                    <PanelTabNavigator tabs={tabs} />
            }
        </>
    );
};