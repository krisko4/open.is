import { makeStyles } from '@mui/styles';
import { FC, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { ImageCarouselItem } from '../ImageCarousel/ImageCarouselItem';
import { Image } from 'redux-toolkit/slices/PlaceProps';

const useStyles = makeStyles({
  carousel: {
    flexGrow: 1,
  },
  media: {
    height: 400,
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
  images: Image[];
  address: string;
}

export const CachedImageCarousel: FC<Props> = ({ images, address }) => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(1);

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
          <ImageCarouselItem address={address} index={index} item={item} />
        </div>
      ))}
    </Carousel>
  );
};
