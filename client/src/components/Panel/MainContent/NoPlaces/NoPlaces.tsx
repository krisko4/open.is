import {
    Grid
} from "@mui/material";
import React, { FC, useState } from "react";
import { AddNewBusiness } from './AddNewBusiness';
import { NewPlaceChooser } from './NewPlaceChooser';


const steps = [
    {
        title: 'Name your place',
        content: 'Provide the name of your business. Your visitors will use it to find your place in the browser',
    },
    {
        title: 'Place details',
        content: 'Describe your business in few words',
    },
    {
        title: 'Contact details',
        content: 'Share some contact information with your clients',
    },
    {
        title: 'Address details',
        content: 'Provide the address of your business in order to appear in our search engines',
    },
    {
        title: 'Image upload',
        content: 'Represent your business with images',
    },
]

export const NoPlaces: FC = () => {

    const [buttonClicked, setButtonClicked] = useState(false)

    return (
        <Grid container sx={{ height: '100%', overflow: 'hidden' }} justifyContent="center" alignItems="center">
            {buttonClicked ?
                <NewPlaceChooser />
                :
                <AddNewBusiness setButtonClicked={setButtonClicked} />
            }

        </Grid>

    )
}