import { CircularProgress, Fade, Grid, ListItem, Typography } from '@mui/material';
import { getPaginatedPlaces } from 'api/places';
import { FC, useEffect, useRef, useState } from 'react';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { setPopup } from 'store/slices/mapSlice';
import { useSearcherOptionsSelector } from 'store/slices/searcherOptionsSlice';
import {
  addLocations,
  SelectedLocationProps,
  setSelectedLocations,
  useSelectedLocationsSelector,
} from 'store/slices/selectedLocationsSlice';
import { useCustomSnackbar } from 'utils/snackbars';
import { PlaceCard } from './PlaceCard';

interface Props {
  fetchUrl: string;
}

export const FilteredPlaces: FC<Props> = ({ fetchUrl }) => {
  const places = useSelectedLocationsSelector();
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const start = useRef(0);
  const limit = useRef(50);
  const total = useRef(1);
  const isFirstFetch = useRef(true);
  const navigate = useNavigate();
  const { enqueueErrorSnackbar } = useCustomSnackbar();
  const searcherOptions = useSearcherOptionsSelector();

  const fetchPlaces = async () => {
    setLoading(true);
    if (start.current < total.current) {
      try {
        const res = await getPaginatedPlaces(fetchUrl, start.current, limit.current, searcherOptions);
        const newPlaces = res.data.data;
        if (start.current === 0) {
          dispatch(setSelectedLocations(newPlaces));
        } else {
          dispatch(addLocations(newPlaces));
        }
        start.current += limit.current;
        if (isFirstFetch.current) {
          isFirstFetch.current = false;
          const meta = res.data.metadata;
          if (meta.length > 0) {
            total.current = res.data.metadata[0].total;
          }
        }
      } catch (err) {
        console.log(err);
        enqueueErrorSnackbar();
      }
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  const handleScroll = (values: positionValues) => {
    if (values.top === 1 && hasMore) {
      fetchPlaces();
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPlaces();
      setFirstLoading(false);
    })();
  }, [total]);

  const openPlaceDetails = (place: SelectedLocationProps, index: number) => {
    dispatch(
      setPopup({
        isOpen: true,
        index: index,
      })
    );
    navigate(`/search/${place._id}/${place.locationId}`);
  };

  return (
    <>
      {firstLoading ? (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <Scrollbars onScrollFrame={handleScroll} autoHide>
          {places.length === 0 && (
            <Grid container alignItems="center" direction="column" sx={{ height: '100%' }} justifyContent="center">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Unfortunately, we could not find any locations matching your requirements.
                  </Typography>
                  <img src="https://forum.e-liquid-recipes.com/uploads/default/original/3X/7/e/7e2e2ea07c17c2607dc4ba412ba22fcdd7b50f20.gif" />
                </Grid>
              </Grid>
            </Grid>
          )}
          {places.map((place, index) => (
            <div key={place.locationId}>
              <Fade in={true} timeout={1000}>
                <ListItem
                  disableGutters
                  disablePadding
                  sx={{ mt: 1, mb: 1, ml: 1, mr: 1, width: 'inherit' }}
                  onClick={() => openPlaceDetails(place, index)}
                  key={place._id}
                  button
                >
                  <PlaceCard cardData={place} />
                </ListItem>
              </Fade>
            </div>
          ))}
          {loading && (
            <Grid container justifyContent="center">
              <CircularProgress disableShrink color="secondary" />
            </Grid>
          )}
        </Scrollbars>
      )}
    </>
  );
};