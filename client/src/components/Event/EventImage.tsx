import { CardMedia } from '@mui/material';
import { UploadCardMedia } from 'components/ImageUpload/UploadCardMedia';
import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { setLogoFile } from 'store/slices/currentPlaceSlice';
import { setImg, useImageSelector } from 'store/slices/eventSlice';
import { ImageType } from 'store/slices/PlaceProps';
interface Props {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export const EventImage: FC<Props> = ({ setImageFile }) => {
  const [currentImg, setCurrentImg] = useState<ImageType>(null);
  return (
    <UploadCardMedia
      isEditable={true}
      style={{ height: '400px', width: '100%' }}
      setImageFile={setImageFile}
      setCurrentImg={setCurrentImg}
      currentImg={currentImg}
    />
  );
};
