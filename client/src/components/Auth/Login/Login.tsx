import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import { Slide, SlideProps, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { LoginForm } from "./LoginForm";
import {  useAuthContext } from "../../../contexts/AuthContext";
import DialogTransition from '../../reusable/DialogTransition';






export const Login = () => {

    const { loginOpen, setLoginOpen, setRegistrationOpen } = useAuthContext()

    return (

        <Dialog
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            keepMounted
            TransitionComponent={DialogTransition}
            fullWidth={true}
            maxWidth={'md'}
        >
            <Grid container>
                <Grid item lg={6} style={{ background: '#F5F5F5' }}>
                    <LoginForm />
                </Grid>
                <Grid item container alignItems="center" lg={6}
                    style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.5)),url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80)' }}>
                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                        <CardMedia style={{ height: 200 }}
                            image={`${process.env.REACT_APP_BASE_URL}/images/Openis-logos_white.png`}>
                        </CardMedia>
                        <Typography variant="body2" style={{ color: 'white', marginTop: 10 }}>Don't have an account?</Typography>
                        <Button onClick={() => {
                            setRegistrationOpen(true);
                            setLoginOpen(false)
                        }} variant="outlined"
                            style={{ color: 'white', borderColor: 'white', borderRadius: 10, marginTop: 10 }}
                        >
                            Sign up
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>

    );
};