import { PhotoCamera } from "@mui/icons-material";
import {
    CardMedia,
    IconButton, Slide
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { FC, useEffect, useRef, useState } from "react";
import { ImageUpload } from "../../../../reusable/ImageUpload";

interface Props {
    isEditable: boolean | undefined,
    logo: string | File | ArrayBuffer | null,
    setImageFile: any

}

export const PlaceLogo: FC<Props> = ({ isEditable, logo, setImageFile }) => {

    const [myLogo, setLogo] = useState(logo)
    const [isHover, setHover] = useState(true)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        // const newCurrentPlace = { ...currentPlace }
        // newCurrentPlace.logo = logo
        // setCurrentPlace(newCurrentPlace)
    }, [logo])

    return (
        <CardMedia
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ height: 200, overflow: 'hidden', marginTop: 10, borderRadius: 20 }}
            image={logo ? `${logo}` : `${process.env.REACT_APP_BASE_URL}/images/no-preview.jpg`} >
            {isEditable &&
                <Slide direction="up" in={isHover} appear>
                    <Grid justifyContent="center" alignItems="center" container sx={{ height: '100%', background: 'black', opacity: '50%' }}>
                        <ImageUpload name="logo-upload" img={myLogo} setImg={setLogo} setImageFile={setImageFile}>
                            <IconButton color="primary" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </ImageUpload>
                    </Grid>
                </Slide>

            }
        </CardMedia>

    )
}

export const MemoizedPlaceLogo = React.memo(PlaceLogo)