import { Card, makeStyles } from "@material-ui/core"
import { FC } from "react"

const useStyles = makeStyles({
    card: {
        background: '#18202b',
        '& .MuiTypography-root' : {
            color: 'white'
        },
    }

})

export const PanelCard: FC<any> = (props) => {
    const classes = useStyles()
    const { children, ...rest } = props
    return (
        <Card {...rest} className={classes.card} >
            {children}
        </Card>
    )
}