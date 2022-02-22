import { createContext, FC, ReactNode, useContext, useState } from "react";


export const AddressDetailsContext = createContext<AddressDetailsContextData | null>(null)
interface Props {
    children: ReactNode,
    isEditionMode: boolean

}

const AddressDetailsContextProvider: FC<Props> = ({ isEditionMode, children }) => {
    const state = useProviderSettings(isEditionMode)
    return (
        <AddressDetailsContext.Provider value={state}>
            {children}
        </AddressDetailsContext.Provider>
    )
}

interface SelectedAddressProps {
    label: string,
    lat: number,
    lng: number,
    postcode?: string,
    addressId: string
}

const useProviderSettings = (isEdition: boolean) => {
    const [availableAddresses, setAvailableAddresses] = useState<any>([])
    const [chosenCriterias, setChosenCriterias] = useState<any>([])
    const [isEditionMode, setEditionMode] = useState(isEdition)

    const [selectedAddress, setSelectedAddress] = useState<SelectedAddressProps>({
        label: '',
        lat: 0,
        lng: 0,
        addressId: ''
    })
    return {
        availableAddresses,
        setAvailableAddresses,
        chosenCriterias,
        setChosenCriterias,
        isEditionMode,
        setEditionMode,
        selectedAddress,
        setSelectedAddress
    }
}

type AddressDetailsContextData = ReturnType<typeof useProviderSettings>

export const useAddressDetailsContext = () => {
    const context = useContext(AddressDetailsContext)
    if (!context) throw new Error('AddressDetailsContext should be placed inside AddressDetailsContextProvider')
    return context
}

export default AddressDetailsContextProvider
