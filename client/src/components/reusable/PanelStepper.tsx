import { Stepper } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { FC } from "react"

const useStyles = makeStyles({
    stepper: {
        background: 'inherit',
        '& .MuiStepContent-root': {
            color: 'lightgrey',
        },
        '& .MuiStepLabel-label': {
            color: 'white'
        }

    }
})


export const PanelStepper : FC<any> = (props) => {

    const classes = useStyles()
    const {children, ...rest} = props

    return (
        <Stepper {...rest} className={classes.stepper}>
            {children}
        </Stepper>
    )
}