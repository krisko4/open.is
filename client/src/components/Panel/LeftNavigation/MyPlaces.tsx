import { Avatar, ListItemAvatar, ListItemButton, ListItemText, ListSubheader } from "@mui/material"
import { ListItemLink } from "components/reusable/ListItemLink"
import { RawPlaceDataProps } from "contexts/PlaceProps"
import React, { FC, useMemo } from "react"
import { Link as RouterLink, LinkProps } from "react-router-dom"
import { useGetPlacesByUserId } from "redux-toolkit/api/placesApi"
import { usePlacesSelector } from 'redux-toolkit/slices/placesSlice'

export const MyPlaces: FC = () => {

    const { data : places } = useGetPlacesByUserId()

    return <>
        {places && places.length > 0 &&
            <>
                <ListSubheader disableSticky>
                    My places
                </ListSubheader>
                { places && places.filter(place => !place.isBusinessChain).map((place, index) =>
                    <ListItemLink
                        key={place._id}
                        place={place}
                        to={`management/${place._id}/${place.locations[0]._id as string}/${place.locations[0].isActive ? 'home' : 'opening-hours'}`} />
                )}
            </>
        }
    </>
}