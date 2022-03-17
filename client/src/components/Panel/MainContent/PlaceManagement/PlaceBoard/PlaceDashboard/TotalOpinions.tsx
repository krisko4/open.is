import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Card, CardContent, CircularProgress, Fade, Grid, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOpinionsForSelectedLocationQuery } from 'redux-toolkit/api/placesApi';

export const TotalOpinions: FC<any> = () => {

  const { locationId } = useParams();
  const { data: opinionData, isFetching } = useGetOpinionsForSelectedLocationQuery(locationId as string);

  const opinionsDiff = useMemo(() => {
    if (opinionData) {
      if (opinionData.today === opinionData.opinions.length) {
        return opinionData.opinions.length * 100;
      }
      return opinionData.opinions.length > 0 && Math.round(((opinionData.opinions.length / (opinionData.opinions.length - opinionData.today)) * 100 - 100) * 10) / 10;
    }
    return 0;
  }, [opinionData]);

  return (
        <Fade in={true} timeout={2500}>
            <Card sx={{ height: '170px' }}>
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid container item alignItems="center" justifyContent="space-between">
                            <Grid item style={{ flexGrow: 1 }}>
                                <Fade in={true} timeout={500}>
                                    <div>
                                        {isFetching ? <CircularProgress /> : <>
                                            <Grid container item alignItems="center">
                                                {opinionsDiff === 0 || (opinionData && opinionData.opinions.length === 0) ? <>
                                                    <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                                    <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                                </> : <>
                                                    <TrendingUpIcon style={{ color: '#03C03C' }} />
                                                    <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {opinionsDiff}%</span>
                                                </>
                                                }
                                            </Grid>
                                            <Typography variant="h3">{(opinionData  && opinionData.opinions.length) || 0}</Typography>
                                        </>}
                                    </div>
                                </Fade>
                            </Grid>
                            {/* <TotalOpinionsChart /> */}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
  );
};