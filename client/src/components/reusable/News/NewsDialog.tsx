import { Dialog, DialogTitle, DialogContent, DialogContentText, Grid, TextField, InputAdornment, IconButton, DialogActions } from '@mui/material';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { FC, useRef, useState } from 'react';
import { useIdSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { useCustomSnackbar } from 'utils/snackbars';
import DialogTransition from '../DialogTransition';
import { LoadingButton } from '../LoadingButton';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useAddNewsMutation } from 'redux-toolkit/api/placesApi';

interface Props {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const NewsDialog: FC<Props> = ({ dialogOpen, setDialogOpen }) => {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiSource = useRef<'title' | 'content'>('title');
  const placeId = useIdSelector();
  const [addNews, { isLoading }] = useAddNewsMutation();


  const handleEmoji = (emoji: IEmojiData) => {
    setEmojiPickerOpen(false);
    if (emojiSource.current === 'title'){
      setNewsTitle(title => title + emoji.emoji); 
      return;
    }
    setNewsContent(content => content + emoji.emoji);
  };
  const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();

  const submitNews = async () => {
    try {
      await addNews({
        title : newsTitle, 
        content :newsContent,
        locationId: placeId as string,
      }).unwrap();
      // dispatch(setNews(res.data as NewsProps))
      enqueueSuccessSnackbar('News added successfully');
      setDialogOpen(false);
    } catch (err) {
      enqueueErrorSnackbar();
    } 
  };
  return (

        <Dialog
            open={dialogOpen}
            TransitionComponent={DialogTransition}
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
                                        onClick={() => { setEmojiPickerOpen(current => !current); emojiSource.current = 'title'; }}
                                        size="large">
                                        <EmojiEmotionsIcon style={{ color: '#ffb400' }}></EmojiEmotionsIcon>
                                    </IconButton>
                                </InputAdornment>,
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
                        className="opinionArea"
                        InputProps={{
                          endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => { setEmojiPickerOpen(current => !current); emojiSource.current = 'content'; }}
                                        size="large">
                                        <EmojiEmotionsIcon style={{ color: '#ffb400' }}></EmojiEmotionsIcon>
                                    </IconButton>
                                </InputAdornment>,
                        }}
                    >
                    </TextField>
                </Grid>
                <Dialog open={isEmojiPickerOpen} onClose={() => setEmojiPickerOpen(false)}>
                    <Picker onEmojiClick={(event, emoji) => handleEmoji(emoji)} />
                </Dialog>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={isLoading} onClick={submitNews} disabled={isLoading} variant="contained" color="primary">Submit</LoadingButton>
            </DialogActions>
        </Dialog>
  );
};