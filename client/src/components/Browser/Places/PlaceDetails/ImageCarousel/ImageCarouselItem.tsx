import { PhotoCamera } from "@mui/icons-material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CardMedia, Slide, Grid, IconButton, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { ImageUpload } from "../../../../reusable/ImageUpload"


interface Image {
    img: string,
    file: File | null
}

interface Props {
    item: Image,
    address: string,
    setImages: React.Dispatch<React.SetStateAction<Image[]>>,
    index: number,
    isEditable?: boolean
}
export const ImageCarouselItem: FC<Props> = ({ item, isEditable, index, address, setImages }) => {
    const [isHover, setHover] = useState(true)
    const [img, setImg] = useState<string | File | ArrayBuffer | null>(item.img)
    const [imageFile, setImageFile] = useState<File | null>(item.file)

    useEffect(() => {
        setImages(currentImages => {
            const images = [...currentImages]
            images[index] = {
                img: img as string,
                file: imageFile
            }
            return images
        })

    }, [img])

    const clearImage = () => {
        setImg(null)
        setImageFile(null)
    }

    return (
        <CardMedia
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                height: 400,
                flexGrow: 1,
                '&&:hover': {
                    filter: 'brightness(85%)'
                },
                transition: '.5s',
            }}
            image={img as string || `https://www.2bhappynow.com/wp-content/themes/thunder/skins/images/preview.png`}
        >
            {isEditable &&
                <Slide in={isHover} appear>
                    <Grid justifyContent="center" alignItems="center" container sx={{ height: '100%', background: 'black', opacity: '50%' }}>
                        <ImageUpload name={index.toString()} img={img} setImageFile={setImageFile} setImg={setImg} >
                            <IconButton color="primary" component="span">
                                <PhotoCamera style={{ width: '100px', height: '100px' }} />
                            </IconButton>
                        </ImageUpload>
                        {img &&
                            <IconButton color="secondary" onClick={() => clearImage()} component="span">
                                <DeleteForeverIcon style={{ width: '100px', height: '100px' }} />
                            </IconButton>
                        }
                    </Grid>
                </Slide>
            }
            <Grid alignItems="center" justifyContent="center" container
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    height: 70,
                    background: 'black',
                    opacity: '0.7',
                    transition: '.3s',
                    '&&:hover': {
                        opacity: '0.8'
                    }
                }}
            >
                <Typography style={{ color: 'white', textAlign: 'center' }} variant="body1">{address}</Typography>
            </Grid>
        </CardMedia>

    )
}