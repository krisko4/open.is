import { LoadingButton } from '@mui/lab';
import { Card, Toolbar, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CachedPlaceData } from 'components/PlaceData/CachedPlaceData/CachedPlaceData';
import { PlaceData } from 'components/PlaceData';
import React, { FC } from 'react';

interface Props {
  isEditable?: boolean;
  logoFile?: File | null;
  setLogoFile?: React.Dispatch<React.SetStateAction<File | null>>;
  isCacheable?: boolean;
}

export const PlaceDetailsCard: FC<Props> = ({ isCacheable, isEditable, setLogoFile }) => {
  return (
    <Card sx={!isCacheable ? { width: '800px' } : {}}>
      <Grid container item>
        <Toolbar style={{ flexGrow: 1 }} disableGutters>
          <Grid container justifyContent="flex-end" style={{ paddingRight: 20 }} item>
            <Tooltip title={'Your users will be able to subscribe to your business'} arrow>
              <span>
                <LoadingButton color="primary">Subscribed</LoadingButton>
              </span>
            </Tooltip>
          </Grid>
        </Toolbar>
      </Grid>
      {isCacheable ? <CachedPlaceData /> : <PlaceData isEditable={isEditable} setLogoFile={setLogoFile} />}
    </Card>
  );
};
