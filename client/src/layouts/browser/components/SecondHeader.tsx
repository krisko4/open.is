import {
  AccountBalance,
  Fastfood,
  LocalBar,
  LocalGasStation,
  LocalMall,
  LocalPharmacy,
  ShoppingCart,
} from '@mui/icons-material';
import { Chip, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Searcher from 'layouts/browser/components/Searcher';
import React, { FC, useState } from 'react';

const businessTypes = [
  {
    label: 'Food',
    icon: <Fastfood />,
  },
  {
    label: 'Barber',
    icon: <Fastfood />,
  },
  {
    label: 'Grocery',
    icon: <ShoppingCart />,
  },
  {
    label: 'Club',
    icon: <LocalBar />,
  },
  {
    label: 'Bank',
    icon: <AccountBalance />,
  },
  {
    label: 'Pharmacy',
    icon: <LocalPharmacy />,
  },
  {
    label: 'Petrol',
    icon: <LocalGasStation />,
  },
  {
    label: 'Mall',
    icon: <LocalMall />,
  },
];

interface ChipProps {
  //   setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>,
  type: {
    label: string;
    icon: JSX.Element;
  };
  [x: string]: any;
}

const CustomChip = (props: ChipProps) => {
  const { type, ...rest } = props;
  const [selected, setSelected] = useState(false);

  //   useEffect(() => {
  //     if (!selected) {
  //       setSelectedTypes(selectedTypes => selectedTypes.filter((selectedType) => selectedType !== type.label));
  //       return;
  //     }
  //     setSelectedTypes(selectedTypes => {
  //       const newSelectedTypes = [...selectedTypes];
  //       newSelectedTypes.push(type.label);
  //       return newSelectedTypes;
  //     });

  //   }, [selected]);

  return (
    <Chip
      {...rest}
      onClick={() => setSelected((isSelected) => !isSelected)}
      style={{ marginRight: 2 }}
      color={selected ? 'error' : 'default'}
      clickable
      label={type.label}
      icon={type.icon}
    />
  );
};

export const SecondHeader: FC = () => {
  return (
    <Paper>
      <Toolbar disableGutters>
        <Grid container>
          <Grid item xs={12} order={{ lg: 1, xs: 2 }} lg={5} sx={{ p: 1 }}>
            <Searcher />
          </Grid>
          <Grid justifyContent="center" container lg={7} order={{ lg: 2, xs: 1 }} item alignItems="center">
            {businessTypes.map((type, index) => (
              <CustomChip type={type} key={index} />
            ))}
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
    // </AppBar>
  );
};
