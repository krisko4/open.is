import { Chip, Paper, Theme } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import Searcher from "./Searcher";
import { Fastfood, ShoppingCart, LocalBar, AccountBalance, LocalPharmacy, LocalGasStation, LocalMall } from '@mui/icons-material'


const businessTypes = [
    {
        label: 'Food',
        icon: <Fastfood />
    },
    {
        label: 'Barber',
        icon: <Fastfood />
    },
    {
        label: 'Grocery',
        icon: <ShoppingCart />
    },
    {
        label: 'Club',
        icon: <LocalBar />
    },
    {
        label: 'Bank',
        icon: <AccountBalance />
    },
    {
        label: 'Pharmacy',
        icon: <LocalPharmacy />
    },
    {
        label: 'Petrol',
        icon: <LocalGasStation />
    },
    {
        label: 'Mall',
        icon: <LocalMall />
    },
]

interface ChipProps {
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>,
    type: {
        label: string;
        icon: JSX.Element;
    },
    [x: string]: any
}

const CustomChip = (props: ChipProps) => {

    const { type, setSelectedTypes, ...rest } = props
    const [selected, setSelected] = useState(false)

    useEffect(() => {

        if (!selected) {
            setSelectedTypes(selectedTypes => selectedTypes.filter((selectedType) => selectedType !== type.label))
            return
        }
        setSelectedTypes(selectedTypes => {
            const newSelectedTypes = [...selectedTypes]
            newSelectedTypes.push(type.label)
            return newSelectedTypes
        })

    }, [selected])

    return (
        <Chip
            {...rest}
            onClick={() => setSelected(selected => !selected)}
            style={{ marginRight: 2 }}
            color={selected ? "error" : "default"}
            clickable
            label={type.label}
            icon={type.icon}
        />
    )
}


// const useStyles = makeStyles((theme: Theme) => createStyles({
//     secondHeader: {
//         marginTop: 10,
//         marginBottom: 10,
//     },
//     [theme.breakpoints.down('xl')]: {
//         secondHeader: {
//             justifyContent: 'center',
//         },
//         chip: {
//             marginTop: 10
//         }

//     }
// }))



export const SecondHeader: FC = () => {

    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    useEffect(() => {
        console.log(selectedTypes)
    }, [selectedTypes])

    return (
        // <AppBar
        //     style={{
        //         // background: '#2C2C2C',
        //         position: 'static'
        //     }}>
        <Paper>
            <Toolbar disableGutters>
                <Grid container >
                    <Grid item xs={10} sm={9} md={8} lg={5} style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <Searcher />
                    </Grid>
                    <Grid justifyContent="center" container lg={7} item alignItems="center">
                        {businessTypes.map((type, index) =>
                            <CustomChip setSelectedTypes={setSelectedTypes} type={type} key={index} />
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </Paper>
        // </AppBar>
    );
}
