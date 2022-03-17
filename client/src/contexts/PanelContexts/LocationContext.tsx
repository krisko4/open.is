

import { createContext, FC, useContext, useState } from 'react';
import { LocationProps } from '../../redux-toolkit/slices/PlaceProps';



export const LocationContext = createContext<LocationContextData | null>(null);

interface Props{

}



const useProviderSettings = () => {


  const [selectedLocations, setSelectedLocations] = useState<LocationProps[]>([]);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [fieldForAll, setFieldForAll] = useState({
    field: '',
    value: '',
  });
    
  return {
    selectedLocations,
    setSelectedLocations,
    saveButtonClicked,
    setSaveButtonClicked,
    fieldForAll,
    setFieldForAll,
  };
};

export const LocationContextProvider: FC<Props> = ({ children }) => {

  const state = useProviderSettings();

  return (
        <LocationContext.Provider value={state}>
            {children}
        </LocationContext.Provider>
  );
};
type LocationContextData = ReturnType<typeof useProviderSettings>;

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('LocationContextProvider should be used inside LocationContext!');
  return context;

};

