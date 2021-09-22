import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Rating } from "@material-ui/lab";
import React, { FC } from "react";
import { ChosenOptions, usePanelContext } from "../../../../contexts/PanelContext";
import { StatisticChart } from "./StatisticChart";


const useStyles = makeStyles({
    shadowCard: {
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    //    boxShadow:  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        borderRadius: 15
    }
})

export const Dashboard: FC = () => {

    const { setSelectedOption } = usePanelContext()
    const classes = useStyles()

    return (
        <Grid item lg={11} style={{ marginTop: -130 }}>
            <Typography variant="h3" style={{color: 'white'}}>
                <Grid container>
                    <Grid item lg={10}>
                        Hello, {`${localStorage.getItem('fullName')?.split(' ')[0]}`}
                    </Grid>
                    <Grid item container justify="flex-end" lg={2} >
                        <Grid item style={{ marginRight: 5 }}>
                            <Button onClick={() => setSelectedOption(ChosenOptions.NEW_PLACE)} startIcon={<AddIcon />} variant="contained" color="secondary">
                                New place
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Typography>
            <Typography variant="body1" style={{color: 'white'}}>welcome to your personal dashboard</Typography>
            <Grid container style={{ marginTop: 20 }} spacing={2} justify="space-between">
                <Grid item lg={6}>
                    <Card elevation={3} className={classes.shadowCard}>
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
                    <Card elevation={3} className={classes.shadowCard}>
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
              
                    <Grid item lg={6}>
                        <Card className={classes.shadowCard} style={{ flexGrow: 1}}>
                            <CardContent>
                                <Typography variant="h5">
                                    Activity
                                </Typography>
                                <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                    The following chart represents historical data of user activity in your places
                                </Typography>
                                {/* <StatisticChart /> */}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={6}>
                        <Card style={{ flexGrow: 1 }} className={classes.shadowCard}>
                            <CardContent>
                                <Typography style={{ fontWeight: 'bold' }} variant="overline">Most popular</Typography>
                                <Grid container direction="column" alignItems="center">
                                    <Avatar
                                        src="https://static.gazetka-24.pl/image/shop/auchan/logo_512.png"
                                        alt="elo"
                                        style={{ height: 100, width: 100 }}
                                    />
                                    <Typography variant="h3" style={{ fontWeight: 'bold' }}>
                                        Business name
                                    </Typography>
                                    <Typography variant="h6" >
                                        This is a short subtitle of my place
                                    </Typography>
                                    <Grid container style={{ marginTop: 20 }} justify="space-evenly">
                                        <Grid item lg={4}>
                                            <Card style={{ flexGrow: 1, marginRight: 10 }}>
                                                <CardContent>
                                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                                    <Grid container justify="center">
                                                        <Typography variant="h4" style={{ borderBottom: '5px solid red', fontWeight: 'bold' }}>1800</Typography>
                                                    </Grid>
                                                    <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Visits today: 50</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <Card style={{ flexGrow: 1, marginRight: 10 }}>
                                                <CardContent>
                                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                                                    <Grid container justify="center">
                                                        <Typography variant="h4" style={{ borderBottom: '5px solid red', fontWeight: 'bold' }}>1800</Typography>
                                                        <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Opinions today: 3</Typography>
                                                    </Grid>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <Card style={{ flexGrow: 1 }}>
                                                <CardContent>
                                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Average note</Typography>
                                                    <Grid container justify="center">
                                                        <Rating value={5} readOnly />
                                                        <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Costam: 3</Typography>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
       
    )
}