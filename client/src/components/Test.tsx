import { ListItemText, List, ListItem, Grid } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { getPaginatedPlaces } from 'requests/PlaceRequests';
import Scrollbars, { positionValues } from 'react-custom-scrollbars';

export const Test: FC = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const start = useRef(0);
  const limit = useRef(10);
  const total = useRef(1);
  const isFirstFetch = useRef(true);

  const fetchPlaces = async () => {
    console.log(total.current);
    console.log(places.length);
    console.log(start.current);
    setLoading(true);
    if (start.current <= total.current) {
      const res = await getPaginatedPlaces('/places/active/popular', start.current, limit.current, []);
      console.log(res.data);
      const updatedPlaces = places.concat(res.data.data);
      start.current = updatedPlaces.length - 1;
      setPlaces(updatedPlaces);
      if (isFirstFetch.current) {
        isFirstFetch.current = false;
        total.current = res.data.metadata[0].total - 1;
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
    fetchPlaces();
  }, [total]);

  return (
    <Grid container direction="column" sx={{ height: '100vh' }} alignItems="center" justifyContent="center">
      <List sx={{ height: '200px', width: '400px' }}>
        <Scrollbars onScrollFrame={handleScroll}>
          {/* <InfiniteScroll
                        dataLength={places.length}
                        next={fetchPlaces}
                        hasMore={hasMore}
                        scrollableTarget="scroll"
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                                <b>You read all new posts.</b>
                            </p>
                        }
                    > */}
          {places.map((place, index) => (
            <ListItem key={index}>
              <ListItemText primary={place.name} />
            </ListItem>
          ))}
          {loading && <p>Loading..</p>}
          {/* </InfiniteScroll> */}
        </Scrollbars>
      </List>
    </Grid>
  );
};
