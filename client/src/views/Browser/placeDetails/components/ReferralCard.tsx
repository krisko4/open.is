import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Button, Card, CardActions, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

import { Referral } from 'store/api/types';

const InvitationsCount = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgreen;
  width: 50px;
  height: 50px;
`;

type Props = {
  referral: Referral;
  onInvitationsButtonClick?: () => void;
};

const ReferralCard = ({ referral, onInvitationsButtonClick }: Props) => {
  return (
    <Card sx={{ backgroundColor: 'transparent', height: '100%' }}>
      <Grid container sx={{ p: 2 }}>
        <Grid item container xs={6} direction="column">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {format(new Date(referral.createdAt), 'yyyy-MM-dd HH:mm')}
          </Typography>
          <Typography component={'div'} variant="body2">
            {referral.description}
          </Typography>
          <div>
            <Button onClick={onInvitationsButtonClick} size="small">
              My invitations
            </Button>
          </div>
        </Grid>
        <Grid item container xs={3} direction="column" alignItems="center">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Invited users
          </Typography>
          <InvitationsCount>{referral.requiredMembersCount}</InvitationsCount>
        </Grid>
        <Grid item container xs={3} direction="column" alignItems="center">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Required invitations
          </Typography>
          <InvitationsCount>{referral.requiredMembersCount}</InvitationsCount>
        </Grid>
      </Grid>
      {/* <CardActions>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>My invitations</AccordionSummary>
        </Accordion>
      </CardActions> */}
    </Card>
  );
};

export default ReferralCard;
