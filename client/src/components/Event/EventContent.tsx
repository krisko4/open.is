import { Typography } from '@mui/material';
import { FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useContentSelector } from 'store/slices/eventSlice';

export const EventContent: FC = () => {
  const content = useContentSelector();
  return (
    <>
      {!content && (
        <Typography variant="body2" color="text.secondary">
          This is a content of your event! Make sure to provide all the essential details regarding your event in this
          section.
        </Typography>
      )}
      {content.length < 900 ? (
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      ) : (
        <div style={{ height: 200 }}>
          <Scrollbars autoHide>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </Scrollbars>
        </div>
      )}
    </>
  );
};
