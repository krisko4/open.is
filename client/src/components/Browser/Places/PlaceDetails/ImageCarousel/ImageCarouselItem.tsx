import { PhotoCamera } from "@mui/icons-material"
import { CardMedia, Slide, Grid, IconButton, Typography } from "@mui/material"
import { FC, useState } from "react"
import { ImageUpload } from "../../../../reusable/ImageUpload"

interface Props {
    image: string,
    address: string
}
export const ImageCarouselItem: FC<Props> = ({ image, address }) => {
    const [isHover, setHover] = useState(true)
    const [img, setImg] = useState<any>(image)
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
            image={img}
        >
            <Slide in={isHover} appear>
                <Grid justifyContent="center" alignItems="center" container sx={{ height: '100%', background: 'black', opacity: '50%' }}>
                    <ImageUpload name={img} img={img} setImg={setImg} >
                        <IconButton color="primary" component="span">
                            <PhotoCamera style={{ width: '100px', height: '100px' }} />
                        </IconButton>
                    </ImageUpload>
                </Grid>
            </Slide>
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