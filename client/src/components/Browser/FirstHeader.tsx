import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Auth } from "../Auth/Auth";

const FirstHeader : FC = () => {

    const {setLoginOpen} = useAuthContext() 

    return (
        <AppBar style={{
            background: '#2C2C2C',
            position: 'static',
            borderColor: '#383838',
            borderBottomStyle: 'solid',
            borderWidth: 2
        }}
        >
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item lg={6}>
                        <Link to="/">OPEN.IS</Link>
                    </Grid>
                    <Grid item lg={6} style={{textAlign: 'end'}}>
                        <Button color="secondary" onClick={() =>setLoginOpen(true)} variant="contained">
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
            <Auth/>
        </AppBar>
    )
}

export default FirstHeader