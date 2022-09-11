import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { CardMedia, Grid, IconButton, Slide } from '@mui/material';
import { ImageUpload } from 'components/ImageUpload/ImageUpload';
import { UploadCardMedia } from 'components/ImageUpload/UploadCardMedia';
import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { setLogo, useLogoSelector } from 'store/slices/currentPlaceSlice';

interface Props {
  isEditable?: boolean;
  setLogoFile?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const PlaceLogo: FC<Props> = ({ isEditable, setLogoFile }) => {
  const logo = useLogoSelector();
  const dispatch = useAppDispatch();
  const [currentLogo, setCurrentLogo] = useState(logo);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (currentLogo) {
      dispatch(setLogo(currentLogo));
    }
  }, [currentLogo]);

  return (
    <UploadCardMedia
      style={{ height: 200, marginTop: 10, borderRadius: 20 }}
      isEditable={isEditable}
      setImageFile={setLogoFile}
      setCurrentImg={setCurrentLogo}
      currentImg={currentLogo}
    />
    // <CardMedia
    //   onMouseEnter={() => isEditable && setHover(true)}
    //   onMouseLeave={() => isEditable && setHover(false)}
    //   style={{
    //     height: 200,
    //     overflow: 'hidden',
    //     marginTop: 10,
    //     borderRadius: 20,
    //     backgroundSize: 'contain',
    //   }}
    //   image={(currentLogo as string) || `${process.env.REACT_APP_BASE_URL}/images/no-preview.jpg`}
    // >
    //   {isEditable && (
    //     <Slide direction="up" in={isHover} appear>
    //       <Grid
    //         justifyContent="center"
    //         alignItems="center"
    //         container
    //         sx={{ height: '100%', background: 'black', opacity: '50%' }}
    //       >
    //         <ImageUpload name="logo-upload" setImg={setCurrentLogo} setImageFile={setLogoFile}>
    //           <IconButton color="primary" component="span">
    //             <PhotoCamera />
    //           </IconButton>
    //         </ImageUpload>
    //       </Grid>
    //     </Slide>
    //   )}
    // </CardMedia>
  );
};
