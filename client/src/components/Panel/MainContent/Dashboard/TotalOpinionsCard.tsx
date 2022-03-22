import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Slide, CircularProgress, Card, CardContent, Typography, Grid } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { useGetAllOpinionsByUserIdQuery } from 'redux-toolkit/api/placesApi';
export const TotalOpinionsCard: FC = () => {
  const [totalOpinionsDiff, setTotalOpinionsDiff] = useState(0);
  const { data: totalOpinionsData, isFetching } = useGetAllOpinionsByUserIdQuery();

  useEffect(() => {
    if (totalOpinionsData) {
      const { total, today } = totalOpinionsData;
      setTotalOpinionsDiff(
        total === today ? today * 100 : Math.round(((total / (total - today)) * 100 - 100) * 10) / 10
      );
      // total === today ? setTotalOpinionsDiff(today * 100) : setTotalOpinionsDiff(Math.round(((total / (total - today)) * 100 - 100) * 10) / 10)
    }
  }, [totalOpinionsData]);

  return (
    <Slide in={true} direction="left" timeout={500}>
      <Card elevation={3} sx={{ height: '170px' }}>
        <CardContent>
          <Typography style={{ fontWeight: 'bold' }} variant="overline">
            Total opinions
          </Typography>
          <Grid container style={{ marginTop: 5 }}>
            <Grid container item lg={10} alignItems="center">
              {totalOpinionsDiff > 0 ? (
                <>
                  <TrendingUpIcon style={{ color: '#03C03C' }} />
                  <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {totalOpinionsDiff}%</span>
                </>
              ) : (
                <>
                  <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                  <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                </>
              )}
            </Grid>
          </Grid>
          <Typography variant="h3">
            {isFetching ? <CircularProgress /> : totalOpinionsData && totalOpinionsData.total}
          </Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};
