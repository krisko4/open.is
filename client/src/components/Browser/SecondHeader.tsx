import { Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import Searcher from "./Searcher";
import { Fastfood, ShoppingCart, LocalBar, AccountBalance, LocalPharmacy, LocalGasStation, LocalMall } from '@material-ui/icons'


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
            color={selected ? "secondary" : "default"}
            clickable
            label={type.label}
            icon={type.icon}
        />
    )
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    secondHeader: {
        marginTop: 10,
        marginBottom: 10,
    },
    [theme.breakpoints.down('lg')]: {
        secondHeader: {
            justifyContent: 'center',
        },
        chip: {
            marginTop: 10
        }

    }
}))



export const SecondHeader: FC = () => {

    const classes = useStyles()
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    useEffect(() => {
        console.log(selectedTypes)
    }, [selectedTypes])

    return (
        <AppBar
            style={{
                background: '#2C2C2C',
                position: 'static'
            }}>
            <Toolbar disableGutters>
                <Grid container className={classes.secondHeader}>
                    <Grid item xs={10} sm={9} md={8} lg={6} style={{paddingLeft: 5, paddingRight: 5}}>
                        <Searcher />
                    </Grid>
                    <Grid justify="center" container lg={6} item alignItems="center">
                        {businessTypes.map((type, index) =>
                            <CustomChip setSelectedTypes={setSelectedTypes} className={classes.chip} type={type} key={index} />
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
