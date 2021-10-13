
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { SocialIcon } from "react-social-icons";




interface Props {
    classes: any
}
const Footer: FC<Props> = ({ classes }) => {


    const history = useHistory()

    return (
        <Grid container className={classes.footer} style={{ paddingTop: 50, paddingBottom: 50 }} alignItems="center" direction="column">
            <div>
                <Button onClick={() => history.push('/contact')} style={{ color: 'white' }}>Contact</Button>
                <Button onClick={() => history.push('/about')} style={{ color: 'white' }}>About us</Button>
            </div>
            <Typography variant="body1" className={classes.text}>
                This is a simple project created in educational purposes, designed with Material UI.
            </Typography>
            <div>
                <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://facebook.com" /></IconButton>
                <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://instagram.com" /></IconButton>
                <IconButton><SocialIcon bgColor={"grey"} target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://github.com" /></IconButton>
                <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://linkedin.com" /></IconButton>
            </div>
            <Typography className={classes.text}>
                {new Date().getFullYear()} - <strong>Krzysztof Wyszyński</strong>
            </Typography>
        </Grid>

    )
}

export default Footer