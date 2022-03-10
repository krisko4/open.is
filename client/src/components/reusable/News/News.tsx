import AddIcon from '@mui/icons-material/Add';
import Timeline from "@mui/lab/Timeline";
import { Slide, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { FC, useState } from "react";
import Scrollbars from 'react-custom-scrollbars';
import { useIdSelector, useIsUserOwnerSelector, useNewsSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { useLoginContext } from "../../../contexts/LoginContext";
import { NewsDialog } from './NewsDialog';
import { NewsItem } from './NewsItem';







export const News: FC = () => {

    const [newsDialogOpen, setNewsDialogOpen] = useState(false)
    const { userData } = useLoginContext()
    const news = useNewsSelector()
    const isUserOwner = useIsUserOwnerSelector()


    return (
        <Slide timeout={1000} in={true}>
            <Grid container direction="column" style={{ height: '100%' }}>
                {news && news.length > 0 ?
                    <>
                        {
                            userData.isLoggedIn && isUserOwner &&
                            <Grid container style={{ marginTop: 20, paddingRight: 30 }} justifyContent="flex-end">
                                <Button startIcon={<AddIcon />} variant="contained" onClick={() => setNewsDialogOpen(true)} color="primary">Add news</Button>
                            </Grid>
                        }
                        <Grid container sx={{ flexGrow: 1 }}>
                            <Scrollbars autoHide>
                                <Timeline position="alternate">
                                    {news.map((item, index) => <NewsItem item={item} key={index} />
                                    )}
                                </Timeline>
                            </Scrollbars>
                        </Grid>
                    </>
                    :

                    <Grid justifyContent="center" style={{ height: 500 }} direction="column" alignItems="center" container >
                        <Typography variant="h6">This place has not provided any news yet.</Typography>
                        {userData.isLoggedIn && isUserOwner && <Grid item style={{ textAlign: 'center' }}>
                            <Typography variant="subtitle1">Press the button below to add your first news.</Typography>
                            <Button startIcon={<AddIcon />} onClick={() => setNewsDialogOpen(true)} style={{ marginTop: 10 }} variant="contained" color="primary">Add news</Button>
                        </Grid>
                        }
                    </Grid>
                }
                {userData.isLoggedIn &&
                    <NewsDialog dialogOpen={newsDialogOpen} setDialogOpen={setNewsDialogOpen} />
                }
            </Grid>
        </Slide >
    );


}




