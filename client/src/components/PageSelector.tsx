import React from "react";
import { usePageContext } from "../contexts/PageContext";
import { PanelContextProvider } from '../contexts/PanelContexts/PanelContext';
import HomePage from "./HomePage/MainPage/HomePage";
import { Panel } from "./Panel/Panel";

export const PageSelector = () => {

    const { isPanelOpen } = usePageContext()


    return (
        <div>
            {isPanelOpen ?
                <PanelContextProvider>
                    <Panel />
                </PanelContextProvider>
                : <HomePage />}
        </div>
    )
}