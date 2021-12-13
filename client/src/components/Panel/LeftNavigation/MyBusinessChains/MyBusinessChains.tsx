
import { Avatar, Collapse, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core"
import { StarBorder } from "@material-ui/icons"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import { RawPlaceDataProps } from "../../../../contexts/PanelContexts/BusinessChainContext"
import { CurrentPlaceProps } from "../../../../contexts/PanelContexts/CurrentPlaceContext"
import { setPlace } from "../../../../store/actions/setCurrentPlace"
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector"
import { convertToCurrentPlace } from '../../../../utils/place_data_utils'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { BusinessChain } from './BusinessChain'

export const MyBusinessChains: FC = () => {

    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const history = useHistory()
    const match = useRouteMatch()
    const [open, setOpen] = useState(false)
    const [businessChains, setBusinessChains] = useState(places.filter(place => place.locations.length > 1))

    const choosePlace = (place: RawPlaceDataProps) => {
        setOpen(open => !open)
        // const currentPlace = convertToCurrentPlace(place)
        // console.log(currentPlace)
        // dispatch(setPlace(currentPlace))
        // history.push(`${match.url}/management`)

    }

    return <>
        {businessChains.length > 0 &&
            <>
                <ListSubheader disableSticky>
                    My business chains
                </ListSubheader>
                {businessChains.map((place) => <BusinessChain place={place} key={place._id} />
                )}
            </>
        }
    </>
}