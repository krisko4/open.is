import { Grid, List, ListItem, ListItemText, Paper, Slide } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Overview } from './Overview';
type Props = {

};

interface Option {
    name: string
}

const options = [
    {
        name: 'Overview'
    }
]

const displayOptions = (option: Option) => {
    switch (option.name) {
        case 'Overview':
            return <Overview />
        default:
            return
    }

}
export const Opinions = (props: Props) => {

    const [option, setOption] = useState<Option>({
        name: 'Overview'
    })


    return (
        <Grid container sx={{ overflow: 'hidden' }}>
            <Grid item lg={10}>
                {displayOptions(option)}
            </Grid>
            <Slide in={true} timeout={500} direction="left">
                <Grid item lg={2}>
                    <Paper sx={{ flexGrow: 1, height: '100%' }} square>
                        <List>
                            {options.map(option => (
                                <ListItem
                                    key={option.name}
                                    button
                                    onClick={() => setOption(option)}
                                >
                                    <ListItemText
                                        primary={option.name}>
                                    </ListItemText>

                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                </Grid>

            </Slide>
        </Grid>
    );
};