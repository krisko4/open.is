import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card, CardContent, Grid } from '@mui/material';
import React, { FC } from 'react';

interface SocialBoxProps {
  value: string;
  icon: any;
  [key: string]: any;
}

const SocialBox: FC<SocialBoxProps> = ({ value, icon, ...rest }) => {
  return (
    <Grid item lg={4} {...rest}>
      <Card elevation={10}>
        <CardContent>
          <Grid container justifyContent="center">
            <Grid item lg={12} style={{ textAlign: 'center' }}>
              {icon}
            </Grid>
            <Grid item>{value}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

interface Props {
  phone: string;
  email: string;
  website: string;
}

export const CachedContactDetails: FC<Props> = ({ phone, email, website }) => {
  return (
    <Grid container xs={11}>
      <SocialBox value={phone || 'Phone number'} icon={<PhoneIcon color="primary" />} />
      <SocialBox
        value={email || 'E-mail address'}
        style={{ paddingLeft: 5, paddingRight: 5 }}
        icon={<MailOutlineIcon color="primary" />}
      />
      <SocialBox value={website || 'Website address'} icon={<LanguageIcon color="primary" />} />
    </Grid>
  );
};
