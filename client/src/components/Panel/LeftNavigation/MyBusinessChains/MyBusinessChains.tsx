
import { Avatar, ListItem, ListItemAvatar, ListItemText, ListSubheader } from "@mui/material"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { RawPlaceDataProps } from "../../../../contexts/PlaceProps"
import { usePlacesSelector } from "../../../../redux-toolkit/slices/placesSlice"

export const MyBusinessChains: FC = () => {

    const places = usePlacesSelector()
    const navigate = useNavigate()
    const choosePlace = (place: RawPlaceDataProps) => {
        navigate(
            `business-chain/${place._id}`
        )
    }


    return <>
        {places.filter(place => place.isBusinessChain ).length > 0 &&
            <>
                <ListSubheader disableSticky>
                    My business chains
                </ListSubheader>
                {places.filter(place => place.isBusinessChain).map((place) =>
                    <ListItem key={place._id} button onClick={() => choosePlace(place)}>
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
                    </ListItem>
                )}
            </>
        }
    </>
}