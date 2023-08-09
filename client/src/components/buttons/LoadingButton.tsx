import React, { FC } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  loading: boolean;
}

export const LoadingButton: FC<Props & any> = (props) => {
  const { children, loading, ...rest } = props;
  return (
    <Button {...rest}>
      {!loading && children}
      {loading && <CircularProgress style={{ color: 'inherit' }} size={20} />}
    </Button>
  );
};
