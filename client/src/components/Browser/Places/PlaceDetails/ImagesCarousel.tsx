import { Avatar, Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { FC } from "react"
import Carousel from "react-material-ui-carousel"
import { useMapContext } from "../../../../contexts/MapContext/MapContext"

var items = [
    { img: 'https://www.24opole.pl/res/cache/news/1024.768.20210716143309_biedra_0.jpg' },
    { img: 'https://galeria.bankier.pl/p/5/4/741fef50805a49-948-568-366-468-1512-907.jpg' }
]


const useStyles = makeStyles({
    carousel: {
        flexGrow: 1
    },
    media: {
        height: 400,
        flexGrow: 1,
        '&&:hover': {
            filter: 'brightness(85%)'
        },
        transition: '.5s',

    },
    bottomText: {
        position: 'absolute',
        bottom: 0,
        height: 70,
        background: 'black',
        opacity: '0.7',
        transition: '.3s',
        '&&:hover': {
            opacity: '0.8'
        }

    }
})
interface Props {
    address: string,
    img: string
}
export const ImagesCarousel: FC<Props> = ({ address, img }) => {
    const classes = useStyles()
    return (
        <Carousel stopAutoPlayOnHover autoPlay={false} indicators={false} interval={10000} animation="slide" className={classes.carousel}>
            {items.map((item, i) =>
                <div
                    key={i}
                >
                    <CardMedia className={classes.media} image={item.img}>
                        <Grid alignItems="center" justifyContent="center" container className={classes.bottomText}>
                            <Typography style={{ color: 'white', textAlign: 'center' }} variant="body1">{address}</Typography>
                        </Grid>
                    </CardMedia>
                </div>)
            }
        </Carousel >
    );
}