import { Avatar, Collapse, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { StarBorder } from "@mui/icons-material"
import { FC, useState } from "react"
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { setPlace } from "../../../../store/actions/setCurrentPlace"
import { convertToCurrentPlace } from "../../../../utils/place_data_utils"
import { LocationProps, RawPlaceDataProps } from "../../../../contexts/PlaceProps"
import { useAppDispatch } from "redux-toolkit/hooks"
import { useNavigate } from 'react-router-dom'

interface Props {
    place: RawPlaceDataProps
}

export const BusinessChain: FC<Props> = ({ place }) => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const choosePlace = (place: RawPlaceDataProps, location: LocationProps) => {
        const placeCopy = { ...place }
        placeCopy.locations = [location]
        const currentPlaces = convertToCurrentPlace(placeCopy)
        const currentPlace = currentPlaces[0]
        dispatch(setPlace(currentPlace))
        // navigate({
        //     pathname: `${match.url}/management/${currentPlace._id}`,
        //     state: { place: currentPlace }
        // }
        // )

    }

    return <>
        <ListItem button onClick={() => setOpen(open => !open)}>
            <ListItemAvatar>
                <Avatar
                    alt={place.name}
                    src={place.logo as string} />
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