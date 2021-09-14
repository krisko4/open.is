import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { Parallax } from "react-parallax";
import { useAuthContext } from "../../../../contexts/AuthContext";





const Section2 : FC = () => {

    const {setLoginOpen} = useAuthContext()
    return (
            <Grid item xs={12} style={{ marginTop: 70 }}>
                <Parallax

                    bgImage={`${process.env.REACT_APP_BASE_URL}/images/img.jpg`}
                    strength={-400}
                    renderLayer={() => (
                        <div
                            style={{
                                position: 'absolute',
                                background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3))`,
                                width: '100%',
                                height: '100%'

                            }}
                        />
                    )}
                >
                    <Grid container style={{ height: 800 }} alignItems="center" direction="column" justify="center">
                        <Typography variant="h2" style={{ color: 'white' }}>Spread your wings.</Typography>
                        <Typography variant="h6" style={{ color: 'white' }}>Let us take care of your development</Typography>
                        <Button variant="outlined" size="large" onClick={() => setLoginOpen(true)} style={{ color: 'white', borderColor: 'white', marginTop: 10 }}>Join us</Button>
                    </Grid>
                </Parallax>
            </Grid>
    )
}

export default Section2
