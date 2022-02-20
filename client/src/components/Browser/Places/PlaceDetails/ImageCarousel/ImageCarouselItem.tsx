import { PhotoCamera } from "@mui/icons-material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CardMedia, Slide, Grid, IconButton, Typography } from "@mui/material"
import { FC, useEffect, useRef, useState } from "react"
import {  useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../../contexts/PlaceProps";
import { ImageUpload } from "../../../../reusable/ImageUpload"


interface Image {
    img: string,
    file: File | null
}

interface Props {
    item: Image,
    index: number,
    isEditable?: boolean,
    address : string,
    // currentPlace: CurrentPlaceProps,
    setCurrentPlace?: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>,
    images: Image[]
}
export const ImageCarouselItem: FC<Props> = ({ item, images, address, setCurrentPlace, isEditable, index }) => {


    const [isHover, setHover] = useState(true)
    const [img, setImg] = useState<string | File | ArrayBuffer | null>(item.img)
    const [imageFile, setImageFile] = useState<File | null>(item.file)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (isEditable) {
            // const place = { ...currentPlace }
            images[index] = {
                img: img as string,
                file: imageFile
            }
            // console.log(place)
            // if(setCurrentPlace) setCurrentPlace(place)
        }
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
            image={item.img as string || `https://www.2bhappynow.com/wp-content/themes/thunder/skins/images/preview.png`}
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
                            <IconButton color="error" onClick={() => clearImage()} component="span">
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
                    },
                    pl: 1,
                    pr: 1
                }}
            >
                <Typography style={{ color: 'white', textAlign: 'center' }} variant="body1">{address || 'This is an address of your place'}</Typography>
            </Grid>
        </CardMedia>

    )
}