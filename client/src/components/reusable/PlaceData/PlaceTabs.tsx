import { Divider, Grid, Paper, Tab, Tabs } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { CachedNews } from '../CachedPlaceData/CachedNews';
import { CachedOpeningHours } from '../CachedPlaceData/CachedOpeningHours';
import { CachedOpinions } from '../CachedPlaceData/CachedOpinions';
import { News } from '../News/News';
import { OpeningHours } from '../OpeningHours/OpeningHours';
import { Opinions } from '../Opinions/Opinions';

const MyTab = (props: any) => {
  const { label, ...rest } = props;
  return <Tab {...rest} label={label} disableRipple />;
};

interface Props {
  isCacheable?: boolean,
  isUserOwner? : boolean
}

export const PlaceTabs: FC<Props> = ({ isCacheable, isUserOwner }) => {

  const [value, setValue] = useState(0);

  const tabs = useMemo(() => {
    if (isCacheable) {
      return [
                <CachedNews key="cachedNews" isUserOwner={isUserOwner} />,
                <CachedOpeningHours key="cachedHours" />,
                <CachedOpinions key="cachedOpinions" isUserOwner={isUserOwner} />,
      ];
    }
    return [
            <News key="news"/>,
            <OpeningHours key="hours" />,
            <Opinions key="opinions" />,
    ];

  }, [isCacheable]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
        <Grid container item lg={12} style={{ marginTop: 10 }}>
            <Divider style={{ width: '100%' }} />
            <Paper square style={{ width: '100%', background: 'inherit' }}>
                <Tabs
                    value={value}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                >
                    <MyTab label="News" />
                    <MyTab label="Opening hours" />
                    <MyTab label="Opinions" />
                </Tabs>
            </Paper>
            <Grid container style={{ height: 495 }}>
                <Scrollbars>
                    {tabs[value]}
                </Scrollbars>
            </Grid>
        </Grid>
  );
};



