import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {  Slide, CircularProgress, Card, CardContent, Typography, Grid } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { useGetAllVisitsByUserIdQuery } from 'redux-toolkit/api/placesApi';
export const TotalVisitsCard: FC = () => {
  const [totalVisitsDiff, setTotalVisitsDiff] = useState(0);
  const { data: totalVisitsData, isFetching } = useGetAllVisitsByUserIdQuery();

  useEffect(() => {
    if (totalVisitsData) {
      const { total, today } = totalVisitsData;
      setTotalVisitsDiff(
        today === total ? total * 100 : Math.round(((total / (total - today)) * 100 - 100) * 10) / 10,
      );
    }
  }, [totalVisitsData]);
  return (
        <Slide in={true} direction="right" timeout={500}>
            <Card elevation={3} sx={{ height: '170px' }} >
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid container item lg={10} alignItems="center">
                            {totalVisitsDiff > 0 ? <>
                                <TrendingUpIcon style={{ color: '#03C03C' }} />
                                <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {totalVisitsDiff}%</span>
                            </> :
                                <>
                                    <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                    <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                </>}
                        </Grid>
                    </Grid>
                    <Typography variant="h3">
                        {isFetching ? <CircularProgress /> : totalVisitsData && totalVisitsData.total}
                    </Typography>
                </CardContent>
            </Card>

        </Slide>
  );
};