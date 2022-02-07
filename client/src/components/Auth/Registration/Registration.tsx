import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Slide, { SlideProps } from "@mui/material/Slide";
import * as React from 'react';
import { useAuthContext } from "../../../contexts/AuthContext";
import { RegistrationForm } from "./RegistrationForm";




const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);




export const Registration = () => {


    const {registrationOpen, setLoginOpen, setRegistrationOpen} = useAuthContext()

    return (
        <Dialog
            open={registrationOpen}
            onClose={() => setRegistrationOpen(false)}
            keepMounted
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth={'md'}

        >
            <Grid container>
                <Grid item lg={6} style={{background: '#F5F5F5'}}>
                     <RegistrationForm/>
                </Grid>
                <Grid item container alignItems="center" lg={6}
                      style={{background: 'linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.5)),url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80)'}}>
                    <Grid item lg={12} style={{textAlign: 'center'}}>
                        <CardMedia style={{height: 200}}
                                   image={`${process.env.REACT_APP_BASE_URL}/images/Openis-logos_white.png`}>
                        </CardMedia>
                        <Typography variant="body2" style={{color: 'white', marginTop: 10}}>Already have an
                            account?</Typography>
                        <Button
                            onClick={() => {setLoginOpen(true); setRegistrationOpen(false)}}
                            variant="outlined"
                            style={{color: 'white', borderColor: 'white', borderRadius: 10, marginTop: 10}}
                        >
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );

};