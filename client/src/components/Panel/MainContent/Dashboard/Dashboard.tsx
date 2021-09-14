import { Button, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import React, { FC } from "react";
import { ChosenOptions, usePanelContext } from "../../../../contexts/PanelContext";
import { StatisticChart } from "./StatisticChart";



export const Dashboard: FC = () => {

    const { setSelectedOption } = usePanelContext()

    return (
        <Grid item lg={11} style={{ marginTop: 40 }}>
            <Typography variant="h3">
                <Grid container>
                    <Grid item lg={10}>
                        Hello, {`${localStorage.getItem('fullName')?.split(' ')[0]}`}
                    </Grid>
                    <Grid item container justify="flex-end" lg={2} >
                        <Grid item style={{ marginRight: 5 }}>
                            <Button onClick={() => setSelectedOption(ChosenOptions.NEW_PLACE)} startIcon={<AddIcon />} variant="contained" color="primary">
                                New place
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Typography>
            <Typography variant="body1">welcome to your personal dashboard</Typography>
            <Grid container style={{ marginTop: 20 }} item justify="space-between">
                <Grid item lg={6}>
                    <Card elevation={3} style={{ borderRadius: 15, marginRight: 10 }}>
                        <CardContent>
                            <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                            <Grid container style={{ marginTop: 5 }}>
                                <Grid container item lg={10} alignItems="center">
                                    <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                    <span style={{ marginLeft: 5 }}>+10.5%</span>
                                </Grid>
                                <Grid item lg={2} >
                                    <EqualizerIcon fontSize="large" color="primary" />
                                </Grid>
                            </Grid>
                            <Typography variant="h3">
                                18 000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6}>
                    <Card elevation={3} style={{ borderRadius: 15, marginRight: 10 }}>
                        <CardContent>
                            <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                            <Grid container style={{ marginTop: 5 }}>
                                <Grid container item lg={10} alignItems="center">
                                    <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                    <span style={{ marginLeft: 5 }}>+10.5%</span>
                                </Grid>
                                <Grid item lg={2} >
                                    <EqualizerIcon fontSize="large" color="primary" />
                                </Grid>
                            </Grid>
                            <Typography variant="h3">
                                18 000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={12} style={{ marginTop: 20, marginBottom: 20 }}>
                    <StatisticChart />
                </Grid>
            </Grid>
        </Grid>
    )
}