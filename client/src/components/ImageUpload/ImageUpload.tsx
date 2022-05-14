import React, { FC, useRef } from 'react';
import { useCustomSnackbar } from 'utils/snackbars';

interface Props {
  setImageFile?: any;
  name: string;
  setImg: React.Dispatch<React.SetStateAction<string | File | ArrayBuffer | null>>;
}

export const ImageUpload: FC<Props> = ({ name, children, setImg, setImageFile }) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const { enqueueErrorSnackbar } = useCustomSnackbar();

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      if (image.size > 2000000) {
        enqueueErrorSnackbar('The size of selected file exceeds maximum size limit, which is 2 MB');
        return;
      }
      if (setImageFile) {
        setImageFile(image);
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = (e) => {
        if (e.target) {
          setImg(e.target.result);
        }
      };
    }
  };

  return (
    <>
      <label htmlFor={name}>
        <input
          type="file"
          id={name}
          accept="image/*"
          ref={uploadRef}
          style={{ display: 'none' }}
          onChange={(e) => uploadImage(e)}
        />
        {children}
      </label>
    </>
  );
};
