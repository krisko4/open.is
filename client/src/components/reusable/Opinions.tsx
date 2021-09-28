import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Slide, SlideProps, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import { Rating } from "@material-ui/lab";
import { ClassNameMap } from "@material-ui/styles";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import myAxios from "../../axios/axios";
import { useAuthSelector } from "../../store/selectors/AuthSelector";
import { LoadingButton } from "./LoadingButton";
import Alert from '@material-ui/lab/Alert';
import Picker, { IEmojiData } from 'emoji-picker-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Scrollbars from "react-custom-scrollbars";



const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface OpinionProps {
    author: string,
    date: string,
    content: string,
    note: number,
    averageNote: number
}

interface Props {
    classes: ClassNameMap<"opinionCard" | "author" | "date" | "content" | "dialog">,
    currentPlace: any,
    setCurrentPlace: React.Dispatch<any>,
    opinions: OpinionProps[],
    setOpinions: React.Dispatch<React.SetStateAction<OpinionProps[]>>,
    opinionCount: number,
    setOpinionCount: React.Dispatch<React.SetStateAction<number>>
}


export const Opinions: FC<Props> = ({ classes, currentPlace, setCurrentPlace, opinions, setOpinions, opinionCount, setOpinionCount }) => {


    const isUserLoggedIn = useAuthSelector()
    const { enqueueSnackbar } = useSnackbar()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [noteValue, setNoteValue] = useState<number | null>(null)
    const [opinionText, setOpinionText] = useState('')
    const [loading, setLoading] = useState(false)
    const [elevation, setElevation] = useState(3)

    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false)

    const handleEmoji = (emoji: IEmojiData) => {
        setOpinionText(opinionText => opinionText + emoji.emoji)
        setEmojiPickerOpen(false)
    }


    const submitOpinion = async () => {
        setLoading(true)
        if (noteValue) {
            const opinion = {
                authorId: localStorage.getItem('uid'),
                placeId: currentPlace._id,
                content: opinionText,
                note: noteValue
            }
            try {
                const res = await myAxios.post('/opinions', opinion)
                console.log(res.data)

                setOpinions(opinions => {
                    return [
                        res.data.opinion,
                        ...opinions
                    ]

                })
                setOpinionCount(opinionCount => opinionCount + 1)
                const updatedPlace = { ...currentPlace }
                updatedPlace.averageNote = res.data.averageNote
                updatedPlace.opinions = [res.data.opinion, ...opinions]
                console.log(updatedPlace)
                setCurrentPlace(updatedPlace)
                setDialogOpen(false)
                //  setOpinionCount(opinionCount => opinionCount + 1)
                enqueueSnackbar('Your opinion has been added successfully', {
                    variant: 'success'
                })

            } catch (err) {
                console.log(err)
                enqueueSnackbar('Oops, something went wrong', {
                    variant: 'error'
                })

            } finally {
                setLoading(false)
            }
        }

    }

    return (

                <Grid container justify="center" style={{height: '100%'}}>
                    <Grid container item lg={11} direction="column" style={{ marginTop: 20, marginBottom: 20 }}>
                        {opinions.length > 0 ?
                            <div>
                                <Grid container justify="space-between" >
                                    <Alert severity="info" variant="filled">{opinions.length} {opinions.length > 1 ? <span>users have</span> : <span>user has</span>} commented on this place.</Alert>
                                    {isUserLoggedIn && currentPlace.isUserOwner &&
                                        <Button startIcon={<AddIcon />} style={{ marginTop: 5, marginBottom: 5 }} onClick={() => setDialogOpen(true)} color="primary" variant="contained">New opinion</Button>
                                    }
                                </Grid>
                                {
                                    opinions.map((opinion, index) =>
                                        <Grid item key={index} style={{ marginTop: 20, marginBottom: 20 }}>
                                            <Card onMouseEnter={() => setElevation(10)} onMouseLeave={() => setElevation(3)} elevation={elevation} style={{ borderRadius: 10 }} className={classes.opinionCard} >
                                                <CardContent>
                                                    <Grid container justify="space-between">
                                                        <Typography variant="h6" className={classes.author}>{opinion.author}</Typography>
                                                        <Rating
                                                            readOnly={true}
                                                            value={opinion.note}
                                                        />

                                                    </Grid>
                                                    <Typography variant="caption" className={classes.date}>{opinion.date}</Typography>
                                                    <Typography variant="subtitle1" className={classes.content}>{opinion.content}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )}
                            </div>
                            : <Grid container direction="column" justify="center" style={{height: '100%'}} alignItems="center">
                                <Typography variant="h6" className={classes.content}>This place doesn't have any opinions yet.</Typography>
                                {isUserLoggedIn ? <Grid item style={{ textAlign: 'center' }}>
                                    <Typography style={{ color: "grey" }} variant="subtitle1">Press the button below to be the first advisor.</Typography>
                                    <Button style={{ marginTop: 10 }} startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} color="primary" variant="contained">New opinion</Button>
                                </Grid>
                                    : <Typography variant="subtitle1" style={{ color: 'grey' }}>If you want to be the first advisor, please sign in to your account.</Typography>
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
                                <DialogTitle className="dialogTitle">New opinion</DialogTitle>
                                <DialogContent>
                                    <DialogContentText className="dialogContentText" style={{ textAlign: 'center' }}>
                                        We would love to know your opinion about the place you are currently browsing.
                                        If you are disappointed with services provided by this business, please try
                                        to share your mind using kind words.
                                    </DialogContentText>
                                    <Grid container justify="center">
                                        <Rating
                                            value={noteValue}
                                            name="rating"
                                            onChange={(event, newValue) => setNoteValue(newValue)}
                                        />
                                    </Grid>
                                    <Grid container style={{ marginTop: 20 }}>
                                        <TextField
                                            fullWidth={true}
                                            label="This is my opinion!"
                                            multiline
                                            value={opinionText}
                                            onChange={(e) => setOpinionText(e.target.value)}
                                            rows={10}
                                            variant="outlined"
                                            rowsMax={10}
                                            className="opinionArea"
                                            InputProps={{
                                                className: 'input',
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setEmojiPickerOpen(current => !current)}>
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
                                    <LoadingButton loading={loading} disabled={!noteValue || loading} onClick={submitOpinion} variant="contained" color="primary">Submit</LoadingButton>
                                </DialogActions>
                            </Dialog>
                        }
                    </Grid >

                </Grid >
           
        
    )
}