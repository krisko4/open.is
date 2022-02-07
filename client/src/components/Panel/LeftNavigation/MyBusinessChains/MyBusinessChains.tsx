
import { ListSubheader } from "@material-ui/core"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useRouteMatch } from "react-router"
import { RawPlaceDataProps } from "../../../../contexts/PanelContexts/BusinessChainContext"
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector"
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