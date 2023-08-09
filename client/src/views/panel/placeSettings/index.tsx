import { CircularProgress, Grid } from '@mui/material';
import { StepContextProvider } from 'contexts';
import _ from 'lodash';
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdAndSelectedLocationQuery } from 'store/api';
import { useAppDispatch } from 'store/hooks';
import { setSelectedAddress } from 'store/slices/selectedAddressSlice';
import { NewPlace } from 'views/panel/newPlace';
import newPlaceSteps from 'views/panel/newPlace/utils/steps';

export const PlaceSettings: FC = () => {
  const { placeId, locationId } = useParams();
  const { data: place, isFetching } = useGetPlaceByIdAndSelectedLocationQuery({
    placeId: placeId as string,
    locationId: locationId as string,
  });
  const dispatch = useAppDispatch();

  const initialPlaceData = useMemo(() => {
    if (place) {
      const initialPlace = _.cloneDeep(place);
      while (initialPlace.images.length < 4) {
        initialPlace.images.push({
          file: null,
          img: '',
        });
      }
      console.log(place);
      dispatch(
        setSelectedAddress({
          label: place.address,
          language: navigator.language,
          lat: place.lat,
          lng: place.lng,
          addressId: place.addressId,
        })
      );
      return {
        ...place,
        facebook: place.facebook.substring(21),
        instagram: place.instagram.substring(22),
      };
    }
  }, [place]);

  return (
    <>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <StepContextProvider steps={newPlaceSteps}>
          <NewPlace isEditionMode={true} initialPlaceData={initialPlaceData} />
        </StepContextProvider>
      )}
    </>
  );
};
