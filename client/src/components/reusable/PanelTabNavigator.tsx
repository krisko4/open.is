import { Grid, Paper, Tab, Tabs } from "@mui/material"
import { FC } from "react"
import { Route, useHistory, useRouteMatch } from "react-router-dom"


interface MatchProps {
    id: string
}

interface Props{
    tabs: {
        name: string,
        url: string,
        content: JSX.Element
    }[],
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const PanelTabNavigator: FC<Props> = ({tabs, value, setValue}) => {


    const match = useRouteMatch<MatchProps>()
    const history = useHistory()

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        history.push(`${match.url}/${newValue}`)
    };

    return (
        <Grid container direction="column" style={{ flexGrow: 1 }}>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    // variant="fullWidth"
                    sx={{ width: '100%' }}
                >
                    {tabs.map((tab) =>
                        <Tab key={tab.name} value={tab.url} disableRipple label={tab.name} />
                    )}
                </Tabs>
            </Paper>
            <Grid container sx={{ flexGrow: 1 }}>
                {tabs.map((tab) =>
                    //@ts-ignore
                    <Route key={tab.name}  path={`${match.url}/${tab.url as string}`}>
                        {tab.content}
                    </Route>
                )}
            </Grid>

        </Grid>
    )
}