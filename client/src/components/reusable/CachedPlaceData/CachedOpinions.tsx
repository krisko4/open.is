import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Picker, { IEmojiData } from 'emoji-picker-react';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddOpinionMutation, useGetOpinionsForSelectedLocationQuery } from 'redux-toolkit/api/placesApi';
import { useLoginContext } from '../../../contexts/LoginContext';
import { useCustomSnackbar } from '../../../utils/snackbars';
import DialogTransition from '../DialogTransition';
import { LoadingButton } from '../LoadingButton';
import { OpinionCard } from '../Opinions/OpinionCard';
import { CircularProgress } from '@mui/material';

interface Props {
  isUserOwner?: boolean;
}

export const CachedOpinions: FC<Props> = ({ isUserOwner }) => {
  console.log(isUserOwner);
  const { userData } = useLoginContext();
  const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noteValue, setNoteValue] = useState<number | null>(null);
  const [opinionText, setOpinionText] = useState('');
  const { locationId } = useParams();
  const { data: opinionData, isFetching } = useGetOpinionsForSelectedLocationQuery(locationId as string);
  const [addOpinion, { isLoading }] = useAddOpinionMutation();
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleEmoji = (emoji: IEmojiData) => {
    setOpinionText((text) => text + emoji.emoji);
    setEmojiPickerOpen(false);
  };

  const submitOpinion = async () => {
    if (noteValue) {
      const opinion = {
        authorId: localStorage.getItem('uid') as string,
        locationId: locationId as string,
        content: opinionText,
        note: noteValue,
      };
      try {
        await addOpinion(opinion).unwrap();
        setDialogOpen(false);
        enqueueSuccessSnackbar('Your opinion has been added successfully');
      } catch (err) {
        console.log(err);
        enqueueErrorSnackbar();
      }
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Grid container style={{ height: '100%' }} justifyContent="center">
        {isFetching ? (
          <Grid container style={{ height: '100%' }} alignItems="center" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container item xs={11} direction="column" style={{ marginTop: 20, marginBottom: 20 }}>
            {opinionData && opinionData.opinions.length > 0 ? (
              <div>
                <Grid container justifyContent="space-between">
                  <Alert severity="info" variant="filled">
                    {opinionData.opinions?.length}{' '}
                    {opinionData.opinions.length > 1 ? <span>users have</span> : <span>user has</span>} commented on
                    this place.
                  </Alert>
                  {userData.isLoggedIn && !isUserOwner && (
                    <Button
                      startIcon={<AddIcon />}
                      style={{ marginTop: 5, marginBottom: 5 }}
                      onClick={() => setDialogOpen(true)}
                      color="primary"
                      variant="contained"
                    >
                      New opinion
                    </Button>
                  )}
                </Grid>
                {opinionData.opinions.map((opinion, index) => (
                  <Grid item key={index} style={{ marginTop: 20, marginBottom: 20 }}>
                    <OpinionCard opinion={opinion} />
                  </Grid>
                ))}
              </div>
            ) : (
              <Grid container direction="column" justifyContent="center" style={{ height: '100%' }} alignItems="center">
                <Typography variant="h6">This place does not have any opinions yet.</Typography>
                {userData.isLoggedIn ? (
                  <Grid item style={{ textAlign: 'center' }}>
                    <Typography style={{ color: 'grey' }} variant="subtitle1">
                      Press the button below to be the first advisor.
                    </Typography>
                    {isUserOwner ? (
                      <Button
                        style={{ marginTop: 10 }}
                        disabled={true}
                        startIcon={<AddIcon />}
                        color="primary"
                        variant="contained"
                      >
                        New opinion
                      </Button>
                    ) : (
                      <Button
                        style={{ marginTop: 10 }}
                        onClick={() => setDialogOpen(true)}
                        startIcon={<AddIcon />}
                        color="primary"
                        variant="contained"
                      >
                        New opinion
                      </Button>
                    )}
                  </Grid>
                ) : (
                  <Typography variant="subtitle1" style={{ color: 'grey' }}>
                    If you want to be the first advisor, please sign in to your account.
                  </Typography>
                )}
              </Grid>
            )}
            {userData.isLoggedIn && (
              <Dialog open={dialogOpen} TransitionComponent={DialogTransition} onClose={() => setDialogOpen(false)}>
                <DialogTitle className="dialogTitle">New opinion</DialogTitle>
                <DialogContent>
                  <DialogContentText className="dialogContentText" style={{ textAlign: 'center' }}>
                    We would love to know your opinion about the place you are currently browsing. If you are
                    disappointed with services provided by this business, please try to share your mind using kind
                    words.
                  </DialogContentText>
                  <Grid container justifyContent="center">
                    <Rating value={noteValue} name="rating" onChange={(event, newValue) => setNoteValue(newValue)} />
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setEmojiPickerOpen((current) => !current)} size="large">
                              <EmojiEmotionsIcon style={{ color: '#ffb400' }}></EmojiEmotionsIcon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </Grid>
                  <Dialog open={isEmojiPickerOpen} onClose={() => setEmojiPickerOpen(false)}>
                    <Picker onEmojiClick={(event, emoji) => handleEmoji(emoji)} />
                  </Dialog>
                </DialogContent>
                <DialogActions>
                  <LoadingButton
                    loading={isLoading}
                    disabled={!noteValue || isLoading}
                    onClick={submitOpinion}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </LoadingButton>
                </DialogActions>
              </Dialog>
            )}
          </Grid>
        )}
      </Grid>
    </Fade>
  );
};
