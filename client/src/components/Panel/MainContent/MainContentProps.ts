import React from "react";


export interface SelectedOptionProps {
    selectedOption: number,
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>
}

export enum ChosenOptions  {
    DASHBOARD,
    NEW_PLACE
}