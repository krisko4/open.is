import { Grid, Divider, Paper, Tabs, Tab } from "@mui/material"
import React from "react"
import { FC, useMemo, useState } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { CurrentPlaceProps, NewsProps, OpinionProps } from "../../../../../contexts/PlaceProps"
import { News } from "../../../../reusable/News"
import { OpeningHours } from "../../../../reusable/OpeningHours/OpeningHours"
import { Opinions } from "../../../../reusable/Opinions/Opinions"

const MyTab = (props: any) => {
    const { label, ...rest } = props
    return <Tab {...rest} label={label} disableRipple />
}

export const PlaceTabs: FC = () => {

    const [value, setValue] = useState(0)

    const tabs = [
        // <News />,
        // <OpeningHours/>,
        // <Opinions/>
    ]

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container item lg={12} style={{ marginTop: 10, }}>
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
                    {/* {tabs[value]} */}
                </Scrollbars>
            </Grid>
        </Grid>
    )
}



