import styled from '@emotion/styled';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, Button, Card, CardContent, Grid, Rating, Tooltip, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { removeLocation, SelectedLocationProps } from 'store/slices/selectedLocationsSlice';

// const useStyles = makeStyles({
//     card: {
//         backgroundColor: '#2C2C2C',
//         // borderRadius: 20,
//         width: '100%',
//         height: '100%'
//     },
//     image: {
//         height: 80,
//         width: 80
//     }
// }
// )

interface PlaceProps {
  cardData: SelectedLocationProps;
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
  '& .MuiRating-iconEmpty': {
    color: '#ff6d75',
  },
});

export const PlaceCard: FC<PlaceProps> = ({ cardData }) => {
  // const classes = useStyles()
  const [value, setValue] = useState<number | null>(0);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [elevation, setElevation] = useState(3);

  useEffect(() => {
    const isFavorite = Cookies.get('favIds')
      ?.split(',')
      .some((el) => el === cardData.locationId);
    if (isFavorite) {
      setValue(1);
      return;
    }
    setValue(null);
  }, []);

  const setFavoritePlace = (newValue: number | null) => {
    let favIds = Cookies.get('favIds');
    const { locationId } = cardData;
    if (locationId) {
      setValue(newValue);
      if (!favIds && newValue === 1) {
        Cookies.set('favIds', `${locationId}`);
        return;
      }
      if (favIds) {
        const favIdsArray = favIds.split(',');
        const index = favIdsArray.findIndex((id) => id === locationId);
        // index not found && no value || index found && value
        if ((index === -1 && !newValue) || (index !== -1 && newValue === 1)) return;
        if (index !== -1) {
          favIdsArray.splice(index, 1);
          if (location.pathname === '/search/favorite') {
            dispatch(removeLocation(locationId as string));
          }
          if (favIdsArray.length === 0) {
            Cookies.remove('favIds');
            return;
          }
        } else {
          favIdsArray.push(locationId);
        }
        favIds = favIdsArray.join(',');
        Cookies.set('favIds', favIds);
      }
    }
  };

  return (
    <Card
      // className={classes.card}
      sx={{ flexGrow: 1 }}
      elevation={elevation}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(3)}
    >
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item container alignItems="center">
            <Grid item>
              <Avatar
                imgProps={{
                  style: {
                    objectFit: 'contain',
                  },
                }}
                style={{ width: 80, height: 80 }}
                src={cardData.logo as string}
                alt={cardData.name}
              />
            </Grid>
            <Grid item xs={9} style={{ marginLeft: 10 }}>
              <Typography variant="h6">{cardData.name}</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {cardData.subtitle}
              </Typography>
              <Grid container alignItems="center">
                <Typography variant="overline">{cardData.type}</Typography>
                <Tooltip title="Add to favorites">
                  <StyledRating
                    name={`${cardData._id}`}
                    onClick={(event) => event.stopPropagation()}
                    value={value}
                    onChange={(event, newValue) => {
                      setFavoritePlace(newValue);
                    }}
                    style={{ marginLeft: 5 }}
                    icon={<Favorite fontSize="inherit" />}
                    emptyIcon={<FavoriteBorder fontSize="inherit" />}
                    max={1}
                  />
                </Tooltip>
              </Grid>
              <Typography variant="body2" color="primary">
                Address: {cardData.address}
              </Typography>
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <Grid container justifyContent="flex-end" style={{ height: '100%' }} alignItems="center">
                {cardData.status === 'open' ? (
                  <Tooltip title="This place is now open">
                    <Button variant="contained" color="success" size="small">
                      Open
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="This place is now closed">
                    <Button variant="contained" color="error" size="small">
                      Closed
                    </Button>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
