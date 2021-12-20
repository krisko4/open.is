import { Avatar, Collapse, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core"
import { StarBorder } from "@material-ui/icons"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { RawPlaceDataProps } from "../../../../contexts/PanelContexts/BusinessChainContext"
import { LocationProps } from "../../../../contexts/PanelContexts/CurrentPlaceContext"
import { setPlace } from "../../../../store/actions/setCurrentPlace"
import { convertToCurrentPlace } from "../../../../utils/place_data_utils"

interface Props {
    place: RawPlaceDataProps
}

export const BusinessChain: FC<Props> = ({ place }) => {

    const [open, setOpen] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const match = useRouteMatch()

    const choosePlace = (place: RawPlaceDataProps, location: LocationProps) => {
        const placeCopy = { ...place }
        placeCopy.locations = [location]
        const currentPlaces = convertToCurrentPlace(placeCopy)
        const currentPlace = currentPlaces[0]
        dispatch(setPlace(currentPlace))
        history.push({
            pathname: `${match.url}/management/${currentPlace._id}`,
            state: { place: currentPlace }
        }
        )

    }

    return <>
        <ListItem button onClick={() => setOpen(open => !open)}>
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
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
                {place.locations.map(location =>
                    <ListItem button onClick={() => choosePlace(place, location)} key={location._id}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText secondary={location.address} />
                    </ListItem>
                )}
            </List>
        </Collapse>

    </>
}