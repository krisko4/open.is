import { Button, Grid, Paper, Slide, Card, CardContent, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { NewPlace } from "../../../NewPlace/NewPlace";
import { PlaceDetailsCard } from "../../../NewPlace/PlaceDetailsCard";
import { NewPlaceStepper } from "../../../NewPlace/Steps/NewPlaceStepper";
import { Step1 } from "../../../NewPlace/Steps/Step1/Step1";
import { Step2 } from "../../../NewPlace/Steps/Step2/Step2";
import { Step3 } from "../../../NewPlace/Steps/Step3/Step3";
import { Step4 } from "../../../NewPlace/Steps/Step4/Step4";
import { Step5 } from "../../../NewPlace/Steps/Step5/Step5";




export const PlaceSettings: FC = () => {


    const { currentPlace } = useCurrentPlaceContext()

    return (
        <CurrentPlaceContextProvider
            initialPlaceData={{
                ...currentPlace,
                facebook: currentPlace.facebook.substring(21),
                instagram: currentPlace.instagram.substring(22)
            }}
        >
            <NewPlace isEditionMode={true} />
        </CurrentPlaceContextProvider>
    )

}