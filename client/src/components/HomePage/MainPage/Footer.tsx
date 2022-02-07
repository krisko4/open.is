
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { SocialIcon } from "react-social-icons";




interface Props {
    classes: any
}
const Footer: FC<Props> = ({ classes }) => {


    const history = useHistory()

    return (
        <Grid container className={classes.footer} alignItems="center" direction="column">
            <div>
                <Button onClick={() => history.push('/contact')} style={{ color: 'white' }}>Contact</Button>
                <Button onClick={() => history.push('/about')} style={{ color: 'white' }}>About us</Button>
            </div>
            <Grid item xs={8} style={{textAlign: 'center'}}>
                <Typography variant="body1" className={classes.text}>
                    This is a simple project created in educational purposes, designed with Material UI.
                </Typography>

            </Grid>
            <div>
                <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://facebook.com" /></IconButton>
                <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://instagram.com" /></IconButton>
                <IconButton size="large"><SocialIcon bgColor={"grey"} target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://github.com" /></IconButton>
                <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://linkedin.com" /></IconButton>
            </div>
            <Typography className={classes.text}>
                {new Date().getFullYear()} - <strong>Krzysztof Wyszyński</strong>
            </Typography>
        </Grid>
    );
}

export default Footer