import React from "react";
import { usePageContext } from "../contexts/PageContext";
import { PanelContextProvider } from '../contexts/PanelContexts/PanelContext';
import { useAuthSelector } from "../store/selectors/AuthSelector";
import HomePage from "./HomePage/MainPage/HomePage";
import { Panel } from "./Panel/Panel";

export const PageSelector = () => {

    // const { isPanelOpen } = usePageContext()
    const isUserLoggedIn = useAuthSelector()



    return (
        <div>
            {isUserLoggedIn ?
                <PanelContextProvider>
                    <Panel />
                </PanelContextProvider>
                : <HomePage />}
        </div>
    )
}