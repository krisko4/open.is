
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader } from "@mui/material"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import { match } from "react-router-dom"
import { RawPlaceDataProps } from "../../../../contexts/PlaceProps"
import { setPlace } from "../../../../store/actions/setCurrentPlace"
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector"
import { convertToCurrentPlace } from "../../../../utils/place_data_utils"
import { BusinessChain } from './BusinessChain'

interface Props {
    selectedOption: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}
export const MyBusinessChains: FC<Props> = ({ selectedOption, setSelectedOption }) => {

    const places = usePlacesSelector()
    const history = useHistory()
    const match = useRouteMatch()
    const choosePlace = (place: RawPlaceDataProps) => {
        // if (place._id === selectedOption) {
        //     return
        // }
        setSelectedOption(place._id as string)
        history.push({
            pathname: `${match.url}/business-chain/${place._id}/dashboard`,
            state: { place }
        }
        )
    }


    return <>
        {places.filter(place => place.isBusinessChain).length > 0 &&
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