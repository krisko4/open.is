import { Avatar, ListItem, ListItemAvatar, ListItemText, ListSubheader } from "@material-ui/core"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { PlaceProps } from "../../../contexts/PanelContexts/CurrentPlaceContext"
import { ChosenOptions } from "../../../contexts/PanelContexts/PanelContext"
import { setPlace } from "../../../store/actions/setCurrentPlace"
import { setSelectedOption } from "../../../store/actions/setSelectedOption"
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector"

export const MyPlaces: FC = () => {
    
    const dispatch = useDispatch()
    const places = usePlacesSelector()

    const choosePlace = (place: PlaceProps) => {
        dispatch(setPlace(place))
        dispatch(setSelectedOption(ChosenOptions.PLACE_MANAGEMENT))
    }

    return <>
        {places.length > 0 && <ListSubheader disableSticky>
            My places
        </ListSubheader>}
        {places.map((place: PlaceProps) =>
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