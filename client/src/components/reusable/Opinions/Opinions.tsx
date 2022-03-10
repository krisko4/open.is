import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Fade, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Rating, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Grid from "@mui/material/Grid";
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FC, useState } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import { addNewOpinion, useOpinionDataSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { useLoginContext } from "../../../contexts/LoginContext";
import { AverageNoteProps, OpinionProps } from "../../../contexts/PlaceProps";
import { addOpinion } from "../../../requests/OpinionRequests";
import { useCustomSnackbar } from "../../../utils/snackbars";
import DialogTransition from '../DialogTransition';
import { LoadingButton } from "../LoadingButton";
import { OpinionCard } from './OpinionCard';







export const Opinions: FC = () => {


    const { userData } = useLoginContext()
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [noteValue, setNoteValue] = useState<number | null>(null)
    const [opinionText, setOpinionText] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { opinions, isUserOwner, placeId } = useOpinionDataSelector()
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false)

    const handleEmoji = (emoji: IEmojiData) => {
        setOpinionText(opinionText => opinionText + emoji.emoji)
        setEmojiPickerOpen(false)
    }


    const submitOpinion = async () => {
        setLoading(true)
        if (noteValue) {
            const opinion = {
                authorId: localStorage.getItem('uid') as string,
                locationId: placeId as string,
                content: opinionText,
                note: noteValue
            }
            try {
                const res = await addOpinion(opinion)
                const newAverageNote: AverageNoteProps = res.data.averageNote
                const newOpinion: OpinionProps = res.data.opinion
                dispatch(addNewOpinion({
                    opinion: newOpinion,
                    averageNote: newAverageNote
                }))
                setDialogOpen(false)
                enqueueSuccessSnackbar('Your opinion has been added successfully')

            } catch (err) {
                console.log(err)
                enqueueErrorSnackbar()

            } finally {
                setLoading(false)
            }
        }

    }

    return (
        <Fade in={true} timeout={500}>
            <Grid container style={{ height: '100%' }} justifyContent="center">
                <Grid container item xs={11} direction="column" style={{ marginTop: 20, marginBottom: 20 }}>
                    {opinions && opinions.length > 0 ?
                        <div>
                            <Grid container justifyContent="space-between" >
                                <Alert severity="info" variant="filled">{opinions?.length} {opinions && opinions.length > 1 ? <span>users have</span> : <span>user has</span>} commented on this place.</Alert>
                                {userData.isLoggedIn && isUserOwner &&
                                    <Button startIcon={<AddIcon />} style={{ marginTop: 5, marginBottom: 5 }} onClick={() => setDialogOpen(true)} color="primary" variant="contained">New opinion</Button>
                                }
                            </Grid>
                            {
                                opinions.map((opinion, index) =>
                                    <Grid item key={index} style={{ marginTop: 20, marginBottom: 20 }}>
                                        <OpinionCard opinion={opinion} />
                                    </Grid>
                                )}
                        </div>
                        : <Grid container direction="column" justifyContent="center" style={{ height: '100%' }} alignItems="center">
                            <Typography variant="h6" >This place doesn't have any opinions yet.</Typography>
                            {userData.isLoggedIn ? <Grid item style={{ textAlign: 'center' }}>
                                <Typography style={{ color: "grey" }} variant="subtitle1">Press the button below to be the first advisor.</Typography>
                                {isUserOwner ?
                                    <Button style={{ marginTop: 10 }} disabled={true} startIcon={<AddIcon />} color="primary" variant="contained">New opinion</Button>
                                    :
                                    <Button style={{ marginTop: 10 }} onClick={() => setDialogOpen(true)} startIcon={<AddIcon />} color="primary" variant="contained">New opinion</Button>
                                }
                            </Grid>
                                : <Typography variant="subtitle1" style={{ color: 'grey' }}>If you want to be the first advisor, please sign in to your account.</Typography>
                            }
                        </Grid>
                    }
                    {userData.isLoggedIn &&
                        <Dialog
                            open={dialogOpen}
                            TransitionComponent={DialogTransition}
                            onClose={() => setDialogOpen(false)}


                        >
                            <DialogTitle className="dialogTitle">New opinion</DialogTitle>
                            <DialogContent>
                                <DialogContentText className="dialogContentText" style={{ textAlign: 'center' }}>
                                    We would love to know your opinion about the place you are currently browsing.
                                    If you are disappointed with services provided by this business, please try
                                    to share your mind using kind words.
                                </DialogContentText>
                                <Grid container justifyContent="center">
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
                                        maxRows={10}

                                        InputProps={{

                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setEmojiPickerOpen(current => !current)} size="large">
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
                                <LoadingButton loading={loading} disabled={!noteValue || loading} onClick={submitOpinion} variant="contained" color="primary">Submit</LoadingButton>
                            </DialogActions>
                        </Dialog>
                    }
                </Grid >

            </Grid >
        </Fade>
    );
}