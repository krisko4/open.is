import { PhotoCamera } from "@mui/icons-material";
import {
    CardMedia,
    IconButton, Slide
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { FC, useEffect, useRef, useState } from "react";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../../contexts/PlaceProps";
import { ImageUpload } from "../../../../reusable/ImageUpload";

interface Props {
    isEditable: boolean | undefined,
    setImageFile: any,

}

export const PlaceLogo: FC<Props> = (props) => {
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    return <MemoizedPlaceLogo {...props} currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} />
}

interface PlaceProps {
    currentPlace: CurrentPlaceProps,
    setCurrentPlace: React.Dispatch<React.SetStateAction<CurrentPlaceProps>>
}

const MemoizedPlaceLogo = React.memo<Props & PlaceProps>(({ isEditable, currentPlace, setCurrentPlace, setImageFile }) => {

    const [logo, setLogo] = useState(currentPlace.logo)
    const [isHover, setHover] = useState(true)
    const isFirstRender = useRef(true)


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        const newCurrentPlace = { ...currentPlace }
        newCurrentPlace.logo = logo
        setCurrentPlace(newCurrentPlace)
    }, [logo])

    return (
        <CardMedia
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ height: 200, overflow: 'hidden', marginTop: 10, borderRadius: 20 }}
            image={logo as string || `${process.env.REACT_APP_BASE_URL}/images/no-preview.jpg`} >
            {isEditable &&
                <Slide direction="up" in={isHover} appear>
                    <Grid justifyContent="center" alignItems="center" container sx={{ height: '100%', background: 'black', opacity: '50%' }}>
                        <ImageUpload name="logo-upload" img={logo} setImg={setLogo} setImageFile={setImageFile}>
                            <IconButton color="primary" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </ImageUpload>
                    </Grid>
                </Slide>

            }
        </CardMedia>

    )
}, (prevProps, nextProps) => prevProps.currentPlace.logo === nextProps.currentPlace.logo)
