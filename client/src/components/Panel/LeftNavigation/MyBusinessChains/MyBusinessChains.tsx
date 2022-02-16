
import { ListSubheader } from "@mui/material"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import { RawPlaceDataProps } from "../../../../contexts/PanelContexts/BusinessChainContext"
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector"
import { BusinessChain } from './BusinessChain'

export const MyBusinessChains: FC = () => {

    const places = usePlacesSelector()
    const [businessChains, setBusinessChains] = useState(places.filter(place => place.locations.length > 1))


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