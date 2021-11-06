import { Card, CardContent, CardMedia, Grid, IconButton, Slide, Fade, Typography } from "@material-ui/core"
import React, { FC } from "react"
import { SocialIcon } from "react-social-icons"
import { AuthContextProvider } from "../../../contexts/AuthContext"
import Header from "../MainPage/Header"
import { ContactForm } from "./ContactForm"
export const Contact: FC = () => {


    return (
        <AuthContextProvider>
            <Header />
            <Grid container alignItems="center" direction="column" justify="center" style={{ height: 600, backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.6)), url(${process.env.REACT_APP_BASE_URL}/images/contact.jpg)` }} >
                <div style={{ color: 'white', textAlign: 'center', marginTop: 200 }}>
                    <Typography variant="h2" >Contact us</Typography>
                    <Typography variant="h6" >We are open to any kind of questions or business offers</Typography>
                </div>
            </Grid>
            <Grid container justify="center">
                <Grid item lg={7} md={7} sm={11} xs={11} style={{ marginTop: -50, paddingBottom: 50 }}>
                    <Slide in={true} timeout={2000}>
                        <Card>
                            <CardContent>
                                <Grid container justify="space-between">
                                    <Grid container item xs={6} direction="column">
                                        <Typography variant="h6">
                                            Our mailing address is:<br />
                                        </Typography>
                                        <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>
                                            15 Grow Street,<br />
                                            New York City,<br />
                                            Phone: 111-222-333
                                        </Typography>
                                    </Grid>
                                    <Grid container alignItems="center" justify="center" item xs={6}>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://facebook.com" /></IconButton>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://instagram.com" /></IconButton>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://twitter.com" /></IconButton>
                                        <IconButton><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://gmail.com" /></IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center">
                                    <Grid item container lg={6} md={10} sm={10}>
                                        {/* <img src="https://cdn.dribbble.com/users/1551941/screenshots/6346538/thankyoudribble.gif" style={{width: '100%'}} /> */}
                                        <CardMedia image={`https://cdn.dribbble.com/users/1551941/screenshots/6346538/thankyoudribble.gif`} style={{ height: 500, width: 500 }} />
                                    </Grid>
                                    <Grid item container justify="center" lg={6} xs={11} md={10} sm={11}>
                                        <ContactForm />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>

            </Grid>
        </AuthContextProvider>

    )
}