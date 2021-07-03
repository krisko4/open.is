import React from "react";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {CardContent} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import {Parallax} from "react-parallax";





const useStyles = makeStyles((theme) =>
    createStyles({
        myBanner: {
            height: 1100,
            background: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5cc0e63b-28c1-48a0-9bb8-56ce8f6ed009/d5au41z-b0c521ed-dcdb-491c-8947-f557e51884b2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVjYzBlNjNiLTI4YzEtNDhhMC05YmI4LTU2Y2U4ZjZlZDAwOVwvZDVhdTQxei1iMGM1MjFlZC1kY2RiLTQ5MWMtODk0Ny1mNTU3ZTUxODg0YjIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ip9TSE2XLM7TqXIpYPO8gwHXIxB1-J5Fu6SHZTZjYSc)',
            backgroundSize: 'cover',
            backgroundBlendMode: 'darken',
            backgroundRepeat: 'no-repeat',
        },
        bannerTitle: {
            color: 'white',
            fontFamily: 'Georgia',
        },
        button: {
            minWidth: 250,
            minHeight: 70,


        },
        cardMedia: {
            width: 600,
            height: 400,
            marginTop: 100,
            [theme.breakpoints.only('xs')] : {
                width: 300,
                height:300,
                marginTop: 0
},
        }


    }),
);


const Banner = () => {


    const classes = useStyles()
    return (
        <Grid container>
            <Parallax
                strength={200}
                style={{width: '100%', height: 1100}}
                bgImage="https://i.imgur.com/kTc1tSm.jpeg"
                blur={{min: -15, max: 15}}
               // bgImage="https://eskipaper.com/images/city-wallpaper-10.jpg"
               // bgImage="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5cc0e63b-28c1-48a0-9bb8-56ce8f6ed009/d5au41z-b0c521ed-dcdb-491c-8947-f557e51884b2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVjYzBlNjNiLTI4YzEtNDhhMC05YmI4LTU2Y2U4ZjZlZDAwOVwvZDVhdTQxei1iMGM1MjFlZC1kY2RiLTQ5MWMtODk0Ny1mNTU3ZTUxODg0YjIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ip9TSE2XLM7TqXIpYPO8gwHXIxB1-J5Fu6SHZTZjYSc"
            >
                <Grid item xs={12} align="center">
                    <CardMedia image="http://localhost:8080/images/Openis-logos_white.png" className={classes.cardMedia}>
                    </CardMedia>
                    <Grid item lg={6} style={{ marginTop: 50}}>
                        <Button className={classes.button} color="secondary" variant="contained">Get started</Button>
                    </Grid>
                    {/*<Grid item xs={11} md={8} lg={5} sm={9}>*/}
                    {/*    <Card style={{borderRadius: 10}}>*/}
                    {/*        <CardContent>*/}
                    {/*            <Grid container justify="center">*/}
                    {/*                <Grid item xs={12} lg={10}>*/}
                    {/*                    <Autocomplete*/}
                    {/*                        freeSolo*/}
                    {/*                        multiple*/}
                    {/*                        options={top100Places}*/}
                    {/*                        className={classes.autocomplete}*/}
                    {/*                        getOptionLabel={(option) => option.title}*/}
                    {/*                        renderInput={(params) =>*/}
                    {/*                            <TextField*/}
                    {/*                                {...params}*/}
                    {/*                                placeholder="Name, address, type"*/}
                    {/*                                label="What place are you searching for?"*/}
                    {/*                                variant="standard"*/}
                    {/*                            />}*/}
                    {/*                    />*/}
                    {/*                </Grid>*/}
                    {/*                <Grid item xs={12} lg={2}>*/}
                    {/*                    <Button size="large" color="primary" style={{marginLeft: 20, marginTop: 10}} variant="contained">*/}
                    {/*                        Search*/}
                    {/*                    </Button>*/}
                    {/*                </Grid>*/}
                    {/*            </Grid>*/}
                    {/*        </CardContent>*/}
                    {/*    </Card>*/}

                    {/*</Grid>*/}
                </Grid>
            </Parallax>

        </Grid>


    )
}

const top100Places = [
    {title: 'Marczakiniosek'}
]

export default Banner