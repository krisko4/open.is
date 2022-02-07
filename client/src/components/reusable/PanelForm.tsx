import { makeStyles } from "@material-ui/core"
import { Form } from "formik"
import { FC } from "react"

const useStyles = makeStyles({
    form: {
        '& .MuiTypography-root': {
            color: 'white'
        },
        '& .MuiInputBase-root': {
            color: 'white'
        },
        '& .MuiFormHelperText-contained' : {
            color: 'white'
        }
    }
})

export const PanelForm: FC<any> = (props) => {
    const { children, ...rest } = props
    const classes = useStyles()
    return (
        <Form {...rest} className={classes.form}>
            {children}
        </Form>
    )
}