import {createContext, useState} from "react";

export const PageContext = createContext()

const PageContextProvider = ({children}) => {

    const [isPanelOpen, setPanelOpen] = useState(false)

    const state = {
        isPanelOpen,
        setPanelOpen
    }

    return(
        <PageContext.Provider value={{...state}}>
            {children}
        </PageContext.Provider>
    )
}

export default PageContextProvider