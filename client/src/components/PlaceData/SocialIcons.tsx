import { IconButton } from '@mui/material';
import React from 'react';
import { FC } from 'react';
import { SocialIcon } from 'react-social-icons';
import { useFacebookSelector, useInstagramSelector } from 'redux-toolkit/slices/currentPlaceSlice';

interface SocialProps {
  url: string;
}

const SocialIconButton: FC<SocialProps> = ({ url }) => {
  return (
    <IconButton size="large">
      <SocialIcon
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: 35, height: 35, display: 'table-cell' }}
        url={url}
      />
    </IconButton>
  );
};

export const SocialIcons: FC = () => {
  const facebook = useFacebookSelector();
  const instagram = useInstagramSelector();
  const fb = facebook.startsWith('https://facebook.com') ? facebook : `https://facebook.com/${facebook}`;
  const ig = instagram.startsWith('https://instagram.com') ? instagram : `https://instagram.com/${instagram}`;
  return (
    <div>
      <SocialIconButton url={fb} />
      <SocialIconButton url={ig} />
    </div>
  );
};

export const MemoizedSocialIcons = React.memo(SocialIcons);
