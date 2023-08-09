import { Card, CardContent, CardMedia, Divider, Grid, Rating, Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdAndSelectedLocationQuery } from 'store/api';
import { PlaceTabs } from '../PlaceTabs';
import { CachedContactDetails } from './CachedContactDetails';
import { CachedImageCarousel } from './CachedImageCarousel';
import { CachedPlaceStatus } from './CachedPlaceStatus';
import { CachedSocialIcons } from './CachedSocialIcons';

export const CachedPlaceData: FC = () => {
  const { placeId, locationId } = useParams();
  const { data: place } = useGetPlaceByIdAndSelectedLocationQuery({
    placeId: placeId as string,
    locationId: locationId as string,
  });

  return (
    <>
      {place && (
        <>
          <Grid container>
            <CachedImageCarousel images={place.images} address={place.address} />
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
                    <CachedPlaceStatus />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Grid container item sx={{ mt: '20px' }}>
            <Grid item xs={3} style={{ textAlign: 'center', marginLeft: 20 }}>
              <CardMedia
                style={{
                  height: 200,
                  overflow: 'hidden',
                  marginTop: 10,
                  borderRadius: 20,
                  backgroundSize: 'contain',
                }}
                image={(place && (place.logo as string)) || `${import.meta.env.VITE_BASE_URL}/images/no-preview.jpg`}
              ></CardMedia>
              <Rating
                style={{ marginTop: 20 }}
                name="simple-controlled"
                value={place.averageNote?.average || 0}
                readOnly
              />
            </Grid>
            <Grid item container direction="column" xs={8} sx={{ ml: '30px' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                {place.name || 'This is the name of your business'}
              </Typography>
              <Typography variant="h6">{place.subtitle || 'This is a short subtitle of your business'}</Typography>
              <Typography variant="body1">{place.type || 'Business type'}</Typography>
              <CachedSocialIcons facebook={place.facebook} instagram={place.instagram} />
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
            <Grid item xs={10}>
              <Card elevation={10} style={{ flexGrow: 1 }}>
                <CardContent>
                  <div style={{ display: 'inline-block', overflowWrap: 'break-word' }}>
                    <Typography variant="body1">{place.description}</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={10} style={{ marginTop: 20 }}>
              <Divider sx={{ width: '100%' }}></Divider>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
            <CachedContactDetails phone={place.phone} email={place.email} website={place.website} />
          </Grid>
          <PlaceTabs isUserOwner={place.isUserOwner} isCacheable={true} />
        </>
      )}
    </>
  );
};
