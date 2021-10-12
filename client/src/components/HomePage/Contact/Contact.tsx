import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@material-ui/core"
import React, { FC } from "react"
import { SocialIcon } from "react-social-icons"
import { AuthContextProvider } from "../../../contexts/AuthContext"
import Header from "../MainPage/Header"
import { ContactForm } from "./ContactForm"
export const Contact: FC = () => {


    return (
        <AuthContextProvider>
            <Header />
            <Grid container style={{ background: 'whitesmoke' }} >
                <Grid container alignItems="center" direction="column" justify="center" style={{ height: 600, backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.6)), url(${process.env.REACT_APP_BASE_URL}/images/contact.jpg)` }} >
                    <div style={{ color: 'white', textAlign: 'center', marginTop: 200 }}>
                        <Typography variant="h2" >Contact us</Typography>
                        <Typography variant="h6" >We are open to any kind of questions or business offers</Typography>
                    </div>
                </Grid>
                <Grid container justify="center">
                    <Grid item lg={7} style={{ marginTop: -50, paddingBottom: 50 }}>
                        <Card>
                            <CardContent>
                                <Grid container justify="space-between">
                                    <Grid container item lg={6} direction="column">
                                        <Typography variant="h6">
                                            Our mailing address is:<br />
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            15 Grow Street,<br />
                                            New York City,<br />
                                            Phone: 111-222-333
                                        </Typography>
                                    </Grid>
                                    <Grid container alignItems="center" justify="center" item lg={6}>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://facebook.com" /></IconButton>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://instagram.com" /></IconButton>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://twitter.com" /></IconButton>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://gmail.com" /></IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item container lg={6}>
                                        <CardMedia image={`https://cdn.dribbble.com/users/1551941/screenshots/6346538/thankyoudribble.gif`} style={{ height: 500, width: 500 }} />
                                    </Grid>
                                    <Grid item container lg={6}>
                                        <ContactForm />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </AuthContextProvider>

    )
}