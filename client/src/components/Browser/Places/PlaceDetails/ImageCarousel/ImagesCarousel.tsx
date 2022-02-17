import { PhotoCamera } from "@mui/icons-material";
import { CardMedia, Grid, IconButton, Slide, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { FC, useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../../contexts/PlaceProps";
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
    isEditable?: boolean,
    currentPlace : CurrentPlaceProps,
    setCurrentPlace? : React.Dispatch<React.SetStateAction<CurrentPlaceProps>>
}


export const ImagesCarousel: FC<Props> = ({currentPlace, setCurrentPlace, isEditable }) => {
    const classes = useStyles()


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
            {currentPlace.images.map((item, index) =>
                <div
                    key={index}
                >
                    <ImageCarouselItem currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} isEditable={isEditable} index={index} item={item} />
                </div>)
            }
        </Carousel >
    );
}