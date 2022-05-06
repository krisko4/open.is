import { SlideProps, Slide } from '@mui/material';
import React, { forwardRef } from 'react';

export const DialogTransition = forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
DialogTransition.displayName = 'DialogTransition';
