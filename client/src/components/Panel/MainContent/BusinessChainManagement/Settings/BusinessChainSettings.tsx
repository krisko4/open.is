import { Grid, Paper } from '@mui/material';
import { FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';

export const BusinessChainSettings: FC = () => {
  // const { imageFile, setImageFile, currentPlace, setCurrentPlace } = useCurrentPlaceContext()




  return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item lg={6}>
            </Grid>
            <Grid item sx={{ height: '100%' }} lg={6}>
                <Scrollbars>
                    <Paper sx={{ height: '100%' }}>
                        {/* <ImagesCarousel
                            isEditable={true}
                            images={businessChain.images as Image[]}
                            setCurrentPlace={setCurrentPlace}
                            address={currentPlace.address}
                        />
                        <Grid container item sx={{ mt: '20px' }}>
                            <Grid item lg={3} style={{ textAlign: 'center', marginLeft: 20 }}>
                                <PlaceLogo
                                    isEditable={true}
                                    setImageFile={setImageFile}
                                />
                                <Rating
                                    style={{ marginTop: 20 }}
                                    name="simple-controlled"
                                    value={currentPlace.averageNote?.average || 0}
                                    readOnly
                                />
                            </Grid>
                            <Grid item container direction="column" lg={8} sx={{ ml: '30px' }}>
                                <PlaceName />
                                <PlaceSubtitle />
                                <PlaceType />
                                <SocialIcons />
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
                            <Grid item lg={10}>
                                <PlaceDescription  />
                            </Grid>
                            <Grid item lg={10} style={{ marginTop: 20 }}>
                                <Divider sx={{ width: '100%' }}></Divider>
                            </Grid>
                        </Grid>
                        <Grid item container lg={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
                            <ContactDetails />
                        </Grid> */}
                    </Paper>
                </Scrollbars>
            </Grid>

        </Grid >
  );
};