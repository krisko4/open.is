import AddIcon from '@mui/icons-material/Add';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputAdornment, Slide, SlideProps, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ClassNameMap } from "@mui/styles";
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FC, useRef, useState } from "react";
import { useLoginContext } from "../../contexts/LoginContext";
import { CurrentPlaceProps } from "../../contexts/PanelContexts/CurrentPlaceContext";
import { addNews } from "../../requests/NewsRequests";
import { useCustomSnackbar } from "../../utils/snackbars";
import { LoadingButton } from "./LoadingButton";



interface Props {
    

    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<any>,

}

type OpenNews = {
    isOpen: boolean,
    newsIndex: number
}


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const News: FC<Props> = ({ currentPlace, setCurrentPlace }) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newsTitle, setNewsTitle] = useState('')
    const [newsContent, setNewsContent] = useState('')
    const emojiSource = useRef<'title' | 'content'>('title')
    const { userData } = useLoginContext()
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [openNews, setOpenNews] = useState<OpenNews>({
        isOpen: false,
        newsIndex: 0
    })
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()

    const submitNews = () => {
        setLoading(true)
        addNews(newsTitle, newsContent, currentPlace._id as string)
            .then(res => {
                currentPlace.news = currentPlace.news && [res.data, ...currentPlace.news]
                setCurrentPlace({ ...currentPlace })
                enqueueSuccessSnackbar('News added successfully')
                setDialogOpen(false)
            }).catch(err => {
                console.log(err)
                enqueueErrorSnackbar()
            }).finally(() => {
                setLoading(false)
            })
    }

    const handleEmoji = (emoji: IEmojiData) => {
        setEmojiPickerOpen(false)
        emojiSource.current === 'title' ? setNewsTitle(title => title + emoji.emoji) : setNewsContent(content => content + emoji.emoji)
    }

    return (
        <Grid container direction="column" style={{ height: '100%' }}>
            {currentPlace.news && currentPlace.news.length > 0 ?
                <>
                    {
                        userData.isLoggedIn && currentPlace.isUserOwner &&
                        <Grid container style={{ marginTop: 20, paddingRight: 30 }} justifyContent="flex-end">
                            <Button startIcon={<AddIcon />} variant="contained" onClick={() => setDialogOpen(true)} color="primary">Add news</Button>
                        </Grid>
                    }
                    <Grid container>
                        <Timeline position="alternate">
                            {currentPlace.news.map((item, index) => <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <TimelineDot>
                                        <AnnouncementIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" >
                                                {item.title}
                                            </Typography>
                                            <Typography variant="caption" >
                                                {item.date}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginTop: 10 }} >
                                                {item.content.length < 100 ? item.content : `${item.content.substring(0, 100)}...`}
                                            </Typography>
                                        </CardContent>
                                        {item.content.length > 50 &&
                                            <CardActions>
                                                <Button size="small" onClick={() => setOpenNews({ isOpen: true, newsIndex: index })} color="primary">
                                                    Learn More
                                                </Button>
                                            </CardActions>
                                        }
                                    </Card>
                                </TimelineContent>
                            </TimelineItem>
                            )}
                        </Timeline>
                        <Dialog
                            open={openNews.isOpen}
                            onClose={() => setOpenNews({ isOpen: false, newsIndex: 0 })}
                            TransitionComponent={Transition}
                           
                        >
                            <DialogTitle>
                                <Grid container direction="column">
                                    <Typography variant="h6" >
                                        {currentPlace.news[openNews.newsIndex].title}
                                    </Typography>
                                    <Typography variant="caption" >
                                        {currentPlace.news[openNews.newsIndex].date}
                                    </Typography>
                                </Grid>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Typography gutterBottom variant="body2" style={{ marginTop: 10 }} >
                                        {currentPlace.news[openNews.newsIndex].content}
                                    </Typography>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenNews({ isOpen: false, newsIndex: 0 })} color="primary">Okay</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>

                </>
                :

                <Grid justifyContent="center" style={{ height: 500 }} direction="column" alignItems="center" container >
                    <Typography variant="h6">This place has not provided any news yet.</Typography>
                    {userData.isLoggedIn && currentPlace.isUserOwner && <Grid item style={{ textAlign: 'center' }}>
                        <Typography  variant="subtitle1">Press the button below to add your first news.</Typography>
                        <Button startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} style={{ marginTop: 10 }} variant="contained" color="primary">Add news</Button>
                    </Grid>
                    }
                </Grid>
            }
            {userData.isLoggedIn &&
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    onClose={() => setDialogOpen(false)}
                   
                >
                    <DialogTitle className="dialogTitle">Add news</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="dialogContentText" style={{ textAlign: 'center' }}>
                            Inform your visitors about new events regarding your company. Adding news regularly
                            is an efficient way to gain new clients and make them visit your place more frequently.
                        </DialogContentText>
                        <Grid container style={{ marginTop: 20 }}>
                            <TextField
                                fullWidth={true}
                                label="This is a title of my news"
                                value={newsTitle}
                                onChange={(e) => setNewsTitle(e.target.value)}
                                InputProps={{
                                
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => { setEmojiPickerOpen(current => !current); emojiSource.current = 'title' }}
                                                size="large">
                                                <EmojiEmotionsIcon style={{ color: '#ffb400' }}></EmojiEmotionsIcon>
                                            </IconButton>
                                        </InputAdornment>
                                }}
                              
                            />
                        </Grid>
                        <Grid container style={{ marginTop: 20 }}>
                            <TextField
                                value={newsContent}
                                onChange={(e) => setNewsContent(e.target.value)}
                                fullWidth={true}
                                label="This is a content of my news"
                                multiline
                                rows={10}
                                variant="outlined"
                                maxRows={10}
                                className="opinionArea"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => { setEmojiPickerOpen(current => !current); emojiSource.current = 'content' }}
                                                size="large">
                                                <EmojiEmotionsIcon style={{ color: '#ffb400' }}></EmojiEmotionsIcon>
                                            </IconButton>
                                        </InputAdornment>
                                }}
                              

                            >
                            </TextField>
                        </Grid>
                        <Dialog open={isEmojiPickerOpen} onClose={() => setEmojiPickerOpen(false)}>
                            <Picker onEmojiClick={(event, emoji) => handleEmoji(emoji)} />
                        </Dialog>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton loading={loading} onClick={submitNews} disabled={loading} variant="contained" color="primary">Submit</LoadingButton>
                    </DialogActions>
                </Dialog>
            }
        </Grid>
    );


}




