import { Card, CardContent, Grid, Avatar, Typography } from '@mui/material';
import { Rating } from '@mui/material';
import { FC, useState } from 'react';

export const OpinionCard: FC<any> = ({ opinion }) => {
  const [elevation, setElevation] = useState(3);
  return (
        <Card onMouseEnter={() => setElevation(10)} onMouseLeave={() => setElevation(3)} elevation={elevation} style={{ borderRadius: 10 }}  >
            <CardContent>
                <Grid container justifyContent="space-around">
                    <Avatar style={{ width: 80, height: 80 }} src={`${opinion.authorImg}`} alt={opinion.author} />
                    <Grid item xs={8}>
                        <Typography variant="h6" >{opinion.author}</Typography>
                        <Typography variant="caption" >{opinion.date}</Typography>
                        <Typography variant="subtitle1" >{opinion.content}</Typography>
                    </Grid>
                    <Rating
                        readOnly={true}
                        value={opinion.note}
                    />
                </Grid>
            </CardContent>
        </Card>
  );
};