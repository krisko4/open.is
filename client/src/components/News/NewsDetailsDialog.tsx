import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { DialogTransition } from 'components/Transitions';
import { FC } from 'react';
import { NewsProps } from 'store/slices/PlaceProps';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  news: NewsProps;
}

export const NewsDetailsDialog: FC<Props> = ({ dialogOpen, setDialogOpen, news }) => {
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} TransitionComponent={DialogTransition}>
      <DialogTitle>
        <Grid container direction="column">
          <Typography variant="h6">{news.title}</Typography>
          <Typography variant="caption">{news.date}</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography gutterBottom variant="body2" style={{ marginTop: 10 }}>
            {news.content}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
