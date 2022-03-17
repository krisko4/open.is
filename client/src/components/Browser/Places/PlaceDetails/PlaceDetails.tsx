import { CircularProgress, Slide } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { CachedPlaceData } from 'components/reusable/CachedPlaceData/CachedPlaceData';
import React, { FC, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdAndSelectedLocationQuery } from 'redux-toolkit/api/placesApi';
import { addNewVisit } from 'requests/VisitRequests';
import { PlaceToolbar } from './PlaceToolbar';






export const PlaceDetails: FC = () => {

  // const { setPopupOpen, setPlaceCoords, setPopupIndex } = useMapContext()
  // const dispatch = useAppDispatch()

  const { placeId, locationId } = useParams();
  const { data: place, isFetching } = useGetPlaceByIdAndSelectedLocationQuery({
    placeId: placeId as string,
    locationId: locationId as string,
  });

  useEffect(() => {
    (async () => {
      if (place){
        try {
          const response = await addNewVisit(place._id as string);
          return response.data;
        } catch (err) {
          console.log(err);
        }

      }

    })();
  }, [place]);




  return (
    <Scrollbars>
        {isFetching ?
            <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center" >
                <CircularProgress />
            </Grid> : place &&
            <Grid container>
                <Slide in={true} direction="right">
                    <Paper sx={{ flexGrow: 1 }}>
                        <PlaceToolbar place={place} />
                        <CachedPlaceData />
                    </Paper >

                </Slide>
            </Grid >
        }
    </Scrollbars>
  );
};
