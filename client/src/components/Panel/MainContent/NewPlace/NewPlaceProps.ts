import React from "react";

export interface NewPlaceProps {
    activeStep : number,
    setActiveStep :  React.Dispatch<React.SetStateAction<number>>
}