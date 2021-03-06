import { makeStyles } from '@mui/styles';
import { FC, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAddressSelector, useImagesSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { ImageCarouselItem } from './ImageCarouselItem';

const useStyles = makeStyles({
  carousel: {
    flexGrow: 1,
  },
  media: {
    // height: 400,
    flexGrow: 1,
    '&&:hover': {
      filter: 'brightness(85%)',
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
      opacity: '0.8',
    },
  },
});

interface Props {
  isEditable?: boolean;
}

export const ImageCarousel: FC<Props> = ({ isEditable }) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(1);
  const images = useImagesSelector();
  const address = useAddressSelector();

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
      {images.map((item, index) => (
        <div key={index}>
          <ImageCarouselItem address={address} isEditable={isEditable} index={index} item={item} />
        </div>
      ))}
    </Carousel>
  );
};
