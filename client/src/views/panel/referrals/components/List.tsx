import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import ReferralCard from 'components/ReferralCard';
import { format } from 'date-fns';
import { FC } from 'react';
import { Referral } from 'store/api/types';
import { SelectedOption } from '../enums';

interface Props {
  referrals: Referral[];
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption | null>>;
}

const List: FC<Props> = ({ referrals, setSelectedOption }) => {
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid container sx={{ p: 1 }} justifyContent="flex-end">
        <Button startIcon={<Add />} variant="contained" onClick={() => setSelectedOption(SelectedOption.NEW_REFERRAL)}>
          New referral
        </Button>
      </Grid>
      {referrals.map((ref) => (
        <Grid sx={{ p: 1 }} key={ref._id} item xs={4}>
          <ReferralCard referral={ref} />
        </Grid>
      ))}
    </Grid>
  );
};

export default List;
