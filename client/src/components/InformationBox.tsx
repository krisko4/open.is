import { Card, Typography, CardContent } from '@mui/material';
import { FC } from 'react';

interface Props {
  value: string | number;
  title?: string;
  elevation?: number;
  width?: number;
}

const InformationBox: FC<Props> = ({ width, elevation, title, value }) => {
  return (
    <Card sx={{ width }} elevation={elevation}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InformationBox;
