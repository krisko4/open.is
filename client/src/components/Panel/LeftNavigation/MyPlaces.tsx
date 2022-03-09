import { Avatar, ListItemAvatar, ListItemButton, ListItemText, ListSubheader } from "@mui/material"
import { RawPlaceDataProps } from "contexts/PlaceProps"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePlacesSelector } from 'redux-toolkit/slices/placesSlice'
import { Destinations } from "../MainContent/PlaceManagement/PlaceBoard/PlaceBoard"

export const MyPlaces: FC = () => {

    const places = usePlacesSelector()
    const navigate = useNavigate()
    const location = useLocation()

    const choosePlace = (place: RawPlaceDataProps, index: number) => {
        navigate(`management/${place._id}`)
    }

    return <>
        {places.length > 0 &&
            <>
                <ListSubheader disableSticky>
                    My places
                </ListSubheader>
                {places.filter(place => !place.isBusinessChain).map((place, index) =>
                    <ListItemButton
                        key={place._id}
                        // selected={selectedIndex === index}
                        onClick={() => choosePlace(place, index)}
                    >
                        <ListItemAvatar>
                            <Avatar
                                imgProps={{
                                    style: { objectFit: 'contain' }
                                }}
                                alt={place.name}
                                src={place.logo as string} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={place.name}
                            secondary={place.subtitle}
                        />
                    </ListItemButton>
                )}
            </>
        }
    </>
}