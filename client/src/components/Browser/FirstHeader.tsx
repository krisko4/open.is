import AppBar from "@mui/material/AppBar";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { FC } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthSelector } from "../../store/selectors/AuthSelector";
import { Auth } from "../Auth/Auth";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Tooltip } from "@mui/material";
import { useHistory } from "react-router-dom";
import { SignOutButton } from "../reusable/SignOutButton";
import { useLoginContext } from "../../contexts/LoginContext";
import { ColorModeSwitch } from "../reusable/ColorModeSwitch";
const FirstHeader: FC = () => {

    const { setLoginOpen } = useAuthContext()
    const { userData } = useLoginContext()
    const history = useHistory()

    return (
        <AppBar position="static"
        // style={{
        //     background: '#2C2C2C',
        //     position: 'static',
        //     borderColor: '#383838',
        //     borderBottomStyle: 'solid',
        //     borderWidth: 2

        // }}
        >
            <Toolbar>
                <Grid container alignItems="center" justifyContent="flex-end">
                    <ColorModeSwitch />
                    <Tooltip title="Home">
                        <IconButton onClick={() => history.push('/')} color="inherit" size="large">
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    {!userData.isLoggedIn ?
                        <Button color="error" onClick={() => setLoginOpen(true)} variant="contained">
                            Sign in
                        </Button>
                        :
                        <>
                            <Tooltip title="Panel">
                                <IconButton sx={{ mr: 1 }} onClick={() => history.push('/panel')} color="inherit" size="large">
                                    <AdminPanelSettingsIcon />
                                </IconButton>
                            </Tooltip>
                            <SignOutButton color="error" variant="contained">Sign out</SignOutButton>
                        </>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default FirstHeader