import AddIcon from '@mui/icons-material/Add';
import Timeline from "@mui/lab/Timeline";
import { CircularProgress, Grid, Slide } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { FC, useState } from "react";
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';
import { useGetNewsByLocationIdQuery } from 'redux-toolkit/api/placesApi';
import { useIsUserOwnerSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { useLoginContext } from "../../../contexts/LoginContext";
import { NewsDialog } from '../News/NewsDialog';
import { NewsItem } from '../News/NewsItem';






export const CachedNews: FC = () => {

    const {locationId} = useParams()
    const [newsDialogOpen, setNewsDialogOpen] = useState(false)
    const { userData } = useLoginContext()
    const isUserOwner = useIsUserOwnerSelector()
    const { data: news, isFetching } = useGetNewsByLocationIdQuery(locationId as string)


    return (
        <>
            {isFetching ?
                <Grid container style={{ height: '100%' }} justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid>
                :
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
            }
        </>
    );


}




