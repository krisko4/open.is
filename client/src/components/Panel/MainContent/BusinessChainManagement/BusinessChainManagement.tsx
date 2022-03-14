import { CircularProgress, Grid } from '@mui/material';
import * as React from 'react';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdQuery } from 'redux-toolkit/api/placesApi';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setBusinessChain } from 'redux-toolkit/slices/businessChainSlice';
import { NotReady } from '../../../reusable/NotReady';
import { PanelTabNavigator } from '../../../reusable/PanelTabNavigator';
import { Locations } from './Locations/Locations';
import { BusinessChainSettings } from './Settings/BusinessChainSettings';


// interface Props {
//     placeId?: string
// }

export const BusinessChainManagement: FC = () => {
    const dispatch = useAppDispatch()
    const { placeId } = useParams()
    const { data: place, isLoading, isFetching } = useGetPlaceByIdQuery(placeId as string)

    useEffect(() => {
        if (place) {
            dispatch(setBusinessChain(place))
        }
    }, [place])

    const tabs = useMemo(() => {
        return  [
            {
                name: 'Dashboard',
                content: <NotReady key={placeId} />,
                url: 'dashboard'
            },
            {
                name: 'Locations',
                content: <Locations key={placeId} />,
                url: 'locations'
            },
            {
                name: 'Settings',
                content: <BusinessChainSettings key={placeId} />,
                url: 'settings'
            },
        ]

    }, [placeId])


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