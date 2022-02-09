import { PhotoCamera } from "@mui/icons-material";
import { CardMedia, Grid, IconButton, Slide, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { FC, useEffect, useState } from "react";
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
    img: string,
    isEditable?: boolean
}

interface Image {
    img: string,
    file: File | null
}


const items = [
    { img: 'https://www.24opole.pl/res/cache/news/1024.768.20210716143309_biedra_0.jpg' },
    { img: 'https://galeria.bankier.pl/p/5/4/741fef50805a49-948-568-366-468-1512-907.jpg' }
]
export const ImagesCarousel: FC<Props> = ({ address, img, isEditable }) => {
    const classes = useStyles()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [images, setImages] = useState<Image[]>(currentPlace.images)

    useEffect(() => {
        const place = { ...currentPlace }
        place.images = images
        setCurrentPlace(place)

    }, [images])





    return (
        <Carousel
            stopAutoPlayOnHover
            autoPlay={false}
            indicators={false}
            interval={10000}
            swipe={false}
            animation="slide"
            className={classes.carousel}
        >
            {images.map((item, index) =>
                <div
                    key={index}
                >
                    <ImageCarouselItem isEditable={isEditable} index={index} item={item} setImages={setImages} address={address} />
                </div>)
            }
        </Carousel >
    );
}