import { ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import { RawPlaceDataProps } from "../../../contexts/PanelContexts/BusinessChainContext"
import { CurrentPlaceProps } from "../../../contexts/PanelContexts/CurrentPlaceContext"
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
        console.log(currentPlace)
        dispatch(setPlace(currentPlace))
        history.push({
            pathname: `${match.url}/management/${currentPlace._id}`,
            state: {place: currentPlace}
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
                                // @ts-ignore
                                src={place.img} />
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