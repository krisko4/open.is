import { PhotoCamera } from "@mui/icons-material";
import { CardMedia, Grid, IconButton, Slide, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { FC, useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../../contexts/PlaceProps";
import { useStepContext } from "../../../../../contexts/StepContext";
import { ImageUpload } from "../../../../reusable/ImageUpload";
import { ImageCarouselItem } from "./ImageCarouselItem";
import { Image } from '../../../../../contexts/PlaceProps'


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
    isEditable?: boolean,
    images: Image[],
    setCurrentPlace?: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>,
    address: string
}

export const ImagesCarousel: FC<Props> = React.memo(({ isEditable, images, address, setCurrentPlace }) => {
    const classes = useStyles()
    const [currentIndex, setCurrentIndex] = useState(1)

    console.log(images)

    return (
        <Carousel
            stopAutoPlayOnHover
            autoPlay={false}
            indicators={false}
            interval={10000}
            swipe={false}
            index={currentIndex}
            onChange={(now) => setCurrentIndex(now as number)}
            animation="slide"
            className={classes.carousel}
        >
            {images.map((item, index) =>
                <div
                    key={index}
                >
                    <ImageCarouselItem
                        images={[...images]}
                        setCurrentPlace={setCurrentPlace}
                        isEditable={isEditable}
                        index={index}
                        item={item}
                        address={address}
                    />
                </div>)
            }
        </Carousel >
    );
}, (prevProps, nextProps) => prevProps.images === nextProps.images
)


