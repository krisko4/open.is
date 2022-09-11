import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { RawPlaceDataProps } from 'store/slices/PlaceProps';

interface ListItemLinkProps {
  to: string;
  place: RawPlaceDataProps;
}

export const ListItemLink: FC<ListItemLinkProps> = ({ place, to }) => {
  const renderLink = useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <ListItemButton key={place._id} component={renderLink}>
      <ListItemAvatar>
        <Avatar
          imgProps={{
            style: { objectFit: 'contain' },
          }}
          alt={place.name}
          src={place.logo as string}
        />
      </ListItemAvatar>
      <ListItemText primary={place.name} secondary={place.subtitle} />
    </ListItemButton>
  );
};
