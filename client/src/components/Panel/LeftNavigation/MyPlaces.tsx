import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader } from "@mui/material"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useLocation, useRouteMatch } from "react-router-dom"
import { RawPlaceDataProps } from "../../../contexts/PlaceProps"
import { setPlace } from "../../../store/actions/setCurrentPlace"
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector"
import { convertToCurrentPlace } from '../../../utils/place_data_utils'
import { Destinations } from "../MainContent/PlaceManagement/PlaceBoard/PlaceBoard"
interface Props {
    selectedOption: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}
export const MyPlaces: FC<Props> = ({ selectedOption, setSelectedOption }) => {

    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const history = useHistory()
    const location = useLocation()
    const match = useRouteMatch()

    const choosePlace = (place: RawPlaceDataProps, index: number) => {
        if (place._id === selectedOption) {
            return
        }
        setSelectedOption(place._id as string)
        const currentPlace = convertToCurrentPlace(place)[0]
        if (currentPlace.isActive) {
            history.push(`${match.url}/management/${currentPlace._id}/${Destinations.HOME}`)
            return
        }
        history.push(`${match.url}/management/${currentPlace._id}/${Destinations.OPENING_HOURS}`)
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