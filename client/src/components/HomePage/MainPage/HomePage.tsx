import Grid from "@material-ui/core/Grid";
import { Banner } from "./Banner";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { AuthContextProvider } from "../../../contexts/AuthContext";
import { FC } from "react";
import { Auth } from "../../Auth/Auth";



const HomePage: FC = () => {

    return (
        <Grid container>
            <AuthContextProvider>
                <Header />
                <Auth />
                <Banner />
                <Content />
                <Footer backgroundColor='#280000' />
            </AuthContextProvider>
        </Grid>
    )
}

export default HomePage