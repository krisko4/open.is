import React from "react";
import { usePageContext } from "../contexts/PageContext";
import HomePage from "./HomePage/MainPage/HomePage";
import { Panel } from "./Panel/Panel";
import {PanelContextProvider} from '../contexts/PanelContext'

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