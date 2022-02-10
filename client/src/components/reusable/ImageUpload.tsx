import React, { FC, useRef, useState } from "react";

interface Props {
    img: string | File | ArrayBuffer | null,
    setImageFile?: any,
    name: string,
    setImg: React.Dispatch<React.SetStateAction<string | File | ArrayBuffer | null>>
}

export const ImageUpload: FC<Props> = ({ img, name, children, setImg, setImageFile }) => {

    const uploadRef = useRef<HTMLInputElement>(null)
    const [inputKey, setInputKey] = useState<any>()

    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            if (setImageFile) {
                setImageFile(image)
            }
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)
            fileReader.onload = e => {
                if (e.target) {
                    setImg(e.target.result)
                }
            }

        }

    }


    // const clearImage = () => {
    //     setImg('')
    //     setImageFile(null)
    //     setInputKey(Date.now())
    // }
    return <>
        {/* <Card variant="outlined"> */}
        {/* <CardMedia style={{ height: 300, backgroundSize: 'contain' }} image={img || `https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg`} > */}
        {/* {img && <Grid container justifyContent="flex-end">
                    <IconButton onClick={() => clearImage()} className="uploader" size="large">
                        <ClearIcon color="error" />
                    </IconButton>
                </Grid>} */}
        <label htmlFor={name}>
            <input
                type="file"
                id={name}
                accept="image/*"
                ref={uploadRef}
                style={{ display: 'none' }}
                onChange={e => uploadImage(e)}
                key={inputKey}
            />
            {children}
            {/* <IconButton color="primary" component="span">
                <PhotoCamera style={{ width: '100px', height: '100px' }} />
            </IconButton> */}
        </label>
        {/* </CardMedia>
        </Card>
        <Button startIcon={<UploadIcon/>}style={{ marginTop: 10 }} fullWidth variant="contained" onClick={() => uploadRef.current && uploadRef.current.click()} color="primary">Upload</Button> */}
    </>;
}