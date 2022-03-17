import { ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { RawPlaceDataProps } from 'redux-toolkit/slices/PlaceProps';
import React, { FC, useMemo } from 'react';
import { LinkProps, Link as RouterLink } from 'react-router-dom';

interface ListItemLinkProps {
  to: string,
  place: RawPlaceDataProps
}

export const ListItemLink: FC<ListItemLinkProps> = ({ place, to }) => {

  const renderLink = useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(
        itemProps,
        ref,
      ) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
        <ListItemButton
            key={place._id}
            component={renderLink}
        >
            <ListItemAvatar>
                <Avatar
                    imgProps={{
                      style: { objectFit: 'contain' },
                    }}
                    alt={place.name}
                    src={place.logo as string} />
            </ListItemAvatar>
            <ListItemText
                primary={place.name}
                secondary={place.subtitle}
            />
        </ListItemButton>
  );
};