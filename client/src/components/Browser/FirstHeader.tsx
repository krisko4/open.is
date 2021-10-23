import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthSelector } from "../../store/selectors/AuthSelector";
import { Auth } from "../Auth/Auth";
import HomeIcon from '@material-ui/icons/Home';
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SignOutButton } from "../reusable/SignOutButton";
const FirstHeader: FC = () => {

    const { setLoginOpen } = useAuthContext()
    const isUserLoggedIn = useAuthSelector()
    const history = useHistory()

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
                <Grid container alignItems="center" justify="flex-end">
                    <Grid item>
                        <IconButton onClick={() => history.push('/')} color="inherit">
                            <HomeIcon />
                        </IconButton>
                    </Grid>
                    <Grid item style={{ textAlign: 'end' }}>
                        {!isUserLoggedIn ? <Button color="secondary" onClick={() => setLoginOpen(true)} variant="contained">
                            Sign in
                        </Button> : <SignOutButton color="secondary" variant="contained">Sign out</SignOutButton>}
                    </Grid>
                </Grid>
            </Toolbar>
            <Auth />
        </AppBar>
    )
}

export default FirstHeader