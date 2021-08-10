import React, {FC, useState} from "react";
import {Dashboard} from "./Dashboard/Dashboard";
import Grid from "@material-ui/core/Grid";
import {NewPlace} from "./NewPlace/NewPlace";
import {ChosenOptions, SelectedOptionProps} from "./MainContentProps";




export const MainContent:FC<SelectedOptionProps> = ({selectedOption, setSelectedOption}) => {

    return (
        <Grid container justify="center" direction="row"  item lg={10}>
          {selectedOption === ChosenOptions.DASHBOARD && <Dashboard setSelectedOption={setSelectedOption}/>}
          {selectedOption === ChosenOptions.NEW_PLACE && <NewPlace/>}
      </Grid>

    )
}