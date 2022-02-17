// @flow 
import { Grid, Paper, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../contexts/PanelContexts/BusinessChainContext';
import { RawPlaceDataProps } from '../../../../contexts/PlaceProps';
import { BusinessChainTable } from './BusinessChainTable';
type Props = {

};

const tabs = [
    {
        name: 'Dashboard',
        content: <h1>Hello world</h1>
    },
    {
        name: 'Locations',
        content: <BusinessChainTable />
    },
    {
        name: 'Settings',
        content: <h1>Hello world</h1>
    },
]


interface StateType {
    place: RawPlaceDataProps
}

export const BusinessChainManagement = (props: Props) => {
    const [value, setValue] = useState(0)
    const location = useLocation<StateType>()
    const {setBusinessChain} = useBusinessChainContext()

    useEffect(() => {
        setBusinessChain(location.state.place)
    }, [])


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Grid container direction="column" style={{ flexGrow: 1 }}>
            <Grid item>
                <Paper square>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        sx={{ width: '100%' }}
                    >
                        {tabs.map((tab) =>
                            <Tab key={tab.name} disableRipple label={tab.name} />
                        )}
                    </Tabs>
                </Paper>
            </Grid>
            <Grid container sx={{ flexGrow: 1 }}>
                {tabs[value].content}
            </Grid>

        </Grid>
    );
};