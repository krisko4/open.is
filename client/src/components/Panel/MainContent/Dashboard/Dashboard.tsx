import Grid from "@material-ui/core/Grid";
import {Button, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import {StatisticChart} from "./StatisticChart";
import React, {FC} from "react";

interface Props {
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>
}

export const Dashboard: FC<Props> = ({setSelectedOption}) => {
    return(
            <Grid item lg={11} style={{marginTop: 40}}>
                <Typography variant="h3">
                    <Grid container>
                        <Grid item lg={10}>
                            Hello, Dodo
                        </Grid>
                        <Grid item container justify="flex-end" lg={2} >
                            <Grid item style={{marginRight: 5}}>
                                <Button onClick={() => setSelectedOption(1)}  startIcon={<AddIcon/>} variant="contained" color="primary">
                                    New place
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography variant="body1">welcome to your personal dashboard</Typography>
                <Grid container style={{marginTop: 20}} item justify="space-between">
                    <Grid item lg={6}>
                        <Card elevation={3} style={{borderRadius: 15, marginRight: 10}}>
                            <CardContent>
                                <Typography style={{fontWeight: 'bold'}} variant="overline">Total visits</Typography>
                                <Typography variant="body1" style={{marginTop: 5}}>
                                    <Grid container>
                                        <Grid container item lg={10} alignItems="center">
                                            <TrendingUpIcon style={{color: 'lightgreen'}}/>
                                            <span style={{marginLeft: 5}}>+10.5%</span>
                                        </Grid>
                                        <Grid item lg={2} alignItems="center">
                                            <EqualizerIcon fontSize="large" color="primary"/>
                                        </Grid>
                                    </Grid>
                                </Typography>
                                <Typography variant="h3">
                                    18 000
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={6}>
                        <Card elevation={3} style={{borderRadius: 15, marginRight: 10}}>
                            <CardContent>
                                <Typography style={{fontWeight: 'bold'}} variant="overline">Total opinions</Typography>
                                <Typography variant="body1" style={{marginTop: 5}}>
                                    <Grid container>
                                        <Grid container item lg={10} alignItems="center">
                                            <TrendingUpIcon style={{color: 'lightgreen'}}/>
                                            <span style={{marginLeft: 5}}>+10.5%</span>
                                        </Grid>
                                        <Grid item lg={2} alignItems="center">
                                            <EqualizerIcon fontSize="large" color="primary"/>
                                        </Grid>
                                    </Grid>
                                </Typography>
                                <Typography variant="h3">
                                    18 000
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={12} style={{marginTop: 20}}>
                        <StatisticChart/>
                    </Grid>
                </Grid>
            </Grid>
    )
}