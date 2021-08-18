import * as React from 'react';
import Dialog from "@material-ui/core/Dialog";
import { Slide, SlideProps, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import { LoginForm } from "./LoginForm";
import {  useAuthContext } from "../../../contexts/AuthContext";




const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);


export const Login = () => {

    const { loginOpen, setLoginOpen, setRegistrationOpen } = useAuthContext()

    return (

        <Dialog
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
            keepMounted
            TransitionComponent={Transition}
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