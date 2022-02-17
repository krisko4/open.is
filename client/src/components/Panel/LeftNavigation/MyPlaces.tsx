import { Avatar, ListItem, ListItemAvatar, ListItemText, ListSubheader } from "@mui/material"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import { RawPlaceDataProps } from "../../../contexts/PlaceProps"
import { setPlace } from "../../../store/actions/setCurrentPlace"
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector"
import { convertToCurrentPlace } from '../../../utils/place_data_utils'
export const MyPlaces: FC = () => {

    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const history = useHistory()
    const match = useRouteMatch()

    const choosePlace = (place: RawPlaceDataProps) => {
        const currentPlace = convertToCurrentPlace(place)[0]
        dispatch(setPlace(currentPlace))
        history.push({
            pathname: `${match.url}/management/${currentPlace._id}`,
            state: { place: currentPlace, businessId: place._id }
        }
        )
    }

    return <>
        {places.length > 0 &&
            <>
                <ListSubheader disableSticky>
                    My places
                </ListSubheader>
                {places.filter(place => place.locations.length === 1).map((place) =>
                    <ListItem key={place._id} button onClick={() => choosePlace(place)}>
                        <ListItemAvatar>
                            <Avatar
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