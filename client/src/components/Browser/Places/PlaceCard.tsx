import { Avatar, Button, CardContent, styled, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import createStyles from "@material-ui/styles/createStyles";
import Cookies from 'js-cookie';
import React, { FC, useEffect, useState } from "react";
import { useAddressDetailsContext } from "../../../contexts/AddressDetailsContext";
import { CurrentPlaceProps } from "../../../contexts/PanelContexts/CurrentPlaceContext";



const useStyles = makeStyles(() =>
    createStyles({
        card: {
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
    tabIndex: number ,
    currentPlace: CurrentPlaceProps
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




export const PlaceCard: FC<PlaceProps> = ({tabIndex, currentPlace}) => {
    const classes = useStyles()
    const [value, setValue] = useState<number | null>(0)
    const {setChosenCriterias} = useAddressDetailsContext()
    const [elevation, setElevation] = useState(0)


    useEffect(() => {
        const isFavorite = Cookies.get('favIds')?.split(',').some(el => el === currentPlace._id)
        isFavorite ? setValue(1) : setValue(null)
    }, [])

   

    const setFavoritePlace = (newValue: number | null) => {
        let favIds = Cookies.get('favIds')
        console.log(favIds)
        setValue(newValue)
        if (!favIds) {
            newValue === 1 && Cookies.set('favIds', `${currentPlace._id}`)
            console.log(Cookies.get())
            return
        }
        const favIdsArray = favIds.split(',')
        const index = favIdsArray.findIndex(id => id === currentPlace._id)
        // index not found && no value || index found && value
        if ((index === -1 && !newValue) || (index !== -1 && newValue === 1)) return
        if (index !== -1) {
            favIdsArray.splice(index, 1)
            tabIndex === tabType.FAVORITE && setChosenCriterias((criterias : any) => criterias.filter((criterium : any) => currentPlace._id !== criterium._id ))
            if (favIdsArray.length === 0) {
                Cookies.remove('favIds')
                return
            }
        } else {
            currentPlace._id && favIdsArray.push(currentPlace._id)
        }
        favIds = favIdsArray.join(',')
        Cookies.set('favIds', favIds)
        console.log(Cookies.get())

    }


    return (
        <Card
            className={classes.card}
            elevation={elevation}
            onMouseEnter={() => setElevation(10)}
            onMouseLeave={() => setElevation(0)}
        >
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item container alignItems="center" >
                        <Grid item>
                            <Avatar style={{ width: 80, height: 80 }} src={currentPlace.img as string} alt={currentPlace.name} />
                        </Grid>
                        <Grid item xs={9} lg={9} sm={9} md={9} style={{ marginLeft: 10 }}>
                            <Typography variant="h6" style={{ color: 'white' }}>
                                {currentPlace.name}
                            </Typography>
                            <Typography variant="body1" style={{ color: '#A0A0A0' }}>
                                {currentPlace.subtitle}
                            </Typography>
                            <Grid container alignItems="center">
                                <Typography variant="overline" style={{ color: '#32de84' }}>
                                    {currentPlace.type}
                                </Typography>
                                <Tooltip title="Add to favorites">
                                    <StyledRating
                                        name={`${currentPlace._id}`}
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
                                Address: {currentPlace.address}
                            </Typography>
                        </Grid>
                        <Grid item style={{ flexGrow: 1, color: 'white' }}>
                            <Grid container justify="flex-end" style={{ height: '100%' }} alignItems="center">
                                {currentPlace.status === 'open' ?
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

