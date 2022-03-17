import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { CurrentPlaceProps } from '../redux-toolkit/slices/PlaceProps';


export const AddressDetailsContext = createContext<AddressDetailsContextData | null>(null);
interface Props {
  children: ReactNode,
  isEditionMode: boolean

}


interface SelectedAddressProps {
  label: string,
  lat: number,
  lng: number,
  postcode?: string,
  addressId: string,
  language: string
}

const useProviderSettings = (isEdition: boolean) => {
  const [availableAddresses, setAvailableAddresses] = useState<any>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<CurrentPlaceProps[]>([]);
  const [isEditionMode, setEditionMode] = useState(isEdition);

  const [selectedAddress, setSelectedAddress] = useState<SelectedAddressProps>({
    label: '',
    lat: 0,
    lng: 0,
    addressId: '',
    language: '',
  });
  return {
    availableAddresses,
    setAvailableAddresses,
    selectedPlaces,
    setSelectedPlaces,
    isEditionMode,
    setEditionMode,
    selectedAddress,
    setSelectedAddress,
  };
};

const AddressDetailsContextProvider: FC<Props> = ({ isEditionMode, children }) => {
  const state = useProviderSettings(isEditionMode);
  return (
        <AddressDetailsContext.Provider value={state}>
            {children}
        </AddressDetailsContext.Provider>
  );
};
type AddressDetailsContextData = ReturnType<typeof useProviderSettings>;

export const useAddressDetailsContext = () => {
  const context = useContext(AddressDetailsContext);
  if (!context) throw new Error('AddressDetailsContext should be placed inside AddressDetailsContextProvider');
  return context;
};

export default AddressDetailsContextProvider;
