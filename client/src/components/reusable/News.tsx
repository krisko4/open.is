import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputAdornment, Slide, SlideProps, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import { ClassNameMap } from "@material-ui/styles";
import Picker, { IEmojiData } from 'emoji-picker-react';
import { useSnackbar } from "notistack";
import React, { FC, useRef, useState } from "react";
import myAxios from "../../axios/axios";
import { useLoginContext } from "../../contexts/LoginContext";
import { CurrentPlaceProps } from "../../contexts/PanelContexts/CurrentPlaceContext";
import { LoadingButton } from "./LoadingButton";



interface Props {
    classes: ClassNameMap<"paper" | "content" | "title" | "dialog" | "date">,
 
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<any>,

}

type OpenNews = {
    isOpen: boolean,
    newsIndex: number
}


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const News: FC<Props> = ({classes, currentPlace, setCurrentPlace}) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newsTitle, setNewsTitle] = useState('')
    const [newsContent, setNewsContent] = useState('')
    const emojiSource = useRef<'title' | 'content'>('title')
    const {isUserLoggedIn} = useLoginContext()
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [openNews, setOpenNews] = useState<OpenNews>({
        isOpen: false,
        newsIndex: 0
    })
    const { enqueueSnackbar } = useSnackbar()

    const submitNews = () => {
        setLoading(true)
        myAxios.post('/news', {
            title: newsTitle,
            content: newsContent,
            locationId: currentPlace._id
        }, {
            withCredentials: true
        }).then(res => {
            
            currentPlace.news = currentPlace.news && [res.data, ...currentPlace.news]
            setCurrentPlace({...currentPlace})
            enqueueSnackbar('News added successfully', {
                variant: 'success'
            })

            setDialogOpen(false)
        }).catch(err => {
            console.log(err)
            enqueueSnackbar('Oops, something went wrong', {
                variant: 'error'
            })
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
                        isUserLoggedIn && currentPlace.isUserOwner &&
                        <Grid container style={{ marginTop: 20, paddingRight: 30 }} justify="flex-end">
                            <Button startIcon={<AddIcon />} variant="contained" onClick={() => setDialogOpen(true)} color="primary">Add news</Button>
                        </Grid>
                    }
                    <Grid container>
                        <Timeline align="alternate">
                            {currentPlace.news.map((item, index) => <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <TimelineDot>
                                        <AnnouncementIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography variant="h6" className={classes.title}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="caption" className={classes.date}>
                                                {item.date}
                                            </Typography>
                                            <Typography variant="body2" style={{ marginTop: 10 }} className={classes.content}>
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
                            PaperProps={{
                                classes: { root: classes.dialog }
                            }}
                        >
                            <DialogTitle>
                                <Grid container direction="column">
                                    <Typography variant="h6" className={classes.title}>
                                        {currentPlace.news[openNews.newsIndex].title}
                                    </Typography>
                                    <Typography variant="caption" className={classes.content}>
                                        {currentPlace.news[openNews.newsIndex].date}
                                    </Typography>
                                </Grid>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <Typography gutterBottom variant="body2" style={{ marginTop: 10 }} className={classes.content}>
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

                <Grid justify="center" style={{ height: 500 }} direction="column" alignItems="center" container >
                    <Typography variant="h6" className={classes.title}>This place has not provided any news yet.</Typography>
                    {isUserLoggedIn && currentPlace.isUserOwner && <Grid item style={{ textAlign: 'center' }}>
                        <Typography className={classes.content} variant="subtitle1">Press the button below to add your first news.</Typography>
                        <Button startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} style={{ marginTop: 10 }} variant="contained" color="primary">Add news</Button>
                    </Grid>
                    }
                </Grid>
            }
            {isUserLoggedIn &&
                <Dialog
                    open={dialogOpen}
                    TransitionComponent={Transition}
                    onClose={() => setDialogOpen(false)}
                    PaperProps={
                        {
                            classes: { root: classes.dialog }
                        }
                    }

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
                                    className: 'input',
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => { setEmojiPickerOpen(current => !current); emojiSource.current = 'title' }}>
                                                <EmojiEmotionsIcon style={{ color: '#ffb400' }}></EmojiEmotionsIcon>
                                            </IconButton>
                                        </InputAdornment>
                                }}
                                InputLabelProps={{
                                    className: 'input'
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
                                rowsMax={10}
                                className="opinionArea"
                                InputProps={{
                                    className: 'input',
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => { setEmojiPickerOpen(current => !current); emojiSource.current = 'content' }}>
                                                <EmojiEmotionsIcon style={{ color: '#ffb400' }}></EmojiEmotionsIcon>
                                            </IconButton>
                                        </InputAdornment>
                                }}
                                InputLabelProps={{
                                    className: 'input'
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
    )


}




