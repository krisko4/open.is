import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import { SocialIcon } from 'react-social-icons';

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
interface Props {
  facebook: string;
  instagram: string;
}

export const CachedSocialIcons: FC<Props> = ({ facebook, instagram }) => {
  const fb = facebook.startsWith('https://facebook.com') ? facebook : `https://facebook.com/${facebook}`;
  const ig = instagram.startsWith('https://instagram.com') ? instagram : `https://instagram.com/${instagram}`;

  return (
    <div>
      <SocialIconButton url={fb as string} />
      <SocialIconButton url={ig as string} />
    </div>
  );
};
