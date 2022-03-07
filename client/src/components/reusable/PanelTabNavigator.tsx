import { Grid, Paper, Slide, Tab, Tabs } from "@mui/material"
import React, { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"



interface Props {
    tabs: {
        name: string,
        url: string,
        content: any
    }[],
    placeId: string,
    value: string,
    setValue: any,
    areBusinessChainTabs?: boolean
}


export const PanelTabNavigator: FC<Props> = (({ value, areBusinessChainTabs, setValue, tabs, placeId }) => {


    const navigate = useNavigate()


    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        // navigate(newValue)
    };

    return (
        <Grid container direction="column" style={{ overflow: 'hidden', flexGrow: 1 }}>
            <Slide in={true} timeout={500}>
                <Paper>
                    <Tabs
                        value={value}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={handleChange}
                        // variant="fullWidth"
                        sx={{ width: '100%' }}
                    >
                        {tabs.map((tab) =>
                            <Tab key={tab.name} value={tab.url} disableRipple label={tab.name} />
                        )}
                    </Tabs>
                </Paper>
            </Slide>
            <Grid container sx={{ flexGrow: 1 }}>
                {/* {
                    tabs.map((tab) =>
                        <Route
                            key={tab.url}
                            element={() => tab.content}
                            // component={() => <>
                            //     {value === tab.url && (placeId === currentPlace._id || areBusinessChainTabs) &&
                            //         tab.content
                            //     }
                            // </>}
                            path={tab.url}
                        />
                    )
                } */}
                <Outlet/>
            </Grid>


        </Grid>
    )
})