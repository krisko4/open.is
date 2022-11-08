import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import { User } from 'api';

type Props = {
  user: User;
};
const InvitedUserCard = ({ user }: Props) => {
  return (
    <ListItem
      secondaryAction={
        <Tooltip title={`Is ${user.isSubscriber ? '' : 'not'} a subscriber`}>
          <IconButton edge="end">
            {user.isSubscriber ? <CheckCircleIcon sx={{ color: 'green' }} /> : <CancelIcon sx={{ color: 'red' }} />}
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemAvatar>
        <Avatar src={user.img} />
      </ListItemAvatar>
      <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
    </ListItem>
  );
};

export default InvitedUserCard;
