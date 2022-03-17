import { Grid, Card, CardContent } from '@mui/material';
import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { FC } from 'react';
import { usePhoneSelector, useWebsiteSelector, useEmailSelector } from 'redux-toolkit/slices/currentPlaceSlice';


interface SocialBoxProps {
  value: string,
  icon: any

}

const SocialBox : FC<SocialBoxProps> = ({ value, icon }) => {
  return (
        <Grid item lg={3} >
            <Card elevation={10}>
                <CardContent>
                    <Grid container justifyContent="center">
                        <Grid item lg={12} style={{ textAlign: 'center' }}>
                            {icon}
                        </Grid>
                        <Grid item>
                            {value}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>

  );

};


export const ContactDetails : FC = () => {
  const phone = usePhoneSelector();
  const email = useEmailSelector();
  const website = useWebsiteSelector();
  return (
        <>
            <SocialBox value={phone || 'Phone number'} icon={<PhoneIcon color="primary" />} />
            <SocialBox value={email || 'E-mail address'} icon={<MailOutlineIcon color="primary" />} />
            <SocialBox value={website || 'Website address'} icon={<LanguageIcon color="primary" />} />
        </>
  );


};

