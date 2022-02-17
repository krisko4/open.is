// import { createContext, useContext, FC, useState } from "react";

export {}




// export const PanelContext = createContext<PanelContextData | null>(null)


// export const PanelContextProvider: FC = ({ children }) => {

//     const state = useProviderSettings()

//     return (
//         <PanelContext.Provider value={state}>
//             {children}
//         </PanelContext.Provider>
//     )
// }

// export enum ChosenOptions {
//     DASHBOARD,
//     NEW_PLACE,
//     NO_PLACES,
//     PLACE_MANAGEMENT,
//     MY_ACCOUNT,
//     NEW_BUSINESS_CHAIN
// }

// const useProviderSettings = () => {

//     const [places, setPlaces] = useState<PlaceProps[]>([])
//     const [selectedOption, setSelectedOption] = useState<ChosenOptions | null>(null)
//     const [placeIndex, setPlaceIndex] = useState(0)

//     return {
//         places,
//         setPlaces,
//         placeIndex,
//         setPlaceIndex,
//         selectedOption,
//         setSelectedOption
//     }
// }

// type PanelContextData = ReturnType<typeof useProviderSettings>

// export const usePanelContext = () => {
//     const panelContext = useContext(PanelContext)
//     if (!panelContext) throw new Error('PanelContextProvider should be used inside PanelContext!')
//     return panelContext

// 

