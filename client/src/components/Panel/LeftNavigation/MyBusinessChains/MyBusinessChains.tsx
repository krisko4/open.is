
import { ListSubheader } from "@mui/material"
import { ListItemLink } from "components/reusable/ListItemLink"
import { FC } from "react"
import { usePlacesSelector } from "../../../../redux-toolkit/slices/placesSlice"

export const MyBusinessChains: FC = () => {

    const places = usePlacesSelector()


    return <>
        {places.filter(place => place.isBusinessChain).length > 0 &&
            <>
                <ListSubheader disableSticky>
                    My business chains
                </ListSubheader>
                {places.filter(place => place.isBusinessChain).map((place) =>
                    <ListItemLink key={place._id} place={place} to={`business-chain/${place._id as string}/dashboard`} />
                )}
            </>
        }
    </>
}