import { Button, CardMedia, Grid, IconButton } from "@material-ui/core"
import React, { FC, useRef, useState } from "react"
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
    img: any,
    setImg: any,
    setImageFile: any
}

export const ImageUpload: FC<Props> = ({ img, setImg, setImageFile }) => {

    const uploadRef = useRef<HTMLInputElement>(null)
    const [inputKey, setInputKey] = useState<any>()
    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            setImageFile(image)
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image)
            fileReader.onload = e => {
                if (e.target) {
                   
                    setImg(e.target.result)
                }
            }
        }

    }

    const clearImage = () => {
        setImg(null)
        setImageFile(null)
        setInputKey(Date.now())
    }
    return (
        <>
            <CardMedia style={{ height: 300 }} image={img || `https://www.penworthy.com/Image/Getimage?id=C:\Repositories\Common\About%20Us\Slide1.jpg`} >
                {img && <Grid container justify="flex-end">
                    <IconButton onClick={() => clearImage()} className="uploader" >
                        <ClearIcon color="secondary" />
                    </IconButton>
                </Grid>}
                <input
                    type="file"
                    accept="image/*"
                    ref={uploadRef}
                    style={{ display: 'none' }}
                    onChange={e => uploadImage(e)}
                >
                </input>
            </CardMedia>
            <Button style={{ marginTop: 10 }} fullWidth variant="contained" onClick={() => uploadRef.current && uploadRef.current.click()} color="primary">Upload</Button>
        </>

    )
}