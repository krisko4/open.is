import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthSelector } from "../../store/selectors/AuthSelector";
import { Auth } from "../Auth/Auth";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { SignOutButton } from "../reusable/SignOutButton";
import { useLoginContext } from "../../contexts/LoginContext";
const FirstHeader: FC = () => {

    const { setLoginOpen } = useAuthContext()
    const {userData} = useLoginContext()
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
                <Grid container alignItems="center" justifyContent="flex-end">
                    <Grid item>
                        <IconButton onClick={() => history.push('/')} color="inherit" size="large">
                            <HomeIcon />
                        </IconButton>
                    </Grid>
                    <Grid item style={{ textAlign: 'end' }}>
                        {!userData.isLoggedIn ? <Button color="error" onClick={() => setLoginOpen(true)} variant="contained">
                            Sign in
                        </Button> : <SignOutButton color="error" variant="contained">Sign out</SignOutButton>}
                    </Grid>
                </Grid>
            </Toolbar>
            <Auth />
        </AppBar>
    );
}

export default FirstHeader