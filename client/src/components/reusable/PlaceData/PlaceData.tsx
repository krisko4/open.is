import { Grid, Card, Divider } from '@mui/material';
import { ImageCarousel } from 'components/reusable/PlaceData/ImageCarousel/ImageCarousel';
import { FC } from 'react';
import { ContactDetails } from './ContactDetails';
import { PlaceDescription } from './PlaceDescription';
import { PlaceLogo } from './PlaceLogo';
import { PlaceName } from './PlaceName';
import { PlaceRating } from './PlaceRating';
import { PlaceStatus } from './PlaceStatus';
import { PlaceSubtitle } from './PlaceSubtitle';
import { PlaceTabs } from './PlaceTabs';
import { PlaceType } from './PlaceType';
import { SocialIcons } from './SocialIcons';

interface Props {
  isEditable?: boolean;
  setLogoFile?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const PlaceData: FC<Props> = ({ isEditable, setLogoFile }) => {
  return (
    <>
      <Grid container>
        <ImageCarousel isEditable={isEditable} />
      </Grid>
      <Grid container>
        <Grid container item>
          <Card
            elevation={10}
            sx={{
              flexGrow: 1,
              paddingBottom: '12px',
              paddingTop: '12px',
              paddingRight: '20px',
              backgroundColor: 'panelCard.main',
            }}
          >
            <Grid container justifyContent="flex-end">
              <Grid item>
                <PlaceStatus />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container item sx={{ mt: '20px' }}>
        <Grid item xs={3} style={{ textAlign: 'center', marginLeft: 20 }}>
          <PlaceLogo isEditable={isEditable} setLogoFile={setLogoFile} />
          <PlaceRating />
        </Grid>
        <Grid item container direction="column" xs={8} sx={{ ml: '30px' }}>
          <PlaceName />
          <PlaceSubtitle />
          <PlaceType />
          <SocialIcons />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
        <Grid item lg={10}>
          <PlaceDescription />
        </Grid>
        <Grid item lg={10} style={{ marginTop: 20 }}>
          <Divider sx={{ width: '100%' }}></Divider>
        </Grid>
      </Grid>
      <Grid item container lg={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
        <ContactDetails />
      </Grid>
      <PlaceTabs />
    </>
  );
};
