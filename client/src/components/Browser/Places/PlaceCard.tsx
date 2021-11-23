import { Avatar, CardContent, Button, styled, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Alert, Rating } from "@material-ui/lab";
import createStyles from "@material-ui/styles/createStyles";
import React, { FC, useEffect, useState } from "react";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import Cookies from 'js-cookie'
import { useSelectedPlacesContext } from "../../../contexts/SelectedPlacesContext";



const useStyles = makeStyles(() =>
    createStyles({
        card: {
            //  backgroundColor: '#430075',
            backgroundColor: '#2C2C2C',
            // borderRadius: 20,
            width: '100%',
            height: '100%'
        },
        image: {
            height: 80,
            width: 80
        }
    })
)


enum tabType {
    POPULAR = 0,
    RECENTLY_ADDED = 1,
    TOP_RATED = 2,
    FAVORITE = 3
}
interface PlaceProps {
    place: any,
    tabIndex: number 
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
    '& .MuiRating-iconEmpty': {
        color: 'white',
    },
});




export const PlaceCard: FC<PlaceProps> = ({ place, tabIndex }) => {
    const classes = useStyles()
    const [value, setValue] = useState<number | null>(0)
    const {setChosenCriterias} = useSelectedPlacesContext()


    useEffect(() => {
        const isFavorite = Cookies.get('favIds')?.split(',').some(el => el === place._id)
        isFavorite ? setValue(1) : setValue(null)
    }, [])

   

    const setFavoritePlace = (newValue: number | null) => {
        let favIds = Cookies.get('favIds')
        setValue(newValue)
        if (!favIds) {
            newValue === 1 && Cookies.set('favIds', `${place._id}`)
            console.log(Cookies.get())
            return
        }
        const favIdsArray = favIds.split(',')
        const index = favIdsArray.findIndex(id => id === place._id)
        // index not found && no value || index found && value
        if ((index === -1 && !newValue) || (index !== -1 && newValue === 1)) return
        if (index !== -1) {
            favIdsArray.splice(index, 1)
            tabIndex === tabType.FAVORITE && setChosenCriterias((criterias : any) => criterias.filter((criterium : any) => place._id !== criterium._id ))
            if (favIdsArray.length === 0) {
                Cookies.remove('favIds')
                return
            }
        } else {
            favIdsArray.push(place._id)
        }
        favIds = favIdsArray.join(',')
        Cookies.set('favIds', favIds)
        console.log(Cookies.get())

    }


    return (
        <Card
            className={classes.card}
        >
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item container alignItems="center" >
                        <Grid item>
                            <Avatar style={{ width: 80, height: 80 }} src={place.img} alt={place.name} />
                        </Grid>
                        <Grid item xs={9} lg={9} sm={9} md={9} style={{ marginLeft: 10 }}>
                            <Typography variant="h6" style={{ color: 'white' }}>
                                {place.name}
                            </Typography>
                            <Typography variant="body1" style={{ color: '#A0A0A0' }}>
                                {place.subtitle}
                            </Typography>
                            <Grid container alignItems="center">
                                <Typography variant="overline" style={{ color: '#32de84' }}>
                                    {place.type}
                                </Typography>
                                <Tooltip title="Add to favorites">
                                    <StyledRating
                                        name={`${place._id}`}
                                        onClick={(event) => event.stopPropagation()}
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setFavoritePlace(newValue)
                                        }}
                                        style={{ marginLeft: 5 }}
                                        icon={<Favorite fontSize="inherit" />}
                                        emptyIcon={<FavoriteBorder fontSize="inherit" />}
                                        max={1}
                                    />
                                </Tooltip>
                            </Grid>
                            <Typography variant="body2" color="primary">
                                Address: {place.address}
                            </Typography>
                        </Grid>
                        <Grid item style={{ flexGrow: 1, color: 'white' }}>
                            <Grid container justify="center" style={{ height: '100%' }} alignItems="center">
                                {place.status === 'open' ?
                                    <Tooltip title="This place is now open">
                                        <Button variant="contained" size="small" style={{ background: '#4caf50', color: 'white' }}>Open</Button>
                                    </Tooltip>
                                    :
                                    <Tooltip title="This place is now closed">
                                        <Button variant="contained" size="small" style={{ background: '#ff5252', color: 'white' }}>Closed</Button>
                                    </Tooltip>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

