import { CardMedia } from "@mui/material"
import { FC } from "react"
import { useParams } from "react-router-dom"
import { useGetPlaceByIdAndSelectedLocationQuery } from "redux-toolkit/api/placesApi"


export const CachedPlaceLogo: FC = () => {

    const {placeId, locationId} = useParams()
    const { data: place } = useGetPlaceByIdAndSelectedLocationQuery({
        placeId: placeId as string,
        locationId: locationId as string
    })


    return (
        <CardMedia
            style={{
                height: 200,
                overflow: 'hidden',
                marginTop: 10,
                borderRadius: 20,
                backgroundSize: 'contain'
            }}
            image={place && place.logo as string || `${process.env.REACT_APP_BASE_URL}/images/no-preview.jpg`} >
        </CardMedia>
    )

}