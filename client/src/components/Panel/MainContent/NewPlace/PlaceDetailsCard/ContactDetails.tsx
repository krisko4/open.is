import { Grid, Card, CardContent } from "@mui/material";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import { FC, useMemo } from "react";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";

interface Props {
    phone: string,
    email: string,
    website: string
}

interface SocialBoxProps {
    value: string,
    icon: any

}

const SocialBox = React.memo<SocialBoxProps>(({value, icon}) => {
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

}, (prevProps, nextProps) => prevProps.value === nextProps.value)


export const ContactDetailsContainer: FC = () => {
    const { currentPlace } = useCurrentPlaceContext()
    return (
        <>
            <SocialBox value={currentPlace.phone || 'Phone number'} icon={<PhoneIcon color="primary" />} />
            <SocialBox value={currentPlace.email || 'E-mail address'} icon={<MailOutlineIcon color="primary" />} />
            <SocialBox value={currentPlace.website || 'Website address'} icon={<LanguageIcon color="primary" />} />
        </>
    )


}

