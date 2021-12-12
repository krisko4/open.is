
import { Avatar, ListItem, ListItemAvatar, ListItemText, ListSubheader } from "@material-ui/core"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import { RawPlaceDataProps } from "../../../contexts/PanelContexts/BusinessChainContext"
import { CurrentPlaceProps } from "../../../contexts/PanelContexts/CurrentPlaceContext"
import { setPlace } from "../../../store/actions/setCurrentPlace"
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector"
import {convertToCurrentPlace} from '../../../utils/place_data_utils'
export const MyBusinessChains: FC = () => {

    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const history = useHistory()
    const match = useRouteMatch()
    const [businessChains, setBusinessChains] = useState(places.filter(place => place.locations.length > 1))

    const choosePlace = (place: RawPlaceDataProps) => {
        const currentPlace = convertToCurrentPlace(place)
        console.log(currentPlace)
        dispatch(setPlace(currentPlace))
        history.push(`${match.url}/management`)
    }

    return <>
        {businessChains.length > 0 &&
            <>
                <ListSubheader disableSticky>
                    My business chains
                </ListSubheader>
                {businessChains.map((place) =>
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