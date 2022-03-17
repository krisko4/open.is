import React, { FC } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


export const LoadingButton : FC<any> = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props;
  return (
        <Button {...rest}>
          
            {!loading && children}
            {loading && <CircularProgress style={{ color: 'inherit' }} size={20}/>}
        </Button>
  );
};