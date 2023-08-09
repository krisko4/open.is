import { Card, CardContent, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  value: any;
  title?: string | ReactNode;
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
