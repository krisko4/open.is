import { Grid, List, ListItem, ListItemText, Paper, Slide } from '@mui/material';
import * as React from 'react';
import { FC, useState } from 'react';
import { OpinionCharts } from './OpinionCharts';
import { Overview } from './Overview';

interface Option {
  name: string
}

const options = [
  {
    name: 'Overview',
  },
  {
    name: 'Charts',
  },

];

const displayOptions = (option: Option) => {
  switch (option.name) {
    case 'Overview':
      return <Overview />;
    case 'Charts':
      return <OpinionCharts/>;
    default:
      return;
  }

};
export const Opinions : FC = () => {

  const [option, setOption] = useState<Option>({
    name: 'Overview',
  });


  return (
        <Grid container sx={{ overflow: 'hidden' }}>
            <Grid item lg={10}>
                {displayOptions(option)}
            </Grid>
            <Slide in={true} timeout={500} direction="left">
                <Grid item lg={2}>
                    <Paper sx={{ flexGrow: 1, height: '100%' }} square>
                        <List>
                            {options.map(opt => (
                                <ListItem
                                    key={opt.name}
                                    button
                                    onClick={() => setOption(opt)}
                                >
                                    <ListItemText
                                        primary={opt.name}>
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