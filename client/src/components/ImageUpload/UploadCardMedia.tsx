import { PhotoCamera } from '@mui/icons-material';
import { CardMedia, Grid, IconButton, Slide } from '@mui/material';
import { FC, useState } from 'react';
import { ImageUpload } from './ImageUpload';

interface Props {
  isEditable?: boolean;
  setImageFile?: React.Dispatch<React.SetStateAction<File | null>>;
  currentImg: string | ArrayBuffer | File | null;
  setCurrentImg?: React.Dispatch<React.SetStateAction<string | ArrayBuffer | File | null>>;
  style?: React.CSSProperties;
}
export const UploadCardMedia: FC<Props> = ({ currentImg, setCurrentImg, style, isEditable, setImageFile }) => {
  const [isHover, setHover] = useState(true);
  return (
    <CardMedia
      onMouseEnter={() => isEditable && setHover(true)}
      onMouseLeave={() => isEditable && setHover(false)}
      style={{
        // height: 200,
        overflow: 'hidden',
        ...style,
        // marginTop: 10,
        // borderRadius: 20,
        // backgroundSize: 'contain',
      }}
      image={(currentImg as string) || `${import.meta.env.VITE_BASE_URL}/images/no-preview.jpg`}
    >
      {isEditable && (
        <Slide direction="up" in={isHover} appear>
          <Grid
            justifyContent="center"
            alignItems="center"
            container
            sx={{ height: '100%', background: 'black', opacity: '50%' }}
          >
            <ImageUpload name="logo-upload" setImg={setCurrentImg} setImageFile={setImageFile}>
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </ImageUpload>
          </Grid>
        </Slide>
      )}
    </CardMedia>
  );
};
