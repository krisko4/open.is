import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { Card, CardContent, Grid } from "@mui/material";
import React, { FC } from "react";


interface SocialBoxProps {
    value: string,
    icon: any

}

const SocialBox : FC<SocialBoxProps> = ({value, icon}) => {
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

    )

}

interface Props{
    phone : string,
    email: string,
    website: string
}

export const CachedContactDetails : FC<Props> = ({phone, email, website}) => {
    return (
        <>
            <SocialBox value={phone || 'Phone number'} icon={<PhoneIcon color="primary" />} />
            <SocialBox value={email || 'E-mail address'} icon={<MailOutlineIcon color="primary" />} />
            <SocialBox value={website || 'Website address'} icon={<LanguageIcon color="primary" />} />
        </>
    )


}

