import { Slide, Alert, Card, CardContent, CardMedia, Fade, Grid, Paper, Toolbar, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import * as React from 'react';
import { FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useBusinessChainContext } from '../../../../../contexts/PanelContexts/BusinessChainContext';
import { BusinessChainTable } from './BusinessChainTable/BusinessChainTable';


export const Locations: FC = () => {

    const { businessChain } = useBusinessChainContext()


    return (
        <Scrollbars autoHide>
            <Fade in={true} timeout={1000}>
                <Grid container sx={{ height: '100%' }}>
                    {/* <Paper variant="outlined" sx={{ flexGrow: 1 }} square>
                        <Paper sx={{ height: '100%', pt: 2 }} square> */}
                    <Toolbar sx={{ flexGrow: 1, pt: 2, pb: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item lg={2}>
                                <CardMedia
                                    style={{ height: 200, backgroundSize: 'contain', width: 200, marginTop: 10, borderRadius: 20 }}
                                    image={businessChain.logo as string}
                                />
                            </Grid>
                            <Grid container item lg={6} direction="column"> <Typography variant="h2">
                                {businessChain.name}
                            </Typography>
                                <Typography variant="h6">
                                    {businessChain.subtitle}
                                </Typography>
                            </Grid>
                            <Grid item lg={4}>
                                <Slide timeout={500} in={true} direction="left">
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h3">
                                                Location management
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                In this section you can easily manage your locations.
                                                We have prepared some tips for you:
                                            </Typography>
                                            <Alert icon={<CheckBoxIcon />} severity="info" variant="outlined" sx={{ mb: 1, mt: 1 }}>
                                                Select locations from the table using checkboxes on the left side
                                            </Alert>
                                            <Alert icon={<QueryBuilderIcon />} severity="info" variant="outlined" sx={{ mb: 1 }}>
                                                Modify opening hours of selected locations - all at once!
                                            </Alert>
                                            <Alert icon={<AddLocationAltIcon color="success" />} sx={{ mb: 1 }} severity="info" variant="outlined">
                                                Add new locations to your business chain
                                            </Alert>
                                            <Alert icon={<SettingsIcon color="warning" />} sx={{ mb: 1 }} severity="info" variant="outlined">
                                                Modify contact details of selected locations
                                            </Alert>
                                            <Alert icon={<DeleteIcon color="error" />} severity="info" variant="outlined">
                                                Remove selected locations from your business chain
                                            </Alert>
                                        </CardContent>
                                    </Card>

                                </Slide>
                            </Grid>
                        </Grid>
                    </Toolbar>
                    <Grid container justifyContent="center" sx={{pb: 1}}>
                        <BusinessChainTable />
                    </Grid>
                    {/* </Paper>
                    </Paper> */}
                </Grid>
            </Fade>
        </Scrollbars>
    );
};