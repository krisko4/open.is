import { createContext, useContext, FC, useState } from "react";

export const PageContext = createContext<PageContextData | null>(null)

export const PageContextProvider : FC = ({children}) => {

    const state = useProviderSettings()

    return(
        <PageContext.Provider value={state}>
            {children}
        </PageContext.Provider>
    )
}

const useProviderSettings = () => {

    const [isPanelOpen, setPanelOpen] = useState(false)

    return { 
        isPanelOpen,
        setPanelOpen
    }
}

type PageContextData = ReturnType<typeof useProviderSettings>


export const usePageContext = () => {
    const context = useContext(PageContext)
    if(!context) throw new Error('PageContextProvider should be used inside PageContext!')
    return context

}