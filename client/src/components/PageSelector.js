import React, {useContext} from "react";
import {PageContext} from "../contexts/PageContext";
import {Panel} from "./Panel/Panel";
import HomePage from "./HomePage/MainPage/HomePage";

export const PageSelector = () => {

    const {isPanelOpen} = useContext(PageContext)

    return(
        <div>
            {isPanelOpen ? <Panel/> : <HomePage/>}
        </div>
    )
}