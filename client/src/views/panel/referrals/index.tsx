import { CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetReferralsByLocationIdQuery } from 'store/api';
import ReferralsList from './components/List';
import NewReferral from './components/NewReferral';
import { NoReferrals } from './components/NoReferrals';
import { SelectedOption } from './enums';

const Referrals = () => {
  const { locationId } = useParams();
  const { data: referrals, isLoading } = useGetReferralsByLocationIdQuery(locationId as string);

  console.log(referrals);

  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(SelectedOption.NO_REFERRALS);

  useEffect(() => {
    if (referrals && referrals.length > 0) {
      setSelectedOption(SelectedOption.REFERRALS_LIST);
      return;
    }
    setSelectedOption(SelectedOption.NO_REFERRALS);
  }, [referrals]);

  return (
    <Grid container sx={{ height: '100%' }} direction="column">
      {isLoading ? (
        <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        referrals && (
          <>
            {selectedOption === SelectedOption.NO_REFERRALS && <NoReferrals setSelectedOption={setSelectedOption} />}
            {selectedOption === SelectedOption.REFERRALS_LIST && (
              <ReferralsList setSelectedOption={setSelectedOption} referrals={referrals} />
            )}
            {selectedOption === SelectedOption.NEW_REFERRAL && <NewReferral />}
          </>
        )
      )}
    </Grid>
  );
};

export default Referrals;
