import { PhotoCamera } from "@mui/icons-material";
import { CardMedia, Grid, IconButton, Slide, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { FC, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../contexts/StepContext";
import { ImageUpload } from "../../../../reusable/ImageUpload";
import { ImageCarouselItem } from "./ImageCarouselItem";



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

const items = [
    { img: 'https://www.24opole.pl/res/cache/news/1024.768.20210716143309_biedra_0.jpg' },
    { img: 'https://galeria.bankier.pl/p/5/4/741fef50805a49-948-568-366-468-1512-907.jpg' }
]
export const ImagesCarousel: FC<Props> = ({ address, img }) => {
    const classes = useStyles()


    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const { imageFile, setImageFile } = useStepContext()
    const [image, setImage] = useState<any>(currentPlace.img)

    const [isHover, setHover] = useState(true)

    return (
        <Carousel stopAutoPlayOnHover autoPlay={false} indicators={false} interval={10000} animation="slide" className={classes.carousel}>
            {items.map((item, i) =>
                <div
                    key={i}
                >
                    {/* <CardMedia
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className={classes.media}
                        image={item.img}
                    >
                        <Slide in={isHover} appear>
                            <Grid justifyContent="center" alignItems="center" container sx={{ height: '100%', background: 'black', opacity: '50%' }}>
                                <ImageUpload name={i.toString()} img={image} setImg={setImage} setImageFile={setImageFile}>
                                    <IconButton color="primary" component="span">
                                        <PhotoCamera style={{ width: '100px', height: '100px' }} />
                                    </IconButton>
                                </ImageUpload>
                            </Grid>
                        </Slide>
                        <Grid alignItems="center" justifyContent="center" container className={classes.bottomText}>
                            <Typography style={{ color: 'white', textAlign: 'center' }} variant="body1">{address}</Typography>
                        </Grid>
                    </CardMedia> */}
                   <ImageCarouselItem image={item.img} address={address} />

                </div>)
            }
        </Carousel >
    );
}